(() => {
  'use strict';

  const APP_URL = '../index.html';
  const STORAGE_KEY = 'pfWorkoutApp.v1';
  const ACTIVE_KEY = 'pfWorkoutApp.active.v1';
  const RECOVERY_KEY = 'pfWorkoutApp.recovery.v1';
  const META_KEY = 'pfWorkoutApp.meta.v1';
  const PHOTO_DB = 'nexset-progress-photos-v1';
  const PHOTO_STORE = 'photos';
  const FIXED_DATE = '2025-02-03T12:00:00.000Z';
  const LOCAL_HOSTS = new Set(['127.0.0.1', 'localhost']);
  const results = [];
  let frame = null;
  let frameSequence = 0;

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function equal(actual, expected, message) {
    if (!Object.is(actual, expected)) {
      throw new Error(`${message} (expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)})`);
    }
  }

  function near(actual, expected, tolerance, message) {
    if (!Number.isFinite(Number(actual)) || Math.abs(Number(actual) - expected) > tolerance) {
      throw new Error(`${message} (expected ${expected} ± ${tolerance}, received ${actual})`);
    }
  }

  async function waitFor(check, message, timeoutMs = 5000) {
    const started = performance.now();
    let lastError = null;
    while (performance.now() - started < timeoutMs) {
      try {
        const value = await check();
        if (value) return value;
      } catch (error) {
        lastError = error;
      }
      await delay(25);
    }
    throw new Error(`${message}${lastError ? `: ${lastError.message}` : ''}`);
  }

  function syntheticExercise(overrides = {}) {
    return {
      id: 'synthetic_press',
      name: 'Fictional Machine Press',
      type: 'weighted',
      sets: 3,
      min: 8,
      max: 10,
      increment: 5,
      restSeconds: 75,
      unit: '',
      equipment: 'Imaginary selectorized machine',
      cues: 'Controlled fictional test movement.',
      movement: 'horizontal_push',
      ...overrides
    };
  }

  function syntheticLogs(weight, reps = 10) {
    return [0, 1, 2].map(index => ({
      weight,
      reps,
      feel: 'good',
      warmup: false,
      at: new Date(Date.parse(FIXED_DATE) + index * 60_000).toISOString()
    }));
  }

  function syntheticSession(id, weight, overrides = {}) {
    const exercise = syntheticExercise();
    return {
      id,
      schemaVersion: 6,
      storageWeightUnit: 'lb',
      dayIndex: 0,
      day: 1,
      type: 'lift',
      title: `Invented session ${id}`,
      focus: 'Synthetic test data',
      startedAt: overrides.startedAt || FIXED_DATE,
      endedAt: overrides.endedAt || new Date(Date.parse(overrides.startedAt || FIXED_DATE) + 2_400_000).toISOString(),
      completedAt: overrides.completedAt || new Date(Date.parse(overrides.startedAt || FIXED_DATE) + 2_400_000).toISOString(),
      durationMs: 2_400_000,
      sessionNote: overrides.sessionNote || 'Invented session note.',
      exercises: [{
        id: exercise.id,
        exercise,
        planExerciseIndex: 0,
        status: 'open',
        notes: 'Invented exercise note.',
        logs: syntheticLogs(weight)
      }],
      prs: [],
      ...overrides
    };
  }

  function currentSettings(overrides = {}) {
    return {
      profileName: 'Morgan Example',
      currentDayIndex: 2,
      restSeconds: 80,
      autoRest: true,
      units: 'lb',
      theme: 'dark',
      smithBarWeight: 20,
      nexsetSmithResistancePreset: '25-lb-personal',
      nexsetCoachPlanVersion: '4.0.4',
      nexsetPlanRelease: '4.2.0',
      nexsetNutritionRelease: '4.2.0',
      ...overrides
    };
  }

  function baseState(overrides = {}) {
    const state = {
      version: 6,
      storageWeightUnit: 'lb',
      createdAt: FIXED_DATE,
      settings: currentSettings(),
      goals: {
        targetWeight: 172,
        targetBodyFat: 17,
        dailyCalories: 2675,
        dailyProtein: 181,
        dailyCarbs: 287,
        dailyFat: 83
      },
      exerciseProgress: {},
      history: [],
      bodyMetrics: [],
      dailyCheckins: [],
      quickTemplates: [],
      exerciseSetups: { synthetic_press: 'Invented seat setting 4.' },
      photoMeta: [],
      achievements: [],
      nutrition: { selectedDate: '2025-02-03', entries: [] }
    };
    return { ...state, ...overrides };
  }

  function syntheticActive() {
    const exercise = syntheticExercise();
    return {
      id: 'active-invented-1',
      schemaVersion: 6,
      storageWeightUnit: 'lb',
      isQuick: true,
      dayIndex: -1,
      title: 'Invented active workout',
      startedAt: FIXED_DATE,
      pausedMs: 0,
      currentExerciseIndex: 0,
      sessionNote: 'Invented unfinished-session note.',
      exercises: [{
        id: exercise.id,
        exercise,
        planExerciseIndex: 0,
        status: 'open',
        logs: [syntheticLogs(47, 9)[0]],
        notes: '',
        draftWeight: 47,
        draftReps: 9,
        draftFeel: 'good',
        draftWarmup: false
      }]
    };
  }

  function customSevenDayPlan() {
    return Array.from({ length: 7 }, (_, index) => ({
      day: index + 1,
      type: 'lift',
      title: `Custom fictional day ${index + 1}`,
      focus: `Invented focus ${index + 1}`,
      warmup: 'Invented warmup.',
      note: 'Invented customized plan.',
      exercises: [syntheticExercise({ id: `synthetic_press_${index + 1}`, name: `Fictional press ${index + 1}` })]
    }));
  }

  function readJson(key) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }

  async function openPhotoDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(PHOTO_DB, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(PHOTO_STORE)) db.createObjectStore(PHOTO_STORE, { keyPath: 'id' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Could not open fictional photo database.'));
    });
  }

  async function photoTransaction(mode, operation) {
    const db = await openPhotoDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(PHOTO_STORE, mode);
      operation(transaction.objectStore(PHOTO_STORE));
      transaction.oncomplete = () => { db.close(); resolve(); };
      transaction.onerror = () => { db.close(); reject(transaction.error || new Error('Photo transaction failed.')); };
      transaction.onabort = () => { db.close(); reject(transaction.error || new Error('Photo transaction aborted.')); };
    });
  }

  async function clearPhotos() {
    await photoTransaction('readwrite', store => store.clear());
  }

  async function putPhoto(record) {
    await photoTransaction('readwrite', store => store.put(record));
  }

  async function getPhotos() {
    const db = await openPhotoDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(PHOTO_STORE, 'readonly');
      const request = transaction.objectStore(PHOTO_STORE).getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error || new Error('Could not read fictional photos.'));
      transaction.oncomplete = () => db.close();
    });
  }

  function inventedPhoto(id = 'invented-photo-1') {
    return {
      id,
      date: FIXED_DATE,
      note: 'Invented solid-color test image.',
      createdAt: FIXED_DATE,
      blob: new Blob([new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])], { type: 'image/png' }),
      type: 'image/png',
      size: 8
    };
  }

  function disposeFrame() {
    if (frame) frame.remove();
    frame = null;
  }

  async function clearOriginData() {
    disposeFrame();
    for (const key of [STORAGE_KEY, ACTIVE_KEY, RECOVERY_KEY, META_KEY]) localStorage.removeItem(key);
    await clearPhotos();
  }

  async function launchApp({ state, active = null, photos = [] } = {}) {
    await clearOriginData();
    if (state) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (active) localStorage.setItem(ACTIVE_KEY, JSON.stringify(active));
    for (const photo of photos) await putPhoto(photo);

    frame = document.createElement('iframe');
    frame.title = 'Unmodified NEXSET app under test';
    frame.src = `${APP_URL}?behavior-test=${Date.now()}-${++frameSequence}`;
    document.body.appendChild(frame);
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('The app iframe did not load.')), 8000);
      frame.addEventListener('load', () => { clearTimeout(timeout); resolve(); }, { once: true });
    });
    await waitFor(() => frame.contentDocument?.querySelector('#view'), 'The app UI did not initialize');
    return { win: frame.contentWindow, doc: frame.contentDocument };
  }

  async function showBackupPanel(app) {
    const more = await waitFor(() => app.doc.querySelector('[data-nav="profile"]'), 'Profile navigation was not available');
    more.click();
    const backup = await waitFor(() => app.doc.querySelector('[data-action="more-section"][data-section="backup"]'), 'Backup menu was not available');
    backup.click();
    return waitFor(() => app.doc.querySelector('[data-action="export-backup"]'), 'Backup panel did not open');
  }

  async function captureExport(app) {
    const capture = { blob: null, filename: null };
    app.win.URL.createObjectURL = blob => { capture.blob = blob; return 'blob:nexset-fictional-test'; };
    app.win.URL.revokeObjectURL = () => {};
    app.win.HTMLAnchorElement.prototype.click = function testDownloadClick() { capture.filename = this.download; };
    const exportButton = await showBackupPanel(app);
    exportButton.click();
    await waitFor(() => capture.blob, 'Backup export did not produce a file');
    return { filename: capture.filename, text: await capture.blob.text() };
  }

  async function importText(app, text, filename = 'invented-backup.json', confirmImport = true) {
    app.win.confirm = () => confirmImport;
    const input = app.doc.getElementById('importFile');
    assert(input, 'The backup file input is missing.');
    const file = new app.win.File([text], filename, { type: 'application/json' });
    Object.defineProperty(input, 'files', { configurable: true, value: [file] });
    input.dispatchEvent(new app.win.Event('change', { bubbles: true }));
  }

  async function waitForImport(app) {
    return waitFor(() => {
      const meta = readJson(META_KEY);
      return meta?.lastImportAt && meta;
    }, 'The backup import did not complete', 8000);
  }

  async function waitForToast(app, fragment) {
    return waitFor(() => {
      const text = app.doc.querySelector('#toast')?.textContent || '';
      return text.includes(fragment) && text;
    }, `Expected message was not shown: ${fragment}`);
  }

  async function unregisterLocalServiceWorkers() {
    if (!('serviceWorker' in navigator)) return;
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(registration => registration.unregister()));
  }

  function addResult(name, status, detail = '') {
    results.push({ name, status, detail });
    const item = document.createElement('li');
    item.className = status;
    const labels = {
      pass: 'PASS',
      fail: 'FAIL',
      'expected-failure': 'EXPECTED FAILURE',
      'unexpected-pass': 'UNEXPECTED PASS'
    };
    item.innerHTML = `<strong>${labels[status]} · ${name}</strong>${detail ? `<small>${detail}</small>` : ''}`;
    document.getElementById('results').appendChild(item);
  }

  async function test(name, run) {
    try {
      await run();
      addResult(name, 'pass');
    } catch (error) {
      addResult(name, 'fail', error.message);
    }
  }

  async function expectedFailure(name, run, reason) {
    try {
      await run();
      addResult(name, 'unexpected-pass', `The known risk may now be fixed. Reclassify this test. Prior risk: ${reason}`);
    } catch (error) {
      addResult(name, 'expected-failure', `${reason} Current observation: ${error.message}`);
    }
  }

  async function runSuite() {
    if (!LOCAL_HOSTS.has(location.hostname) || location.protocol !== 'http:') {
      throw new Error('Safety stop: run this page only through http://127.0.0.1 or http://localhost.');
    }

    await unregisterLocalServiceWorkers();

    await test('Legacy kg workout data migrates to canonical storage without losing history or custom profile fields', async () => {
      const legacy = baseState({
        version: 5,
        settings: currentSettings({ units: 'kg', profileName: 'Riley Fiction', progressExerciseId: 'synthetic_press' }),
        goals: { targetWeight: 77, targetBodyFat: 16 },
        history: [syntheticSession('legacy-kg-session', 40, { sessionNote: 'Invented legacy note.' })],
        exerciseSetups: { synthetic_press: 'Invented custom setup survives.' }
      });
      delete legacy.storageWeightUnit;
      const app = await launchApp({ state: legacy });
      const saved = readJson(STORAGE_KEY);
      equal(saved.version, 6, 'Schema version was not upgraded');
      equal(saved.storageWeightUnit, 'lb', 'Canonical storage unit was not recorded');
      near(saved.history[0].exercises[0].logs[0].weight, 88.1849, 0.001, 'Legacy kg exercise weight was not converted');
      equal(saved.history[0].sessionNote, 'Invented legacy note.', 'Workout note was not preserved');
      equal(saved.settings.profileName, 'Riley Fiction', 'Customized profile name was not preserved');
      equal(saved.exerciseSetups.synthetic_press, 'Invented custom setup survives.', 'Customized equipment setup was not preserved');
      assert(app.doc.body.textContent.includes('NEXSET'), 'App did not remain usable after migration');
    });

    await test('Core workout history rebuilds progression and ignores progression-protected sessions', async () => {
      const firstDate = '2025-02-01T12:00:00.000Z';
      const secondDate = '2025-02-02T12:00:00.000Z';
      const protectedDate = '2025-02-03T12:00:00.000Z';
      const history = [
        syntheticSession('progress-1', 50, { startedAt: firstDate, sessionNote: 'First invented history record.' }),
        syntheticSession('progress-2', 55, { startedAt: secondDate }),
        syntheticSession('progress-protected', 100, {
          startedAt: protectedDate,
          trainingModifier: { id: 'invented-recovery-mode', label: 'Invented protected mode', preserveProgression: true }
        })
      ];
      await launchApp({ state: baseState({ history }) });
      const saved = readJson(STORAGE_KEY);
      equal(saved.history.length, 3, 'Workout history count changed');
      equal(saved.history[0].sessionNote, 'First invented history record.', 'Workout history details changed');
      equal(saved.exerciseProgress.synthetic_press.completedCount, 2, 'Protected session affected progression count');
      equal(saved.exerciseProgress.synthetic_press.lastWeight, 55, 'Last progression weight is incorrect');
      equal(saved.exerciseProgress.synthetic_press.nextWeight, 60, 'Top-range sets did not create the current next-weight recommendation');
    });

    await test('Primary app shell has no horizontal overflow at the active mobile viewport', async () => {
      const app = await launchApp({ state: baseState({ history: [syntheticSession('layout-session', 41)] }) });
      const root = app.doc.documentElement;
      assert(root.scrollWidth <= root.clientWidth, `App shell overflows horizontally (${root.scrollWidth}px content in ${root.clientWidth}px viewport)`);
    });

    await test('Full backup export and restore round-trip state, active workout, nutrition, history, and a fictional photo', async () => {
      const nutrition = {
        selectedDate: '2025-02-03',
        entries: [{
          id: 'food-invented-1', date: '2025-02-03', meal: 'lunch', name: 'Fictional test meal', servings: 1,
          calories: 410, protein: 31, carbs: 52, fat: 9, createdAt: FIXED_DATE
        }]
      };
      const source = baseState({
        history: [syntheticSession('round-trip-session', 45)],
        nutrition,
        photoMeta: [{ id: 'invented-photo-1', date: FIXED_DATE, note: 'Invented solid-color test image.' }]
      });
      let app = await launchApp({ state: source, active: syntheticActive(), photos: [inventedPhoto()] });
      const exported = await captureExport(app);
      const payload = JSON.parse(exported.text);
      equal(payload.format, 'nexset-backup', 'Backup format marker is incorrect');
      equal(payload.schemaVersion, 6, 'Backup schema marker is incorrect');
      equal(payload.state.history[0].id, 'round-trip-session', 'Export omitted workout history');
      equal(payload.active.id, 'active-invented-1', 'Export omitted active workout');
      equal(payload.state.nutrition.entries[0].name, 'Fictional test meal', 'Export omitted nutrition data');
      equal(payload.photos.length, 1, 'Export omitted the fictional photo');
      assert(payload.photos[0].data.startsWith('data:image/png;base64,'), 'Photo was not encoded in the full backup');
      assert(exported.filename.startsWith('nexset-full-backup-'), 'Full-backup filename is incorrect');

      app = await launchApp({ state: baseState() });
      await importText(app, exported.text);
      await waitForImport(app);
      const restored = readJson(STORAGE_KEY);
      const restoredActive = readJson(ACTIVE_KEY);
      const restoredPhotos = await getPhotos();
      equal(restored.history[0].id, 'round-trip-session', 'Restore omitted workout history');
      equal(restored.nutrition.entries[0].name, 'Fictional test meal', 'Restore omitted nutrition data');
      equal(restoredActive.id, 'active-invented-1', 'Restore omitted active workout');
      equal(restoredPhotos.length, 1, 'Restore omitted the fictional photo');
      equal(restoredPhotos[0].blob.size, 8, 'Restored photo bytes changed');
      assert(Boolean(readJson(RECOVERY_KEY)?.state), 'Pre-import recovery snapshot was not created');
    });

    await test('Malformed JSON is rejected without replacing the current saved state', async () => {
      const app = await launchApp({ state: baseState({ history: [syntheticSession('keep-after-bad-json', 42)] }) });
      await importText(app, '{this is not valid json');
      await waitForToast(app, 'Could not import that backup.');
      const saved = readJson(STORAGE_KEY);
      equal(saved.history.length, 1, 'Malformed import changed workout history');
      equal(saved.history[0].id, 'keep-after-bad-json', 'Malformed import replaced the saved state');
    });

    await test('Backup missing required history is rejected without replacing the current saved state', async () => {
      const app = await launchApp({ state: baseState({ history: [syntheticSession('keep-after-incomplete', 43)] }) });
      const incomplete = JSON.stringify({ format: 'nexset-backup', state: { settings: { profileName: 'Casey Fiction' } } });
      await importText(app, incomplete, 'invented-incomplete-backup.json');
      await waitForToast(app, 'Could not import that backup.');
      const saved = readJson(STORAGE_KEY);
      equal(saved.history.length, 1, 'Incomplete import changed workout history');
      equal(saved.history[0].id, 'keep-after-incomplete', 'Incomplete import replaced the saved state');
    });

    await test('Minimal older backup with history receives defaults and remains usable', async () => {
      const app = await launchApp({ state: baseState() });
      const minimal = JSON.stringify({
        format: 'nexset-backup',
        schemaVersion: 2,
        state: {
          version: 2,
          createdAt: FIXED_DATE,
          settings: { profileName: 'Taylor Example', units: 'lb' },
          history: [syntheticSession('minimal-old-session', 35)]
        },
        active: null
      });
      await importText(app, minimal, 'invented-version-2-backup.json');
      await waitForImport(app);
      const saved = readJson(STORAGE_KEY);
      equal(saved.version, 6, 'Minimal older backup was not migrated');
      equal(saved.settings.profileName, 'Taylor Example', 'Minimal older backup lost its custom profile name');
      equal(saved.history[0].id, 'minimal-old-session', 'Minimal older backup lost workout history');
      assert(Array.isArray(saved.programPlan) && saved.programPlan.length >= 7, 'Migration did not supply a usable program');
      assert(saved.nutrition && Array.isArray(saved.nutrition.entries), 'Migration did not supply nutrition defaults');
    });

    await expectedFailure(
      '4.1 migration preserves a seven-day custom plan, rolling day, and readiness check-ins',
      async () => {
        const customPlan = customSevenDayPlan();
        const state = baseState({
          settings: currentSettings({ currentDayIndex: 4, nexsetPlanRelease: '4.0.0', nexsetNutritionRelease: '4.2.0' }),
          programPlan: customPlan,
          dailyCheckins: [{ id: 'invented-checkin', date: FIXED_DATE, sleep: 4, energy: 3, soreness: 2, stress: 2 }]
        });
        await launchApp({ state });
        const saved = readJson(STORAGE_KEY);
        equal(saved.programPlan[0].title, customPlan[0].title, 'Customized program was replaced');
        equal(saved.settings.currentDayIndex, 4, 'Rolling workout position was reset');
        equal(saved.dailyCheckins.length, 1, 'Readiness check-ins were cleared');
      },
      'The current 4.1 release migration replaces the plan, resets the rolling day, and clears readiness check-ins on first install.'
    );

    await expectedFailure(
      '4.2 migration preserves user-customized macro targets when its release marker is absent',
      async () => {
        const state = baseState({
          settings: currentSettings({ nexsetPlanRelease: '4.2.0', nexsetNutritionRelease: undefined }),
          goals: { targetWeight: 172, targetBodyFat: 17, dailyCalories: 2675, dailyProtein: 181, dailyCarbs: 287, dailyFat: 83 }
        });
        await launchApp({ state });
        const saved = readJson(STORAGE_KEY);
        equal(saved.goals.dailyCalories, 2675, 'Custom calorie target was replaced');
        equal(saved.goals.dailyProtein, 181, 'Custom protein target was replaced');
        equal(saved.goals.dailyCarbs, 287, 'Custom carbohydrate target was replaced');
        equal(saved.goals.dailyFat, 83, 'Custom fat target was replaced');
      },
      'The current 4.2 first-install migration assigns built-in macro targets even when customized targets already exist.'
    );

    await expectedFailure(
      'Reset app data also clears progress-photo blobs',
      async () => {
        const app = await launchApp({
          state: baseState({ history: [syntheticSession('reset-session', 44)], photoMeta: [{ id: 'reset-photo', date: FIXED_DATE, note: 'Invented reset photo.' }] }),
          photos: [inventedPhoto('reset-photo')]
        });
        await showBackupPanel(app);
        app.win.confirm = () => true;
        app.doc.querySelector('[data-action="reset-app"]').click();
        await waitFor(() => readJson(STORAGE_KEY)?.history?.length === 0, 'App records were not reset');
        equal((await getPhotos()).length, 0, 'IndexedDB progress photo survived reset');
      },
      'The current reset path clears localStorage but does not clear the separate IndexedDB photo store.'
    );

    await expectedFailure(
      'Invalid photo data cannot erase an existing local progress photo during import',
      async () => {
        const app = await launchApp({
          state: baseState({ photoMeta: [{ id: 'existing-photo', date: FIXED_DATE, note: 'Invented existing photo.' }] }),
          photos: [inventedPhoto('existing-photo')]
        });
        const invalidPhotoBackup = JSON.stringify({
          format: 'nexset-backup',
          schemaVersion: 6,
          appVersion: '4.2.0',
          exportedAt: FIXED_DATE,
          state: baseState(),
          active: null,
          photos: [{ id: 'broken-invented-photo', date: FIXED_DATE, note: 'Invented invalid photo.', data: 'not-a-data-url' }]
        });
        await importText(app, invalidPhotoBackup, 'invented-invalid-photo-backup.json');
        await waitForToast(app, 'Could not import that backup.');
        const photos = await getPhotos();
        equal(photos.length, 1, 'Existing photo was erased before the invalid incoming photo failed');
        equal(photos[0].id, 'existing-photo', 'Existing photo was replaced during failed import');
      },
      'The current import clears the photo store before every incoming photo has been decoded and safely written.'
    );
  }

  async function finish() {
    try {
      await runSuite();
    } catch (error) {
      addResult('Test harness safety or setup', 'fail', error.message);
    } finally {
      try { await clearOriginData(); } catch (error) { addResult('Local test-origin cleanup', 'fail', error.message); }
      try { await unregisterLocalServiceWorkers(); } catch (error) { addResult('Local service-worker cleanup', 'fail', error.message); }

      const counts = results.reduce((summary, result) => {
        summary[result.status] = (summary[result.status] || 0) + 1;
        return summary;
      }, {});
      const failed = (counts.fail || 0) > 0;
      const summary = document.getElementById('summary');
      summary.dataset.status = failed ? 'failed' : 'passed';
      summary.textContent = failed
        ? `Completed with ${counts.fail} unexpected failure(s). ${counts.pass || 0} passed; ${counts['expected-failure'] || 0} known risks reproduced.`
        : `Completed without unexpected failures. ${counts.pass || 0} passed; ${counts['expected-failure'] || 0} known risks reproduced; ${counts['unexpected-pass'] || 0} known risks may be fixed.`;
      window.__NEXSET_TEST_RESULTS__ = { completed: true, failed, counts, results };
      document.title = failed ? 'FAIL · NEXSET behavior baseline' : 'PASS · NEXSET behavior baseline';
    }
  }

  finish();
})();
