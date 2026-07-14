(()=>{
    'use strict';

    const STORAGE_KEY = 'pfWorkoutApp.v1';
    const ACTIVE_KEY = 'pfWorkoutApp.active.v1';
    const APP_VERSION = 'atlas-2.5.3';

    const PLAN = [
      {
        day: 1,
        type: 'lift',
        title: 'Push A',
        focus: 'Chest, shoulders, triceps',
        warmup: '5 minutes easy cardio + 1–2 warm-up sets before Smith bench.',
        note: 'Push hard but leave 1–2 clean reps in the tank on most sets.',
        exercises: [
          { id: 'smith_bench', name: 'Smith Machine Bench Press', type: 'weighted', sets: 4, min: 8, max: 10, increment: 10, equipment: 'Smith machine', cues: 'Shoulder blades tucked; lower bar under control.' },
          { id: 'incline_db_press', name: 'Incline Dumbbell Press', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Dumbbells', cues: 'Use a moderate incline; avoid bouncing at the bottom.' },
          { id: 'machine_chest_fly', name: 'Machine Chest Fly', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Pec deck', cues: 'Soft elbows; squeeze chest without shrugging.' },
          { id: 'seated_db_shoulder_press', name: 'Seated Dumbbell Shoulder Press', type: 'weighted', sets: 3, min: 8, max: 12, increment: 5, equipment: 'Dumbbells', cues: 'Do not arch your back; press slightly forward at the top.' },
          { id: 'cable_lateral_raise', name: 'Cable Lateral Raise', type: 'weighted', sets: 3, min: 12, max: 15, increment: 2.5, equipment: 'Cable', cues: 'Lead with elbows; pause near shoulder height.' },
          { id: 'rope_tricep_pushdown', name: 'Rope Triceps Pushdown', type: 'weighted', sets: 3, min: 10, max: 15, increment: 5, equipment: 'Cable', cues: 'Keep elbows pinned; split rope at the bottom.' },
          { id: 'overhead_cable_triceps', name: 'Overhead Cable Triceps Extension', type: 'weighted', sets: 2, min: 12, max: 15, increment: 5, equipment: 'Cable', cues: 'Stretch triceps; do not flare ribs.' },
          { id: 'incline_treadmill_push', name: 'Incline Treadmill Walk', type: 'cardio', sets: 1, min: 15, max: 20, increment: 2, unit: 'min', equipment: 'Treadmill', cues: 'Incline 6–10, speed 2.8–3.5 mph.' }
        ]
      },
      {
        day: 2,
        type: 'lift',
        title: 'Pull A',
        focus: 'Back, biceps, core',
        warmup: '5 minutes cardio + light pulldowns and rows before working sets.',
        note: 'Pull elbows toward your pockets on back work. Avoid turning rows into lower-back swings.',
        exercises: [
          { id: 'lat_pulldown', name: 'Lat Pulldown', type: 'weighted', sets: 4, min: 8, max: 12, increment: 5, equipment: 'Cable machine', cues: 'Chest up; pull to upper chest.' },
          { id: 'seated_cable_row', name: 'Seated Cable Row', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Cable row', cues: 'Pause with shoulder blades squeezed.' },
          { id: 'chest_supported_row', name: 'Chest-Supported Row Machine', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Machine row', cues: 'Keep chest glued to pad.' },
          { id: 'cable_face_pull', name: 'Cable Face Pull', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Cable', cues: 'Pull toward eyebrows; elbows high.' },
          { id: 'db_hammer_curl', name: 'Dumbbell Hammer Curl', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Dumbbells', cues: 'No swinging; control the lower.' },
          { id: 'cable_curl', name: 'Cable Curl', type: 'weighted', sets: 2, min: 12, max: 15, increment: 5, equipment: 'Cable', cues: 'Keep shoulders still; squeeze at top.' },
          { id: 'captains_chair_knee_raise', name: 'Captain’s Chair Knee Raise', type: 'bodyweight', sets: 3, min: 12, max: 15, increment: 0, equipment: 'Captain’s chair', cues: 'Curl pelvis up; avoid swinging.' },
          { id: 'stair_or_bike_pull', name: 'Stair Climber or Bike', type: 'cardio', sets: 1, min: 12, max: 15, increment: 2, unit: 'min', equipment: 'Cardio', cues: 'Moderate pace after lifting.' }
        ]
      },
      {
        day: 3,
        type: 'rest',
        title: 'Active Recovery',
        focus: 'Rest day with optional movement',
        warmup: 'No warm-up required.',
        note: 'This is a recovery day. The goal is to feel better when you leave than when you started.',
        exercises: [
          { id: 'easy_walk_recovery', name: 'Easy Walk', type: 'cardio', sets: 1, min: 20, max: 30, increment: 5, unit: 'min', equipment: 'Treadmill/outside', cues: 'Easy pace; you should be able to hold a conversation.' },
          { id: 'mobility_flow', name: 'Mobility Flow', type: 'timed', sets: 1, min: 8, max: 10, increment: 2, unit: 'min', equipment: 'Mat', cues: 'Hips, hamstrings, chest, back.' },
          { id: 'stretch_recovery', name: 'Stretching', type: 'timed', sets: 1, min: 5, max: 10, increment: 2, unit: 'min', equipment: 'Mat', cues: 'Gentle holds only; no forcing.' }
        ]
      },
      {
        day: 4,
        type: 'lift',
        title: 'Legs A',
        focus: 'Quads, glutes, hamstrings, calves',
        warmup: '5 minutes bike + 1–2 light sets on 45° leg press before working sets.',
        note: 'No lunges. Control every rep and use the 45° leg press with a full foot on the platform.',
        exercises: [
          { id: 'smith_squat', name: 'Smith Machine Squat', type: 'weighted', sets: 4, min: 8, max: 10, increment: 10, equipment: 'Smith machine', cues: 'Brace hard, sit straight down, and drive through mid-foot.' },
          { id: 'romanian_deadlift', name: 'Romanian Deadlift', type: 'weighted', sets: 4, min: 8, max: 10, increment: 10, equipment: 'Dumbbells', cues: 'Hips back, soft knees, and feel the stretch in your hamstrings.' },
          { id: 'leg_press_45', name: '45° Leg Press', type: 'weighted', sets: 3, min: 10, max: 15, increment: 10, equipment: 'Leg press', cues: 'Full foot on platform; feet slightly high and do not lock knees hard.' },
          { id: 'leg_extension', name: 'Leg Extension', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Leg extension', cues: 'Pause at the top; slow lower.' },
          { id: 'seated_leg_curl_a', name: 'Seated Leg Curl', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Leg curl', cues: 'Keep hips down; squeeze hamstrings.' },
          { id: 'standing_calf_raise', name: 'Standing Calf Raise', type: 'weighted', sets: 4, min: 12, max: 15, increment: 5, equipment: 'Calf machine', cues: 'Full stretch; pause at top.' },
          { id: 'bike_or_walk_legs_a', name: 'Bike or Incline Walk', type: 'cardio', sets: 1, min: 10, max: 15, increment: 2, unit: 'min', equipment: 'Cardio', cues: 'Easy to moderate pace. Finish refreshed enough to recover for the next session.' }
        ]
      },
      {
        day: 5,
        type: 'lift',
        title: 'Upper Definition',
        focus: 'Chest, back, shoulders, arms',
        warmup: '5 minutes easy cardio + light upper-body warm-up sets.',
        note: 'Shorter rest here. Aim for a strong pump and clean tempo, not max weight.',
        exercises: [
          { id: 'machine_chest_press', name: 'Machine Chest Press', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Chest press', cues: 'Smooth reps; do not bounce.' },
          { id: 'neutral_lat_pulldown', name: 'Neutral-Grip Lat Pulldown', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Cable machine', cues: 'Pull elbows down and in.' },
          { id: 'reverse_pec_deck', name: 'Reverse Pec Deck', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Machine', cues: 'Control rear delts; no shrugging.' },
          { id: 'seated_cable_row_def', name: 'Seated Cable Row', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Cable row', cues: 'Pause and squeeze.' },
          { id: 'machine_shoulder_press', name: 'Machine Shoulder Press', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Machine', cues: 'Stop just short of lockout.' },
          { id: 'db_lateral_raise', name: 'Dumbbell Lateral Raise', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Dumbbells', cues: 'Use lighter weight; strict reps.' },
          { id: 'rope_pushdown_upper', name: 'Rope Pushdown', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Cable', cues: 'Superset with cable curls if the gym is not packed.' },
          { id: 'cable_curl_upper', name: 'Cable Curl', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Cable', cues: 'Superset with rope pushdowns.' },
          { id: 'treadmill_intervals_upper', name: 'Treadmill Intervals', type: 'cardio', sets: 1, min: 10, max: 12, increment: 2, unit: 'min', equipment: 'Treadmill', cues: '1 min hard walk / 1 min easy walk.' }
        ]
      },
      {
        day: 6,
        type: 'lift',
        title: 'Legs B',
        focus: 'Hamstrings, glutes, calves',
        warmup: '5 minutes bike + light RDL pattern before working sets.',
        note: 'No lunges. This day is posterior-chain focused.',
        exercises: [
          { id: 'smith_rdl', name: 'Smith Machine Romanian Deadlift', type: 'weighted', sets: 4, min: 8, max: 10, increment: 10, equipment: 'Smith machine', cues: 'Hips back; feel hamstrings; neutral spine.' },
          { id: 'high_foot_leg_press', name: 'High-Foot Leg Press', type: 'weighted', sets: 3, min: 10, max: 12, increment: 10, equipment: 'Leg press', cues: 'Feet higher to hit glutes/hamstrings.' },
          { id: 'seated_leg_curl_b', name: 'Seated Leg Curl', type: 'weighted', sets: 3, min: 10, max: 12, increment: 5, equipment: 'Leg curl', cues: 'Slow lower; squeeze hard.' },
          { id: 'cable_glute_kickback', name: 'Cable Glute Kickback', type: 'weighted', sets: 3, min: 12, max: 15, increment: 5, equipment: 'Cable', cues: 'Log weight per side; keep torso stable.' },
          { id: 'hip_abductor', name: 'Hip Abductor Machine', type: 'weighted', sets: 3, min: 15, max: 20, increment: 5, equipment: 'Machine', cues: 'Pause wide; control return.' },
          { id: 'leg_extension_b', name: 'Leg Extension', type: 'weighted', sets: 2, min: 12, max: 15, increment: 5, equipment: 'Leg extension', cues: 'Extra quad volume without lunges.' },
          { id: 'calf_press_leg_press', name: 'Calf Press on Leg Press', type: 'weighted', sets: 4, min: 12, max: 20, increment: 10, equipment: 'Leg press', cues: 'Full stretch and full squeeze.' },
          { id: 'bike_legs_b', name: 'Bike', type: 'cardio', sets: 1, min: 15, max: 20, increment: 2, unit: 'min', equipment: 'Bike', cues: 'Low impact after hamstrings.' }
        ]
      },
      {
        day: 7,
        type: 'rest',
        title: 'Full Rest',
        focus: 'Recovery, steps, sleep',
        warmup: 'No workout required.',
        note: 'True rest. Optional easy steps only. This is what keeps the routine sustainable.',
        exercises: [
          { id: 'optional_steps_rest', name: 'Optional Easy Steps', type: 'cardio', sets: 1, min: 15, max: 25, increment: 5, unit: 'min', equipment: 'Walk', cues: 'Optional. Keep it easy.' },
          { id: 'light_stretch_rest', name: 'Light Stretching', type: 'timed', sets: 1, min: 5, max: 10, increment: 2, unit: 'min', equipment: 'Mat', cues: 'Optional recovery work only.' }
        ]
      }
    ];

    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
    const esc = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
    const fmtDate = iso => new Date(iso).toLocaleDateString(undefined, { month:'short', day:'numeric', year:'numeric' });
    const fmtTime = iso => new Date(iso).toLocaleTimeString(undefined, { hour:'numeric', minute:'2-digit' });
    const dateKey = (date = new Date()) => { const d = new Date(date); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
    const cleanNumber = value => { const n=Number(value); if(!Number.isFinite(n)) return ''; const r=Math.round(n*100)/100; return Number.isInteger(r)?String(r):String(r); };
    const deepClone = value => JSON.parse(JSON.stringify(value));

    let state = loadState();
    let active = loadActive();
    let currentView = active ? 'workout' : 'home';
    let toastTimer = null;
    let elapsedTimer = null;
    let restTimer = null;
    let restState = null;
    let lastCompletedSession = null;
    let swipeStart = null;
    let progressTab = 'overview';
    let moreSection = 'menu';
    let exerciseSheetOpen = false;

    function defaultState() {
      return {
        version: 2,
        createdAt: new Date().toISOString(),
        settings: {
          currentDayIndex: 0,
          profileName: 'Bobby',
          restSeconds: 90,
          autoRest: true,
          autoNextAfterTarget: false,
          units: 'lb',
          theme: 'dark',
          coachMode: 'fat_loss',
          smithBarWeight: 20,
          deloadEveryWeeks: 8,
          sound: true,
          pfAppUrl: 'shortcuts://run-shortcut?name=Open%20Planet%20Fitness',
          musicAppUrl: 'music://',
          pfFallbackUrl: 'https://apps.apple.com/us/app/planet-fitness/id399857015',
          musicFallbackUrl: 'https://music.apple.com/us/browse',
          progressExerciseId: 'smith_bench'
        },
        goals: { targetWeight: 200, targetBodyFat: 18 },
        exerciseProgress: {},
        history: [],
        bodyMetrics: [],
        dailyCheckins: []
      };
    }

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        const base = defaultState();
        const merged = { ...base, ...parsed };
        merged.settings = { ...base.settings, ...(parsed.settings || {}) };
        merged.goals = { ...base.goals, ...(parsed.goals || {}) };
        merged.history = Array.isArray(parsed.history) ? parsed.history : [];
        merged.bodyMetrics = Array.isArray(parsed.bodyMetrics) ? parsed.bodyMetrics : [];
        merged.dailyCheckins = Array.isArray(parsed.dailyCheckins) ? parsed.dailyCheckins : [];
        merged.exerciseProgress = parsed.exerciseProgress || {};
        return merged;
      } catch (error) {
        console.warn('State load failed', error);
        return defaultState();
      }
    }

    function loadActive() {
      try {
        const raw = localStorage.getItem(ACTIVE_KEY);
        if (!raw) return null;
        const session = JSON.parse(raw);
        session.currentExerciseIndex = Number.isFinite(Number(session.currentExerciseIndex)) ? Number(session.currentExerciseIndex) : 0;
        session.sessionNote = session.sessionNote || '';
        session.exercises = Array.isArray(session.exercises) ? session.exercises.map(entry => ({
          id: entry.id,
          logs: Array.isArray(entry.logs) ? entry.logs : [],
          notes: entry.notes || '',
          draftWeight: Number.isFinite(Number(entry.draftWeight)) ? Number(entry.draftWeight) : null,
          draftReps: Number.isFinite(Number(entry.draftReps)) ? Number(entry.draftReps) : null,
          draftFeel: ['easy','good','hard'].includes(entry.draftFeel) ? entry.draftFeel : 'good',
          draftWarmup: Boolean(entry.draftWarmup)
        })) : [];
        return session;
      } catch (error) {
        console.warn('Active session load failed', error);
        return null;
      }
    }

    function saveState() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (error) { console.warn('State save unavailable', error); } updateChrome(); }
    function saveActive() { try { if(active) localStorage.setItem(ACTIVE_KEY, JSON.stringify(active)); else localStorage.removeItem(ACTIVE_KEY); } catch (error) { console.warn('Active session save unavailable', error); } }
    function getDay(index = state.settings.currentDayIndex) { return PLAN[((Number(index)||0)+PLAN.length)%PLAN.length]; }
    function getExercise(id) { for (const day of PLAN) { const ex = day.exercises.find(item => item.id===id); if(ex) return ex; } return null; }
    function targetLabel(ex) { return (ex.type==='cardio'||ex.type==='timed') ? `${ex.min}–${ex.max} ${ex.unit||'min'}` : `${ex.sets} × ${ex.min}–${ex.max}`; }
    function feelEmoji(feel) { return feel==='easy'?'🟢':feel==='hard'?'🔴':'🟡'; }
    function workingLogs(logs=[]) { return logs.filter(log => !log.warmup); }
    function latestBodyMetric() { return [...state.bodyMetrics].sort((a,b)=>new Date(a.date)-new Date(b.date)).at(-1) || null; }
    function roundTo(value, increment=5) { return Math.round(Number(value)/increment)*increment; }
    function formatDuration(ms) { const total=Math.max(0,Math.floor(Number(ms||0)/1000)); const h=Math.floor(total/3600),m=Math.floor((total%3600)/60),s=total%60; return h?`${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`:`${m}:${String(s).padStart(2,'0')}`; }
    function estimatedMinutes(day) {
      if(day.type==='rest') return 25;
      const working = day.exercises.reduce((sum,ex)=>sum + (ex.type==='weighted'||ex.type==='bodyweight'?ex.sets:0),0);
      const cardio = day.exercises.filter(ex=>ex.type==='cardio'||ex.type==='timed').reduce((sum,ex)=>sum+ex.min,0);
      return Math.round(8 + working*2.15 + cardio);
    }
    function dayMark(day) {
      if(day?.type==='rest') return `<svg viewBox="0 0 64 64" role="img" aria-label="Recovery"><defs><linearGradient id="recoveryGlow" x1="8" y1="52" x2="54" y2="10" gradientUnits="userSpaceOnUse"><stop stop-color="#38BDF8"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient></defs><path d="M17 35c0-10.5 7.8-19.2 18-20.6-4.2 3.7-6.8 9.1-6.8 15.1 0 10.9 8.8 19.7 19.7 19.7 2 0 4-.3 5.8-.9A23 23 0 0 1 17 35Z" fill="url(#recoveryGlow)"/><path d="M43.5 12.5l1.8 4.2 4.2 1.8-4.2 1.8-1.8 4.2-1.8-4.2-4.2-1.8 4.2-1.8 1.8-4.2Z" fill="#E0E7FF"/><path d="M17 18l1.2 2.8L21 22l-2.8 1.2L17 26l-1.2-2.8L13 22l2.8-1.2L17 18Z" fill="#BAE6FD"/></svg>`;
      return `<img src="atlas-mark.svg" alt="" />`;
    }
    function haptic(kind='light') {
      try {
        if(!navigator.vibrate) return;
        const pattern=kind==='success'?[35,45,70]:kind==='medium'?[28]:[12];
        navigator.vibrate(pattern);
      } catch(_) {}
    }
    function animateView() {
      const view=$('#view'); if(!view) return;
      view.classList.remove('view-enter');
      if(active && currentView==='workout') return;
      void view.offsetWidth; view.classList.add('view-enter');
    }
    function greeting() { const h=new Date().getHours(); return h<12?'Good morning':h<17?'Good afternoon':'Good evening'; }
    function showToast(message) { const box=$('#toast'); if(!box) return; box.textContent=message; box.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>box.classList.remove('show'),2800); }

    function updateChrome() {
      document.documentElement.dataset.theme = state.settings.theme || 'dark';
      const day=getDay();
      const sub=$('#headerSub');
      if(sub) sub.textContent = active ? `${day.title} in progress` : 'Built for progress.';
      const focus = Boolean(active && currentView==='workout');
      document.body.classList.toggle('focus-running', focus);
      document.body.dataset.screen = currentView;
      $('#appHeader')?.classList.toggle('hidden', focus || currentView==='complete');
      $('#bottomNav')?.classList.toggle('hidden', focus || currentView==='complete');
      $$('.nav-btn').forEach(btn=>btn.classList.toggle('active', btn.dataset.view===currentView));
    }

    function render() {
      updateChrome();
      if(currentView==='home') renderHome();
      else if(currentView==='workout') active ? renderFocusWorkout() : renderWorkoutPreview();
      else if(currentView==='progress') renderProgress();
      else if(currentView==='plan') renderPlan();
      else if(currentView==='more') renderMore();
      else if(currentView==='complete') renderCompletion();
      animateView();
      window.scrollTo({top:0,behavior:'instant'});
    }

    function stats() {
      const liftSessions=state.history.filter(s=>s.type!=='rest');
      const restDays=state.history.filter(s=>s.type==='rest').length;
      const totalSets=liftSessions.reduce((sum,s)=>sum+(s.exercises||[]).reduce((a,e)=>a+workingLogs(e.logs||[]).length,0),0);
      const totalVolume=liftSessions.reduce((sum,s)=>sum+sessionVolume(s),0);
      const cutoff=new Date();cutoff.setDate(cutoff.getDate()-6);cutoff.setHours(0,0,0,0);
      const thisWeek=state.history.filter(s=>new Date(s.startedAt)>=cutoff).length;
      return {liftSessions:liftSessions.length,restDays,totalSets,totalVolume,thisWeek,streak:calculateStreak()};
    }

    function calculateStreak() {
      const dates=new Set(state.history.map(s=>dateKey(s.startedAt)));
      let cursor=new Date(); let count=0;
      if(!dates.has(dateKey(cursor))) cursor.setDate(cursor.getDate()-1);
      while(dates.has(dateKey(cursor))){count++;cursor.setDate(cursor.getDate()-1);} return count;
    }

    function sessionVolume(session) {
      let total=0;
      for(const entry of session.exercises||[]){
        const ex=getExercise(entry.id); if(!ex||ex.type!=='weighted') continue;
        for(const log of workingLogs(entry.logs||[])){ const w=Number(log.weight),r=Number(log.reps); if(Number.isFinite(w)&&Number.isFinite(r)) total+=w*r; }
      }
      return Math.round(total);
    }

    function sessionWorkingSets(session) { return (session.exercises||[]).reduce((sum,e)=>sum+workingLogs(e.logs||[]).length,0); }
    function sessionCardioMinutes(session) { let total=0; for(const e of session.exercises||[]){ const ex=getExercise(e.id); if(ex&&(ex.type==='cardio'||ex.type==='timed')) for(const log of e.logs||[]) total += Number(log.duration)||0; } return Math.round(total*100)/100; }

    function renderHome() {
      const day=getDay(), st=stats(), metric=latestBodyMetric(), trend=getWeightTrend();
      const isRest=day.type==='rest', resume=Boolean(active), name=state.settings.profileName||'Athlete';
      const coachItems=coachBriefItems(day).slice(0,2);
      $('#view').innerHTML=`
        <div class="home-screen">
          <div class="home-greeting"><div><span>${esc(greeting())},</span><h1>${esc(name)}</h1></div><span class="home-status ${isRest?'rest':''}">${isRest?'Recovery':'Ready'}</span></div>
          <section class="today-card">
            <div class="today-card-top"><div><div class="section-kicker">${resume?'Workout in progress':'Today’s workout'}</div><h2>${esc(day.title)}</h2><p>${esc(day.focus)}</p></div><div class="today-mark">${dayMark(day)}</div></div>
            <div class="today-meta"><span>${estimatedMinutes(day)} min</span><i></i><span>${day.exercises.length} exercises</span><i></i><span>Day ${day.day}/7</span></div>
            <div class="today-actions ${isRest&&!resume?'two':''}">${isRest&&!resume?`<button class="btn subtle" data-action="mark-rest">Mark rest day</button>`:''}<button class="btn primary" data-action="${resume?'resume-workout':'start-workout'}">${resume?'Resume workout':isRest?'Start optional recovery':'Start workout'}<span>→</span></button></div>
          </section>
          <section class="coach-compact">
            <div class="compact-head"><div><span class="section-kicker">Coach brief</span><strong>${isRest?'Keep it easy today':'What matters today'}</strong></div><button class="mini-action" data-action="share-coach" aria-label="Share coach check-in">↗</button></div>
            <div class="coach-compact-list">${coachItems.map((item,i)=>`<div><span>${i+1}</span><p>${esc(item)}</p></div>`).join('')}</div>
          </section>
          <section class="home-bottom-grid">
            <div class="snapshot-card weight-card"><button class="weight-summary" data-view="progress" aria-label="View body progress"><span>Latest weight</span><strong>${metric?`${esc(metric.weight)} lb`:'—'}</strong><small>${metric&&Number.isFinite(trend.avg7)?`7-day avg ${cleanNumber(trend.avg7)} lb`:trend.label}</small></button><button class="weight-add" data-action="open-body-sheet" aria-label="Log today’s body weight">＋</button></div>
            <div class="snapshot-card consistency"><span>This week</span><strong>${st.thisWeek}<small>/7</small></strong><div class="week-dots">${renderWeekDots()}</div></div>
            <div class="quick-square"><button data-action="open-app" data-app="pf" aria-label="Open Planet Fitness">PF</button><button data-action="open-app" data-app="music" aria-label="Open Apple Music">♫</button></div>
          </section>
        </div>`;
    }

    function coachBriefItems(day) {
      if(day.type==='rest') return ['Optional walk: keep the pace conversational.', 'Mobility is enough; finish feeling better than you started.'];
      const items=[];
      for(const ex of day.exercises.filter(ex=>ex.type==='weighted'||ex.type==='bodyweight')){
        const note=state.exerciseProgress[ex.id]?.note;
        if(note) items.push(`${ex.name}: ${note}`);
        if(items.length===2) break;
      }
      if(!items.length) items.push('Use clean working sets and leave 1–2 reps in reserve.', 'Keep the same working weight across your counted sets.');
      if(items.length===1) items.push('Finish with the planned cardio at a controlled pace.');
      return items;
    }

    function renderCoachBrief(day) {
      return coachBriefItems(day).map((text,i)=>`<div class="coach-line"><div class="coach-icon">${i+1}</div><div><span class="muted">${esc(text)}</span></div></div>`).join('');
    }

    function renderQuickLaunch() { return `<div class="quick-launch"><button data-action="open-app" data-app="pf"><span class="quick-badge">PF</span><span>Planet Fitness</span></button><button data-action="open-app" data-app="music"><span class="quick-badge">♫</span><span>Apple Music</span></button></div>`; }

    function renderWeekDots() {
      const today=new Date();today.setHours(0,0,0,0);const done=new Set(state.history.map(s=>dateKey(s.startedAt)));let out='';
      for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(today.getDate()-i);out+=`<i class="${done.has(dateKey(d))?'done':''} ${i===0?'today':''}"></i>`;}
      return out;
    }

    function renderWeekStrip() {
      const today=new Date();today.setHours(0,0,0,0);
      const done=new Map();
      state.history.forEach(s=>done.set(dateKey(s.startedAt),s.type==='rest'?'rest':'lift'));
      let html='';
      for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(today.getDate()-i);const key=dateKey(d), status=done.get(key);html+=`<div class="day-cell ${status?'done':''} ${i===0?'today':''}"><span>${d.toLocaleDateString(undefined,{weekday:'short'}).slice(0,2)}</span><b>${d.getDate()}</b><span>${status==='rest'?'☁️':status?'✓':'·'}</span></div>`;}
      return `<div class="week-strip">${html}</div>`;
    }

    function renderWorkoutPreview() {
      const day=getDay();
      $('#view').innerHTML=`<div class="stack workout-preview-v21">
        <section class="card workout-brief-card"><div class="card-pad">
          <div class="workout-brief-top"><div><div class="eyebrow">Day ${day.day} of 7</div><h1>${esc(day.title)}</h1><p>${esc(day.focus)}</p></div><div class="brief-logo"><img src="atlas-mark.svg" alt=""></div></div>
          <div class="brief-stats"><span>${estimatedMinutes(day)} min</span><span>${day.exercises.length} exercises</span><span>${day.type==='rest'?'Recovery':'Lift day'}</span></div>
          <div class="brief-note"><strong>Warm-up</strong><span>${esc(day.warmup)}</span></div>
          <div class="today-actions ${day.type==='rest'?'two':''}">${day.type==='rest'?'<button class="btn subtle" data-action="mark-rest">Mark rest day</button>':''}<button class="btn primary" data-action="start-workout">${day.type==='rest'?'Start optional recovery':'Start workout'}<span>→</span></button></div>
        </div></section>
        <details class="card workout-list-collapsed"><summary><div><strong>Workout plan</strong><span>${day.exercises.length} exercises · tap to view</span></div><span>⌄</span></summary><div class="workout-list-body">${day.exercises.map((ex,i)=>`<div class="plan-exercise-row"><span>${i+1}</span><div><strong>${esc(ex.name)}</strong><small>${esc(ex.equipment||'')}</small></div><b>${esc(targetLabel(ex))}</b></div>`).join('')}</div></details>
        <div class="day-selector-row"><label>Choose day</label><select data-action="change-day">${PLAN.map((d,i)=>`<option value="${i}" ${i===state.settings.currentDayIndex?'selected':''}>Day ${d.day} · ${esc(d.title)}</option>`).join('')}</select></div>
      </div>`;
    }

    function startWorkout() {
      const day=getDay();
      active={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),dayIndex:state.settings.currentDayIndex,day:day.day,title:day.title,type:day.type,focus:day.focus,startedAt:new Date().toISOString(),sessionNote:'',currentExerciseIndex:0,exercises:day.exercises.map(ex=>({id:ex.id,logs:[],notes:'',draftWeight:initialWeight(ex),draftReps:initialReps(ex),draftFeel:'good',draftWarmup:false}))};
      saveActive();currentView='workout';render();showToast(day.type==='rest'?'Recovery session started.':'Workout started.');
    }

    function initialWeight(ex) { const p=state.exerciseProgress[ex.id]||exerciseAliases(ex.id).map(id=>state.exerciseProgress[id]).find(Boolean); if(ex.type==='weighted') return Number.isFinite(Number(p?.nextWeight))?Number(p.nextWeight):Number.isFinite(Number(p?.lastWeight))?Number(p.lastWeight):null; return null; }
    function initialReps(ex) { const prev=getPreviousExercise(ex.id); const logs=prev?workingLogs(prev.entry.logs||[]):[]; const last=logs.at(-1); return Number.isFinite(Number(last?.reps))?clamp(Number(last.reps),1,99):ex.min; }
    function exerciseAliases(id) {
      const aliases={smith_squat:['smith_squat_box'],leg_press_45:['leg_press'],romanian_deadlift:['smith_rdl']};
      return [id,...(aliases[id]||[])];
    }
    function previousWorkingSet(ex, entry) {
      const current=workingLogs(entry?.logs||[]).at(-1);
      if(current) return {label:formatLogShort(ex,current),source:'This workout'};
      const prev=getPreviousExercise(ex.id), last=prev?workingLogs(prev.entry.logs||[]).at(-1):null;
      return last?{label:formatLogShort(ex,last),source:'Last workout'}:null;
    }
    function renderSetReferences(ex,entry) {
      if(ex.type!=='weighted'&&ex.type!=='bodyweight') return '';
      const previous=previousWorkingSet(ex,entry);
      const p=state.exerciseProgress[ex.id]||exerciseAliases(ex.id).map(id=>state.exerciseProgress[id]).find(Boolean);
      const suggested=nextTargetLabel(ex,p);
      return `<div class="set-reference-row"><div class="set-reference"><span>${esc(previous?.source||'Previous set')}</span><strong>${esc(previous?.label||'No previous set')}</strong></div><div class="set-reference"><span>Suggested next</span><strong>${esc(suggested)}</strong></div></div>`;
    }

    function renderFocusWorkout() {
      if(!active){currentView='workout';renderWorkoutPreview();return;}
      const day=PLAN[active.dayIndex]||getDay();
      active.currentExerciseIndex=clamp(Number(active.currentExerciseIndex)||0,0,Math.max(0,active.exercises.length-1));
      const index=active.currentExerciseIndex, entry=active.exercises[index], ex=getExercise(entry.id), total=active.exercises.length;
      const completed=active.exercises.filter(e=>{const x=getExercise(e.id);return workingLogs(e.logs||[]).length>=(x?.sets||1);}).length;
      const progress=Math.max(4,Math.round(((index+1)/Math.max(1,total))*100));
      $('#view').innerHTML=`<div class="focus-shell">
        <header class="focus-header"><button class="focus-close" data-action="pause-workout" aria-label="Pause workout">×</button><div class="focus-title"><strong>Exercise ${index+1} / ${total}</strong><span>${esc(day.title)}</span></div><button class="focus-menu" data-action="open-exercise-tools" aria-label="Exercise details">•••</button></header>
        <div class="focus-progress"><div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div></div>
        <main class="exercise-stage" id="exerciseStage">${renderFocusCard(ex,entry,index,total)}</main>
        <footer class="focus-bottom"><button class="focus-nav-btn" data-action="${index>0?'previous-exercise':'pause-workout'}">${index>0?'← Previous':'Pause'}</button><div class="focus-elapsed" id="elapsed">${formatDuration(Date.now()-new Date(active.startedAt))}</div><button class="focus-nav-btn primary" data-action="${index<total-1?'next-exercise':'finish-workout'}">${index<total-1?'Next →':'Finish'}</button></footer>
      </div>`;
      bindSwipe();startElapsedClock();
    }

    function renderFocusCard(ex, entry, index, total) {
      if(!ex) return '<div class="empty">Exercise unavailable.</div>';
      const logs=entry.logs||[], working=workingLogs(logs), targetHit=working.length>=ex.sets;
      const weight=Number.isFinite(Number(entry.draftWeight))?Number(entry.draftWeight):(initialWeight(ex)||'');
      const reps=Number.isFinite(Number(entry.draftReps))?Number(entry.draftReps):ex.min;
      return `<article class="exercise-focus-card"><div class="exercise-card-inner">
        <div class="exercise-card-head"><div><span class="exercise-number">${targetHit?'Target complete':`Set ${Math.min(working.length+1,ex.sets)} of ${ex.sets}`}</span><button class="exercise-head-tap" data-action="open-exercise-tools" aria-label="Open exercise picture and instructions"><h1 class="exercise-title">${esc(ex.name)}</h1><div class="exercise-target">${esc(targetLabel(ex))} · ${esc(ex.equipment||'')}</div><small>Tap for picture, cues, and notes</small></button>${renderExerciseNoteChip(entry)}</div><button class="details-dot" data-action="open-exercise-tools" aria-label="Details">•••</button></div>
        ${renderPreviousCard(ex)}
        ${logs.length?`<div class="logged-strip">${logs.slice(-6).map((log,i)=>renderLoggedSet(ex,log,Math.max(0,logs.length-6)+i,index)).join('')}</div>`:'<div class="logged-placeholder">No sets logged yet</div>'}
        <div class="focus-log-wrap">${renderFocusLogPanel(ex,entry,index,weight,reps)}</div>
      </div></article>`;
    }

    function renderPreviousCard(ex) {
      const prev=getPreviousExercise(ex.id), p=state.exerciseProgress[ex.id]||exerciseAliases(ex.id).map(id=>state.exerciseProgress[id]).find(Boolean);
      if(!prev) return `<div class="previous-compact"><div><span>Previous</span><strong>First session</strong></div><div class="previous-grid"><div class="previous-stat"><span>Last time</span><strong>Not logged yet</strong></div><div class="previous-stat"><span>Suggested next</span><strong>Start clean</strong></div></div><p><span>Coach</span>Choose a clean starting load and leave 1–3 reps in reserve.</p></div>`;
      const logs=workingLogs(prev.entry.logs||[]);
      const lastSummary=logs.length ? logs.slice(-3).map(log=>formatLogShort(ex,log)).join(' · ') : 'Logged';
      const suggestion=nextTargetLabel(ex,p);
      return `<div class="previous-compact"><div class="previous-row"><div><span>Previous · ${fmtDate(prev.session.startedAt)}</span><div class="previous-set-row">${logs.slice(-5).map(log=>`<b>${esc(formatLogShort(ex,log))}</b>`).join('')}</div></div></div><div class="previous-grid"><div class="previous-stat"><span>Last time</span><strong>${esc(lastSummary)}</strong></div><div class="previous-stat"><span>Suggested next</span><strong>${esc(suggestion)}</strong></div></div><p><span>Coach</span>${esc(p?.note||'Repeat the last clean setup.')}</p></div>`;
    }

    function renderLoggedSet(ex, log, setIndex, exerciseIndex) {
      const label=formatLogShort(ex,log); return `<button class="logged-set ${log.warmup?'warmup':''}" data-action="edit-set" data-set-index="${setIndex}" title="Tap to delete"><b>${esc(label)}</b><span>${log.warmup?'warm-up':`${feelEmoji(log.feel)} set ${setIndex+1}`}</span></button>`;
    }

    function renderFocusLogPanel(ex, entry, index, weight, reps) {
      const feel=entry.draftFeel||'good', setNo=workingLogs(entry.logs||[]).length+1;
      if(ex.type==='weighted') return `<div class="compact-log-panel">
        ${renderSetReferences(ex,entry)}
        <div class="control-grid">
          <div class="control-block"><div class="control-label"><span>Weight</span><small>${state.settings.units}</small></div><div class="compact-stepper"><button data-action="adjust-weight" data-delta="-5">−</button><input inputmode="decimal" data-input="weight" value="${esc(weight)}" placeholder="0"><button data-action="adjust-weight" data-delta="5">+</button></div>${Number.isFinite(Number(state.exerciseProgress[ex.id]?.nextWeight))?'<div class="prefill-badge">Suggested weight prefilled</div>':''}<div class="micro-adjust"><button data-action="adjust-weight" data-delta="-10">−10</button><button data-action="adjust-weight" data-delta="-5">−5</button><button data-action="adjust-weight" data-delta="5">+5</button><button data-action="adjust-weight" data-delta="10">+10</button></div></div>
          <div class="control-block"><div class="control-label"><span>Reps</span><small>${ex.min}–${ex.max}</small></div><div class="compact-stepper"><button data-action="adjust-reps" data-delta="-1">−</button><input inputmode="numeric" data-input="reps" value="${esc(reps)}"><button data-action="adjust-reps" data-delta="1">+</button></div><div class="rep-hint">Target ${ex.min}–${ex.max}</div></div>
        </div>${renderFeelOnly(entry,feel)}<button class="log-set-btn" data-action="log-set">Log set ${setNo}<span>✓</span></button>
      </div>`;
      if(ex.type==='bodyweight') return `<div class="compact-log-panel single-control">${renderSetReferences(ex,entry)}<div class="control-block"><div class="control-label"><span>Reps</span><small>${ex.min}–${ex.max}</small></div><div class="compact-stepper"><button data-action="adjust-reps" data-delta="-1">−</button><input inputmode="numeric" data-input="reps" value="${esc(reps)}"><button data-action="adjust-reps" data-delta="1">+</button></div></div>${renderFeelOnly(entry,feel)}<button class="log-set-btn" data-action="log-set">Log set ${setNo}<span>✓</span></button></div>`;
      const duration=Number.isFinite(Number(entry.draftReps))?Number(entry.draftReps):ex.min;
      return `<div class="compact-log-panel single-control"><div class="control-block"><div class="control-label"><span>Duration</span><small>${esc(ex.unit||'min')}</small></div><div class="compact-stepper"><button data-action="adjust-duration" data-delta="-1">−</button><input inputmode="decimal" data-input="duration" value="${esc(duration)}"><button data-action="adjust-duration" data-delta="1">+</button></div><div class="rep-hint">Target ${ex.min}–${ex.max} ${esc(ex.unit||'min')}</div></div><button class="log-set-btn" data-action="log-set">Log ${esc(ex.unit||'time')}<span>✓</span></button></div>`;
    }

    function renderRepAndFeel(entry,reps,feel) { return renderFeelOnly(entry,feel); }
    function renderFeelOnly(entry,feel) { return `<div class="feel-row"><button class="feel-btn easy ${feel==='easy'?'active':''}" data-action="set-feel" data-feel="easy">Easy</button><button class="feel-btn right ${feel==='good'?'active':''}" data-action="set-feel" data-feel="good">Just right</button><button class="feel-btn hard ${feel==='hard'?'active':''}" data-action="set-feel" data-feel="hard">Hard</button></div><label class="warm-compact"><div><span>Warm-up set</span><small>Tracked separately and does not count toward your working sets or stats.</small></div><input type="checkbox" data-input="warmup" ${entry.draftWarmup?'checked':''}></label>`; }

    function renderExerciseSheet(ex,entry,index){return `<div class="sheet-backdrop exercise-sheet-overlay" id="exerciseSheetOverlay"><section class="bottom-sheet" role="dialog" aria-modal="true" aria-label="Exercise details"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">Exercise details</span><h2>${esc(ex.name)}</h2></div><button data-action="close-exercise-tools" aria-label="Close">×</button></div><div class="sheet-section"><div class="exercise-hero"><div class="exercise-hero-visual">${renderExerciseVisual(ex)}</div><div class="exercise-hero-copy"><strong class="sheet-section-title">Quick guide</strong><div class="sheet-meta-chips"><span class="sheet-chip">${esc(targetLabel(ex))}</span><span class="sheet-chip">${esc(ex.equipment||'Gym floor')}</span></div><p>${esc(ex.cues||'Use controlled reps and clean form.')}</p></div></div></div><div class="sheet-section"><strong class="sheet-section-title">How to do it</strong><ol class="cue-steps">${exerciseSteps(ex).map(step=>`<li>${esc(step)}</li>`).join('')}</ol></div><div class="sheet-section"><label class="sheet-section-title">Exercise note</label><textarea data-input="exercise-note" placeholder="Seat position, grip, machine used, discomfort…">${esc(entry.notes||'')}</textarea></div>${ex.name.includes('Smith Machine')?`<div class="sheet-section">${renderPlateTool(ex,index,entry.draftWeight)}</div>`:''}<button class="btn danger block" data-action="delete-last-set">Delete last set</button><button class="btn danger block" style="margin-top:10px" data-action="cancel-workout">Cancel workout</button></section></div>`;}
    function renderExerciseNoteChip(entry) {
      const note = String(entry?.notes || '').trim();
      if (!note) return '<button class="exercise-note-chip empty" data-action="open-exercise-tools" aria-label="Add an exercise note">📝 Add note</button>';
      return `<button class="exercise-note-chip" data-action="open-exercise-tools" aria-label="Edit exercise note"><strong>📝 Note</strong><span>${esc(note)}</span></button>`;
    }

    function nextTargetLabel(ex, progress) {
      if (!progress) return 'Repeat last clean setup';
      if (ex.type === 'weighted' && Number.isFinite(Number(progress.nextWeight))) return `${cleanNumber(progress.nextWeight)} ${state.settings.units}`;
      if ((ex.type === 'cardio' || ex.type === 'timed') && Number.isFinite(Number(progress.nextDuration))) return `${cleanNumber(progress.nextDuration)} ${ex.unit||'min'}`;
      return progress.lastSummary || progress.note || 'Repeat last clean setup';
    }

    function renderExerciseVisual(ex) {
      const lower = `${ex.id} ${ex.name} ${ex.equipment||''}`.toLowerCase();
      const stroke = '#E7EEFF', accent = '#7EA6FF', accent2 = '#A78BFA';
      const pose=(label,svg,kind)=>`<div class="exercise-pose ${kind}"><span class="pose-label">${label}</span>${svg}</div>`;
      if (lower.includes('bench') || (lower.includes('chest press') && !lower.includes('shoulder'))) {
        const start=`<svg viewBox="0 0 80 70"><path d="M10 53h58" stroke="${stroke}" stroke-width="4"/><circle cx="28" cy="31" r="5" fill="${accent}"/><path d="M32 35l14 5 12-9M39 40l-4 12M45 40l7 12" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/><path d="M18 26h42" stroke="${accent2}" stroke-width="5" stroke-linecap="round"/></svg>`;
        const finish=`<svg viewBox="0 0 80 70"><path d="M10 53h58" stroke="${stroke}" stroke-width="4"/><circle cx="28" cy="31" r="5" fill="${accent}"/><path d="M32 35l14 5 12-9M39 40l-4 12M45 40l7 12" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/><path d="M18 13h42" stroke="${accent2}" stroke-width="5" stroke-linecap="round"/><path d="M30 31V15M52 31V15" stroke="${accent2}" stroke-width="4" stroke-linecap="round"/></svg>`;
        return pose('START',start,'start')+pose('FINISH',finish,'finish');
      }
      if (lower.includes('leg press')) {
        const start=`<svg viewBox="0 0 80 70"><path d="M9 56h38" stroke="${stroke}" stroke-width="4"/><rect x="52" y="11" width="18" height="47" rx="5" fill="none" stroke="${stroke}" stroke-width="4"/><circle cx="28" cy="22" r="5" fill="${accent}"/><path d="M30 28l10 10 11 5M40 38l-8 13M50 43l8-12" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/></svg>`;
        const finish=`<svg viewBox="0 0 80 70"><path d="M9 56h38" stroke="${stroke}" stroke-width="4"/><rect x="52" y="11" width="18" height="47" rx="5" fill="none" stroke="${stroke}" stroke-width="4"/><circle cx="28" cy="22" r="5" fill="${accent}"/><path d="M30 28l10 10 11 5M40 38l-8 13M50 43l17-23" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/></svg>`;
        return pose('BOTTOM',start,'start')+pose('PRESS',finish,'finish');
      }
      if (lower.includes('squat')) {
        const start=`<svg viewBox="0 0 80 70"><circle cx="40" cy="14" r="5" fill="${accent}"/><path d="M40 20v19m0 0-12 12m12-12 12 12M28 51l-5 11m29-11 5 11M20 23h40" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/></svg>`;
        const finish=`<svg viewBox="0 0 80 70"><circle cx="40" cy="24" r="5" fill="${accent}"/><path d="M40 30l-2 14m0 0-15 7m15-7 15 7M23 51l-5 9m35-9 5 9M20 23h40" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/></svg>`;
        return pose('TOP',start,'start')+pose('DEPTH',finish,'finish');
      }
      if (lower.includes('deadlift') || lower.includes('rdl')) {
        const start=`<svg viewBox="0 0 80 70"><circle cx="39" cy="13" r="5" fill="${accent}"/><path d="M39 19v20m0 0-10 18m10-18 11 18M18 57h44" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/><circle cx="16" cy="57" r="6" fill="${accent2}"/><circle cx="64" cy="57" r="6" fill="${accent2}"/></svg>`;
        const finish=`<svg viewBox="0 0 80 70"><circle cx="42" cy="19" r="5" fill="${accent}"/><path d="M40 25l-4 16-12 13m12-13 15 11M18 57h44" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/><circle cx="16" cy="57" r="6" fill="${accent2}"/><circle cx="64" cy="57" r="6" fill="${accent2}"/></svg>`;
        return pose('TALL',start,'start')+pose('HINGE',finish,'finish');
      }
      if (lower.includes('curl')) {
        const start=`<svg viewBox="0 0 80 70"><circle cx="40" cy="13" r="5" fill="${accent}"/><path d="M40 20v20m0 0-10 18m10-18 10 18M28 29l-5 18m29-18 5 18" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/><circle cx="22" cy="50" r="5" fill="${accent2}"/><circle cx="58" cy="50" r="5" fill="${accent2}"/></svg>`;
        const finish=`<svg viewBox="0 0 80 70"><circle cx="40" cy="13" r="5" fill="${accent}"/><path d="M40 20v20m0 0-10 18m10-18 10 18M28 29l-2 10m26-10 2 10" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/><circle cx="25" cy="35" r="5" fill="${accent2}"/><circle cx="55" cy="35" r="5" fill="${accent2}"/></svg>`;
        return pose('BOTTOM',start,'start')+pose('SQUEEZE',finish,'finish');
      }
      if (lower.includes('row') || lower.includes('pulldown') || lower.includes('face pull')) {
        const start=`<svg viewBox="0 0 80 70"><circle cx="31" cy="18" r="5" fill="${accent}"/><path d="M31 24l5 17 12 8m-10-9-10 15" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/><path d="M64 10v48M60 24L43 36" stroke="${accent2}" stroke-width="4" stroke-linecap="round"/></svg>`;
        const finish=`<svg viewBox="0 0 80 70"><circle cx="31" cy="18" r="5" fill="${accent}"/><path d="M31 24l5 17 12 8m-10-9-10 15" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/><path d="M64 10v48M55 28L38 34" stroke="${accent2}" stroke-width="4" stroke-linecap="round"/></svg>`;
        return pose('REACH',start,'start')+pose('PULL',finish,'finish');
      }
      if (lower.includes('press')) {
        const start=`<svg viewBox="0 0 80 70"><circle cx="40" cy="15" r="5" fill="${accent}"/><path d="M40 21v20m0 0-10 17m10-17 10 17M30 28l-8 8m28-8 8 8" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/><circle cx="20" cy="38" r="5" fill="${accent2}"/><circle cx="60" cy="38" r="5" fill="${accent2}"/></svg>`;
        const finish=`<svg viewBox="0 0 80 70"><circle cx="40" cy="25" r="5" fill="${accent}"/><path d="M40 31v20m0 0-10 12m10-12 10 12M32 32l-5-17m21 17 5-17" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/><circle cx="26" cy="12" r="5" fill="${accent2}"/><circle cx="54" cy="12" r="5" fill="${accent2}"/></svg>`;
        return pose('START',start,'start')+pose('LOCKOUT',finish,'finish');
      }
      const a=`<svg viewBox="0 0 80 70"><circle cx="40" cy="15" r="5" fill="${accent}"/><path d="M40 21v20m0 0-10 17m10-17 10 17M31 29l-10 9m28-9 10 9" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/></svg>`;
      const b=`<svg viewBox="0 0 80 70"><circle cx="40" cy="15" r="5" fill="${accent}"/><path d="M40 21v20m0 0-10 17m10-17 10 17M31 29l-14-4m32 4 14-4" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/></svg>`;
      return pose('START',a,'start')+pose('FINISH',b,'finish');
    }

    function exerciseSteps(ex) {
      const lower = `${ex.id} ${ex.name} ${ex.equipment||''}`.toLowerCase();
      if (lower.includes('leg press')) return ['Set your feet shoulder-width with your full foot on the platform and unlock the safeties.', 'Lower the sled under control until your knees are bent comfortably, then drive through the mid-foot to press it away.', 'Keep tension the whole time and avoid snapping your knees straight at the top.'];
      if (lower.includes('squat')) return ['Set the bar at upper-chest height, brace your core, and place your feet just outside shoulder-width.', 'Sit straight down with control until depth is clean, then drive up through your mid-foot.', 'Keep your ribs down and avoid letting your knees cave in.'];
      if (lower.includes('deadlift') || lower.includes('rdl')) return ['Stand tall with dumbbells close to your legs and keep a soft bend in your knees.', 'Push your hips back until you feel a hamstring stretch, then stand back up by driving the hips forward.', 'Keep the weights close and your back neutral the whole set.'];
      if (lower.includes('row') || lower.includes('pulldown') || lower.includes('face pull')) return ['Set your body position first so your chest stays proud and your torso stays still.', 'Pull with your elbows and pause for a beat when the handle reaches the finishing position.', 'Return under control instead of letting the weight yank you forward.'];
      if (lower.includes('curl') || lower.includes('pushdown') || lower.includes('triceps')) return ['Lock in your upper-arm position before each rep.', 'Move the weight smoothly through the full range and squeeze the target muscle at the hardest point.', 'Avoid swinging or turning it into a full-body movement.'];
      if (lower.includes('calf')) return ['Place the balls of your feet on the platform and let your heels drop into a stretch.', 'Press all the way up onto your toes, pause, then lower slowly again.', 'Use a full range of motion instead of bouncing.'];
      if (ex.type === 'cardio' || ex.type === 'timed') return ['Start easy for the first minute and settle into the planned pace.', 'Keep your posture tall and your breathing controlled while you move.', 'Finish feeling worked, not wrecked, so you recover well for the next session.'];
      return ['Set yourself up so the machine, seat, or handles feel locked in before the first rep.', 'Move with control and match the target rep range for this exercise.', 'Use the cue above to stay strict and make every working set count.'];
    }

    function removeExerciseToolsOverlay() {
      $('#exerciseSheetOverlay')?.remove();
      document.body.classList.remove('exercise-sheet-open');
      exerciseSheetOpen=false;
    }

    function bindExerciseToolsOverlay() {
      const overlay=$('#exerciseSheetOverlay'),sheet=overlay?.querySelector('.bottom-sheet');
      if(!overlay||!sheet)return;
      overlay.addEventListener('click',event=>{if(event.target===overlay)closeExerciseTools();});
      let startY=null;
      sheet.addEventListener('touchstart',event=>{const t=event.changedTouches?.[0];startY=t?t.clientY:null;},{passive:true});
      sheet.addEventListener('touchend',event=>{if(startY===null)return;const t=event.changedTouches?.[0],dy=t?t.clientY-startY:0;startY=null;if(dy>85)closeExerciseTools();},{passive:true});
    }

    function openExerciseTools(){
      if(!active)return;
      syncDraftFromInputs();
      removeExerciseToolsOverlay();
      const index=active.currentExerciseIndex,entry=active.exercises[index],ex=getExercise(entry?.id);
      if(!entry||!ex)return;
      exerciseSheetOpen=true;
      document.body.classList.add('exercise-sheet-open');
      document.body.insertAdjacentHTML('beforeend',renderExerciseSheet(ex,entry,index));
      bindExerciseToolsOverlay();
    }

    function closeExerciseTools(){
      if(active)syncDraftFromInputs();
      removeExerciseToolsOverlay();
      if(active&&currentView==='workout')renderFocusWorkout();
    }

    function renderPlateTool(ex,index,weight) { return `<div><strong style="color:#fff">Smith plate calculator</strong><div class="muted" style="margin-top:4px">Target ${esc(weight||0)} lb · starting resistance ${esc(state.settings.smithBarWeight)} lb</div><div style="margin-top:8px;color:#fff;font-weight:850">${esc(plateCalculation(Number(weight)||0,Number(state.settings.smithBarWeight)||0))}</div></div>`; }
    function plateCalculation(total,bar) { if(!Number.isFinite(total)||total<=0) return 'Enter a target weight.'; const per=Math.max(0,(total-bar)/2); const plates=[45,35,25,10,5,2.5]; let remaining=per, used=[]; for(const p of plates){const count=Math.floor((remaining+.001)/p);for(let i=0;i<count;i++)used.push(p);remaining-=count*p;} return remaining>.2?`${cleanNumber(per)} lb per side (closest plates vary)`:`Per side: ${used.length?used.join(' + '):'no plates'}`; }

    function getPreviousExercise(id) {
      const ids=exerciseAliases(id);
      const sessions=[...state.history].sort((a,b)=>new Date(b.startedAt)-new Date(a.startedAt));
      for(const session of sessions){const entry=(session.exercises||[]).find(e=>ids.includes(e.id) && (e.logs||[]).length);if(entry)return{session,entry};} return null;
    }

    function formatLogShort(ex,log) {
      if(ex.type==='weighted') return `${log.warmup?'WU ':''}${cleanNumber(log.weight)}×${cleanNumber(log.reps)}`;
      if(ex.type==='bodyweight') return `${log.warmup?'WU ':''}${cleanNumber(log.reps)} reps${log.weight?` +${cleanNumber(log.weight)}`:''}`;
      return `${cleanNumber(log.duration)} ${ex.unit||'min'}`;
    }

    function syncDraftFromInputs() {
      if(!active) return; const entry=active.exercises[active.currentExerciseIndex], ex=getExercise(entry.id); if(!entry||!ex)return;
      const weight=Number($('[data-input="weight"]')?.value); if(Number.isFinite(weight)&&weight>=0) entry.draftWeight=weight;
      const reps=Number($('[data-input="reps"]')?.value); if(Number.isFinite(reps)&&reps>0) entry.draftReps=reps;
      const duration=Number($('[data-input="duration"]')?.value); if(Number.isFinite(duration)&&duration>0) entry.draftReps=duration;
      const note=$('[data-input="exercise-note"]')?.value; if(typeof note==='string') entry.notes=note;
      const warmup=$('[data-input="warmup"]'); if(warmup) entry.draftWarmup=Boolean(warmup.checked);
      saveActive();
    }

    function adjustDraft(kind,delta) {
      if(!active)return; const entry=active.exercises[active.currentExerciseIndex], ex=getExercise(entry.id); if(!entry||!ex)return;
      syncDraftFromInputs();
      if(kind==='weight'){const current=Number(entry.draftWeight)||0;entry.draftWeight=Math.max(0,Math.round((current+Number(delta))*100)/100);}
      if(kind==='reps'||kind==='duration'){const current=Number(entry.draftReps)||ex.min;entry.draftReps=Math.max(1,Math.round((current+Number(delta))*100)/100);}
      saveActive(); renderFocusWorkout();
    }

    function setFeel(feel) { if(!active)return; syncDraftFromInputs(); const entry=active.exercises[active.currentExerciseIndex];entry.draftFeel=['easy','good','hard'].includes(feel)?feel:'good';saveActive();renderFocusWorkout(); }

    function logSet() {
      if(!active)return; const index=active.currentExerciseIndex,entry=active.exercises[index],ex=getExercise(entry.id);if(!ex)return;
      syncDraftFromInputs(); const warmup=Boolean(entry.draftWarmup),feel=entry.draftFeel||'good';
      if(ex.type==='weighted'){
        const weight=Number(entry.draftWeight),reps=Number(entry.draftReps);if(!Number.isFinite(weight)||weight<=0||!Number.isFinite(reps)||reps<=0){showToast('Enter weight and reps.');return;}
        entry.logs.push({weight,reps,feel,warmup,at:new Date().toISOString()});
      } else if(ex.type==='bodyweight'){
        const reps=Number(entry.draftReps);if(!Number.isFinite(reps)||reps<=0){showToast('Enter reps.');return;}entry.logs.push({reps,weight:null,feel,warmup,at:new Date().toISOString()});
      } else {
        const duration=Number(entry.draftReps);if(!Number.isFinite(duration)||duration<=0){showToast('Enter duration.');return;}entry.logs.push({duration,note:$('[data-input="cardio-note"]')?.value?.trim()||'',at:new Date().toISOString()});
      }
      entry.draftFeel='good'; entry.draftWarmup=false; saveActive(); renderFocusWorkout();
      if(state.settings.autoRest && ex.type!=='cardio' && ex.type!=='timed') startRest(Number(state.settings.restSeconds)||90);
      else showToast(`${ex.name} logged.`);
    }

    function deleteLastSet() { if(!active)return;const entry=active.exercises[active.currentExerciseIndex];if(!entry.logs.length){showToast('No set to delete.');return;}entry.logs.pop();saveActive();renderFocusWorkout();showToast('Last set removed.'); }
    function deleteSpecificSet(setIndex) { if(!active)return;const entry=active.exercises[active.currentExerciseIndex];if(!confirm('Delete this set?'))return;entry.logs.splice(Number(setIndex),1);saveActive();renderFocusWorkout(); }

    function nextExercise(delta=1) { if(!active)return;syncDraftFromInputs();removeExerciseToolsOverlay();active.currentExerciseIndex=clamp(active.currentExerciseIndex+delta,0,active.exercises.length-1);saveActive();renderFocusWorkout(); }
    function jumpExercise(index) { if(!active)return;syncDraftFromInputs();removeExerciseToolsOverlay();active.currentExerciseIndex=clamp(Number(index),0,active.exercises.length-1);saveActive();renderFocusWorkout(); }
    function pauseWorkout() { syncDraftFromInputs();removeExerciseToolsOverlay();currentView='home';render();showToast('Workout paused. Your sets are saved.'); }

    function bindSwipe() {
      const stage=$('#exerciseStage');if(!stage)return;
      stage.addEventListener('touchstart',event=>{if(event.target.closest('button,input,textarea,select,summary'))return;const t=event.changedTouches[0];swipeStart={x:t.clientX,y:t.clientY};},{passive:true});
      stage.addEventListener('touchend',event=>{if(!swipeStart)return;const t=event.changedTouches[0],dx=t.clientX-swipeStart.x,dy=t.clientY-swipeStart.y;swipeStart=null;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.25)nextExercise(dx<0?1:-1);},{passive:true});
    }

    function startElapsedClock() { clearInterval(elapsedTimer);elapsedTimer=setInterval(()=>{const el=$('#elapsed');if(active&&el)el.textContent=formatDuration(Date.now()-new Date(active.startedAt));},1000); }

    function startRest(seconds) {
      stopRest(); const duration=Math.max(5,Number(seconds)||90); restState={start:Date.now(),end:Date.now()+duration*1000,duration};
      renderRest(); restTimer=setInterval(updateRest,250);
    }
    function renderRest() {
      const ex=active?getExercise(active.exercises[active.currentExerciseIndex]?.id):null;
      document.body.insertAdjacentHTML('beforeend',`<div class="rest-overlay" id="restOverlay"><div class="rest-card"><div class="rest-label">Rest</div><div class="rest-ring" id="restRing"><div class="rest-time" id="restTime">${formatRest(restState.duration)}</div></div><div class="rest-next">Breathe, reset your setup, and get ready for the next ${ex?esc(ex.name):'set'}.</div><div class="rest-actions"><button class="btn" data-action="add-rest">+30 sec</button><button class="btn primary" data-action="skip-rest">Skip rest</button></div></div></div>`);
    }
    function updateRest() { if(!restState)return;const remaining=Math.max(0,restState.end-Date.now()),pct=(remaining/(restState.duration*1000))*100;const time=$('#restTime'),ring=$('#restRing');if(time)time.textContent=formatRest(Math.ceil(remaining/1000));if(ring)ring.style.setProperty('--rest-pct',`${pct}%`);if(remaining<=0){finishRest();} }
    function formatRest(seconds){const s=Math.max(0,Math.ceil(seconds));return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}
    function finishRest(){stopRest();beep();showToast('Rest complete.');}
    function stopRest(){clearInterval(restTimer);restTimer=null;restState=null;$('#restOverlay')?.remove();}
    function addRest(){if(!restState)return;restState.end+=30000;restState.duration+=30;updateRest();}
    function beep(){try{if(state.settings.sound){const Ctx=window.AudioContext||window.webkitAudioContext;const ctx=new Ctx();const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=660;g.gain.setValueAtTime(.08,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.28);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.3);}if(navigator.vibrate)navigator.vibrate([120,60,120]);}catch(_){} }

    function currentPRScores() { const scores={};for(const day of PLAN)for(const ex of day.exercises){const best=bestSet(ex.id);if(best)scores[ex.id]=best.score;}return scores; }
    function bestSet(id, history=state.history) { const ex=getExercise(id);if(!ex)return null;let best=null;for(const s of history)for(const e of s.exercises||[]){if(e.id!==id)continue;for(const log of workingLogs(e.logs||[])){let score=null;if(ex.type==='weighted'){const w=Number(log.weight),r=Number(log.reps);if(Number.isFinite(w)&&Number.isFinite(r))score=w*(1+r/30);}else if(ex.type==='bodyweight'){score=Number(log.reps);}if(Number.isFinite(score)&&(!best||score>best.score))best={score,log,date:s.startedAt};}}return best; }

    function finishWorkout() {
      if(!active)return;syncDraftFromInputs();const count=active.exercises.reduce((sum,e)=>sum+(e.logs||[]).length,0);if(!count&&!confirm('No activity has been logged. Save this workout anyway?'))return;
      const prior=currentPRScores(),now=new Date().toISOString();const session={...deepClone(active),endedAt:now,completedAt:now,durationMs:new Date(now)-new Date(active.startedAt),prs:[]};
      state.history.push(session);rebuildProgress();
      const seen=new Set();for(const entry of session.exercises||[]){if(seen.has(entry.id))continue;seen.add(entry.id);const after=bestSet(entry.id),before=prior[entry.id];const ex=getExercise(entry.id);if(ex&&after&&Number.isFinite(before)&&after.score>before+.01)session.prs.push({exerciseId:entry.id,name:ex.name,value:formatLogShort(ex,after.log),score:after.score,date:now});}
      state.settings.currentDayIndex=(active.dayIndex+1)%PLAN.length;lastCompletedSession=session;active=null;removeExerciseToolsOverlay();saveActive();saveState();stopRest();currentView='complete';render();
    }

    function markRest() {
      const day=getDay(),now=new Date().toISOString();const session={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),dayIndex:state.settings.currentDayIndex,day:day.day,title:day.title,type:'rest',focus:day.focus,startedAt:now,endedAt:now,completedAt:now,durationMs:0,exercises:[],prs:[]};state.history.push(session);state.settings.currentDayIndex=(state.settings.currentDayIndex+1)%PLAN.length;lastCompletedSession=session;saveState();currentView='complete';render();
    }

    function renderCompletion() {
      const s=lastCompletedSession || [...state.history].sort((a,b)=>new Date(b.startedAt)-new Date(a.startedAt))[0];if(!s){currentView='home';render();return;}
      const working=sessionWorkingSets(s),volume=sessionVolume(s),cardio=sessionCardioMinutes(s),recs=(s.exercises||[]).map(e=>({ex:getExercise(e.id),p:state.exerciseProgress[e.id]})).filter(x=>x.ex&&x.p?.note).slice(0,2);
      $('#view').innerHTML=`<div class="completion-screen"><div class="completion-brand"><div class="completion-mark"><img src="atlas-mark.svg" alt=""></div><div class="eyebrow">Workout complete</div><h1>${esc(s.title)}</h1><p>Your session is saved.</p></div><div class="completion-stats"><div><span>Duration</span><strong>${formatDuration(s.durationMs)}</strong></div><div><span>Working sets</span><strong>${working}</strong></div><div><span>Volume</span><strong>${volume.toLocaleString()}</strong><small>lb</small></div>${cardio?`<div><span>Cardio</span><strong>${cardio}</strong><small>min</small></div>`:''}</div>${s.prs?.length?`<div class="completion-pr"><span>🏆 New PR</span><strong>${esc(s.prs[0].name)}</strong><small>${esc(s.prs[0].value)}${s.prs.length>1?` · +${s.prs.length-1} more`:''}</small></div>`:''}<div class="completion-notes"><span class="section-kicker">Coach notes</span>${recs.length?recs.map(x=>`<p><strong>${esc(x.ex.name)}</strong> · ${esc(x.p.note)}</p>`).join(''):'<p>Rest day logged. Your next workout is ready when you are.</p>'}</div><button class="btn primary block completion-button" data-action="complete-done">Return home</button></div>`;
    }

    function analyzeExercise(ex, logs, previous={}) {
      const clean=logs||[],base={lastDate:new Date().toISOString(),completedCount:(previous.completedCount||0)+1,lastSummary:clean.map(l=>formatLogShort(ex,l)).join(', ')};
      if(ex.type==='weighted'){
        const all=clean.filter(l=>Number.isFinite(Number(l.weight))&&Number.isFinite(Number(l.reps))),working=all.filter(l=>!l.warmup),source=(working.length?working:all).slice(-ex.sets);if(!source.length)return{...previous,...base};
        const weights=source.map(l=>Number(l.weight)),reps=source.map(l=>Number(l.reps)),lastWeight=weights.at(-1),same=weights.every(w=>w===lastWeight),hard=source.filter(l=>l.feel==='hard').length,easy=source.filter(l=>l.feel==='easy').length,major=Math.ceil(source.length/2);let nextWeight=lastWeight,note=`Repeat ${lastWeight} ${state.settings.units} and add reps.`;
        if(source.length<ex.sets)note=`Repeat ${lastWeight} ${state.settings.units}; complete all ${ex.sets} working sets next time.`;
        else if(!same)note=`Use ${lastWeight} ${state.settings.units} as the consistent working weight next time.`;
        else if(reps.every(r=>r>=ex.max)&&hard===0){nextWeight=roundTo(lastWeight+ex.increment,ex.increment);note=`Increase to ${nextWeight} ${state.settings.units}. You owned the top of the rep range.`;}
        else if(easy>=major&&Math.min(...reps)>=ex.max-1&&hard===0){nextWeight=roundTo(lastWeight+ex.increment,ex.increment);note=`Try ${nextWeight} ${state.settings.units} if form stays clean.`;}
        else if(reps.some(r=>r<ex.min)&&hard>=major){nextWeight=Math.max(0,roundTo(lastWeight-ex.increment,ex.increment));note=`Use ${nextWeight} ${state.settings.units} or repeat lighter; too many sets fell below target.`;}
        else if(reps.some(r=>r<ex.min))note=`Stay at ${lastWeight} ${state.settings.units} until every set reaches ${ex.min} reps.`;
        else if(hard>=major)note=`Repeat ${lastWeight} ${state.settings.units} until the sets feel more controlled.`;
        return{...previous,...base,lastWeight,nextWeight,note};
      }
      if(ex.type==='bodyweight'){
        const source=workingLogs(clean).slice(-ex.sets),reps=source.map(l=>Number(l.reps)).filter(Number.isFinite),hard=source.filter(l=>l.feel==='hard').length;let note='Repeat and add clean reps when ready.';if(reps.length&&Math.min(...reps)>=ex.max&&!hard)note='Add 1–3 reps, slow the tempo, or add light resistance.';else if(hard>=Math.ceil(Math.max(1,source.length)/2))note='Repeat with cleaner control before adding reps.';return{...previous,...base,note};
      }
      const durations=clean.map(l=>Number(l.duration)).filter(Number.isFinite),lastDuration=durations.at(-1)||ex.min;return{...previous,...base,lastDuration,nextDuration:lastDuration>=ex.max?lastDuration+(ex.increment||2):lastDuration,note:lastDuration>=ex.max?`Add ${ex.increment||2} ${ex.unit||'min'} or slightly increase intensity.`:`Repeat ${lastDuration} ${ex.unit||'min'}.`};
    }

    function rebuildProgress() { state.exerciseProgress={};const sessions=[...state.history].sort((a,b)=>new Date(a.startedAt)-new Date(b.startedAt));for(const s of sessions)for(const entry of s.exercises||[]){const ex=getExercise(entry.id);if(ex)state.exerciseProgress[entry.id]=analyzeExercise(ex,entry.logs||[],state.exerciseProgress[entry.id]||{});} }

    function renderProgress() {
      const st=stats(),metric=latestBodyMetric(),trend=getWeightTrend(),weekly=weeklyReview(),weightedIds=weightedExerciseIds();let selected=state.settings.progressExerciseId;if(!weightedIds.includes(selected))selected=weightedIds[0]||'';state.settings.progressExerciseId=selected;
      const tabs=`<div class="segmented-tabs"><button class="${progressTab==='overview'?'active':''}" data-action="progress-tab" data-tab="overview">Overview</button><button class="${progressTab==='strength'?'active':''}" data-action="progress-tab" data-tab="strength">Strength</button><button class="${progressTab==='body'?'active':''}" data-action="progress-tab" data-tab="body">Body</button><button class="${progressTab==='review'?'active':''}" data-action="progress-tab" data-tab="review">Review</button></div>`;
      let content='';
      if(progressTab==='overview') content=`<div class="metric-grid-v21"><div class="metric"><div class="metric-label">Lift sessions</div><div class="metric-value">${st.liftSessions}</div></div><div class="metric"><div class="metric-label">Working sets</div><div class="metric-value">${st.totalSets}</div></div><div class="metric"><div class="metric-label">Total volume</div><div class="metric-value">${Math.round(st.totalVolume/1000)}k</div><div class="metric-sub">lb</div></div><div class="metric"><div class="metric-label">Streak</div><div class="metric-value">${st.streak}</div><div class="metric-sub">days</div></div></div><div class="chart-card">${renderWeightChart()}</div>`;
      else if(progressTab==='strength') content=`<div class="field compact-field"><label>Exercise</label><select data-action="progress-exercise">${weightedIds.map(id=>`<option value="${esc(id)}" ${id===selected?'selected':''}>${esc(getExercise(id)?.name||id)}</option>`).join('')}</select></div><div class="chart-card">${renderStrengthChart(selected)}</div><div class="section-head"><h3>Personal records</h3></div>${renderPRs()}`;
      else if(progressTab==='body') content=`<div class="metric-grid-v21"><div class="metric"><div class="metric-label">Latest</div><div class="metric-value">${metric?`${esc(metric.weight)} lb`:'—'}</div></div><div class="metric"><div class="metric-label">7-day average</div><div class="metric-value">${Number.isFinite(trend.avg7)?`${cleanNumber(trend.avg7)} lb`:'—'}</div><div class="metric-sub">${esc(trend.label)}</div></div></div><div class="chart-card">${renderWeightChart()}</div><details class="setting body-entry"><summary>Log a scale reading <span>＋</span></summary><div class="setting-body">${renderBodyForm()}${renderBodyTable()}</div></details>`;
      else content=`<div class="review-grid"><div class="metric"><div class="metric-label">Lift days</div><div class="metric-value">${weekly.lifts}/5</div></div><div class="metric"><div class="metric-label">Working sets</div><div class="metric-value">${weekly.sets}</div></div><div class="metric"><div class="metric-label">Cardio</div><div class="metric-value">${weekly.cardio}</div><div class="metric-sub">minutes</div></div><div class="metric"><div class="metric-label">Hard sets</div><div class="metric-value">${weekly.hardPct}%</div></div></div><div class="completion-coach"><strong>Wins</strong>${weekly.wins.map(x=>`<p>✓ ${esc(x)}</p>`).join('')}</div><div class="completion-coach"><strong>Next adjustments</strong>${weekly.adjustments.map(x=>`<p>→ ${esc(x)}</p>`).join('')}</div><button class="btn green block" data-action="share-weekly">Share weekly review</button>`;
      $('#view').innerHTML=`<div class="stack"><div class="page-title-row"><div><div class="eyebrow">Performance</div><h1>Progress</h1></div></div>${tabs}<section class="card"><div class="card-pad progress-tab-content">${content}</div></section></div>`;
    }

    function weightedExerciseIds(){const ids=[];for(const day of PLAN)for(const ex of day.exercises)if(ex.type==='weighted'&&strengthPoints(ex.id).length)ids.push(ex.id);return [...new Set(ids)];}
    function strengthPoints(id){const ex=getExercise(id),points=[];if(!ex)return points;for(const s of [...state.history].sort((a,b)=>new Date(a.startedAt)-new Date(b.startedAt))){const entry=(s.exercises||[]).find(e=>e.id===id);if(!entry)continue;let best=0;for(const log of workingLogs(entry.logs||[])){const w=Number(log.weight),r=Number(log.reps);if(Number.isFinite(w)&&Number.isFinite(r))best=Math.max(best,w*(1+r/30));}if(best)points.push({date:s.startedAt,value:Math.round(best*10)/10});}return points;}
    function weightPoints(){return [...state.bodyMetrics].sort((a,b)=>new Date(a.date)-new Date(b.date)).filter(m=>Number.isFinite(Number(m.weight))).map(m=>({date:m.date,value:Number(m.weight)}));}
    function renderWeightChart(){const pts=weightPoints();return renderLineChart(pts,'lb');}
    function renderStrengthChart(id){return renderLineChart(strengthPoints(id),'e1RM');}
    function renderLineChart(points,unit){if(points.length<2)return`<div class="chart-empty">Log at least two readings to build this chart.</div>`;const w=600,h=180,pad=18,vals=points.map(p=>p.value),min=Math.min(...vals),max=Math.max(...vals),range=Math.max(1,max-min),coords=points.map((p,i)=>({x:pad+(i/(points.length-1))*(w-pad*2),y:h-pad-((p.value-min)/range)*(h-pad*2),...p})),path=coords.map((p,i)=>`${i?'L':'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');return`<div style="display:flex;justify-content:space-between;gap:10px"><strong>${cleanNumber(points.at(-1).value)} ${esc(unit)}</strong><span class="muted" style="font-size:12px">${fmtDate(points[0].date)} → ${fmtDate(points.at(-1).date)}</span></div><div class="chart-wrap"><svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8b5cf6" stop-opacity=".35"/><stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/></linearGradient></defs><path d="${path} L ${coords.at(-1).x} ${h-pad} L ${coords[0].x} ${h-pad} Z" fill="url(#area)"/><path d="${path}" fill="none" stroke="#c4b5fd" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${coords.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="5" fill="#f8fafc"/>`).join('')}</svg></div>`;}

    function getWeightTrend(){const pts=weightPoints(),now=Date.now();const avgFor=days=>{const cut=now-days*86400000,vals=pts.filter(p=>new Date(p.date).getTime()>=cut).map(p=>p.value);return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null;};const avg7=avgFor(7);let label='Collecting trend';if(pts.length>=4){const recent=pts.slice(-3).reduce((a,b)=>a+b.value,0)/Math.min(3,pts.length),older=pts.slice(0,Math.max(1,pts.length-3)).slice(-3).reduce((a,b)=>a+b.value,0)/Math.max(1,pts.slice(0,Math.max(1,pts.length-3)).slice(-3).length),diff=recent-older;label=Math.abs(diff)<.5?'Stable trend':diff<0?`Trending down ${cleanNumber(Math.abs(diff))} lb`:`Trending up ${cleanNumber(diff)} lb`; }return{avg7,label};}

    function weeklyReview(){const end=new Date(),start=new Date();start.setDate(end.getDate()-6);start.setHours(0,0,0,0);const sessions=state.history.filter(s=>new Date(s.startedAt)>=start),lifts=sessions.filter(s=>s.type!=='rest'),sets=lifts.reduce((sum,s)=>sum+sessionWorkingSets(s),0),cardio=Math.round(sessions.reduce((sum,s)=>sum+sessionCardioMinutes(s),0)*100)/100,all=lifts.flatMap(s=>(s.exercises||[]).flatMap(e=>workingLogs(e.logs||[]))),rated=all.filter(l=>l.feel),hard=rated.filter(l=>l.feel==='hard').length,hardPct=rated.length?Math.round(hard/rated.length*100):0,ready=Object.values(state.exerciseProgress).filter(p=>/Increase|Try/.test(p.note||'')).length,wins=[`${lifts.length} lift session${lifts.length===1?'':'s'} completed with ${sets} working sets.`,`${cardio} cardio minutes logged.`,ready?`${ready} exercise${ready===1?' is':'s are'} ready for progression.`:'Baseline data is getting stronger.'],adjustments=[];if(lifts.length<5)adjustments.push(`Complete the remaining ${5-lifts.length} planned lift day${5-lifts.length===1?'':'s'} without cramming missed sessions together.`);if(cardio<100)adjustments.push(`Build cardio gradually; ${cardio} minutes are logged in the last 7 days.`);if(hardPct>35)adjustments.push(`${hardPct}% of rated sets were hard. Keep most working sets “just right” and save grinders for occasional final sets.`);else adjustments.push('Effort balance looks controlled. Keep most sets 1–2 clean reps from failure.');adjustments.push('Keep logging morning weight 3–4 times per week so the 7-day average becomes dependable.');return{title:`${fmtDate(start)} – ${fmtDate(end)}`,lifts:lifts.length,sets,cardio,hardPct,wins,adjustments};}

    function openBodySheet(){
      closeBodySheet();
      const metric=latestBodyMetric();
      document.body.insertAdjacentHTML('beforeend',`<div class="sheet-backdrop" id="bodySheet" data-action="close-body-sheet"><section class="bottom-sheet body-quick-sheet" role="dialog" aria-modal="true" aria-label="Log today’s body metrics" onclick="event.stopPropagation()"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">Daily check-in</span><h2>Log body metrics</h2><p class="muted" style="margin:5px 0 0;font-size:12px">Weight is required. Everything else is optional.</p></div><button data-action="close-body-sheet" aria-label="Close">×</button></div>${renderBodyForm(metric)}</section></div>`);
      setTimeout(()=>document.querySelector('#bodySheet [data-body="weight"]')?.focus(),120);
    }
    function closeBodySheet(){document.querySelector('#bodySheet')?.remove();}

    function renderBodyForm(prefill){return`<div class="form-grid"><div class="mini-grid"><div class="field"><label>Body weight (lb)</label><input data-body="weight" inputmode="decimal" placeholder="ex: 220" value="${prefill?.weight??''}"></div><div class="field"><label>Body fat %</label><input data-body="bodyFat" inputmode="decimal" placeholder="optional"></div><div class="field"><label>Waist</label><input data-body="waist" inputmode="decimal" placeholder="optional"></div><div class="field"><label>Muscle mass (lb)</label><input data-body="muscleMass" inputmode="decimal" placeholder="optional"></div><div class="field"><label>Skeletal muscle %</label><input data-body="skeletalMuscle" inputmode="decimal" placeholder="optional"></div><div class="field"><label>Visceral fat</label><input data-body="visceralFat" inputmode="decimal" placeholder="optional"></div></div><div class="field"><label>Note</label><input data-body="note" placeholder="optional"></div><button class="btn primary block" data-action="save-body">Save scale reading</button></div>`;}
    function renderBodyTable(){const rows=[...state.bodyMetrics].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,8);if(!rows.length)return'<div class="empty" style="margin-top:14px">No body readings yet.</div>';return`<div style="overflow-x:auto;margin-top:14px"><table style="width:100%;border-collapse:collapse;font-size:13px"><thead><tr><th style="text-align:left;padding:10px;color:var(--muted)">Date</th><th style="text-align:left;padding:10px;color:var(--muted)">Weight</th><th style="text-align:left;padding:10px;color:var(--muted)">Body fat</th><th></th></tr></thead><tbody>${rows.map(m=>`<tr style="border-top:1px solid var(--line)"><td style="padding:12px 10px">${fmtDate(m.date)}</td><td style="padding:12px 10px">${esc(m.weight)} lb</td><td style="padding:12px 10px">${m.bodyFat?esc(m.bodyFat)+'%':'—'}</td><td style="padding:12px 10px"><button class="btn small danger" data-action="delete-body" data-id="${esc(m.id)}">Delete</button></td></tr>`).join('')}</tbody></table></div>`;}
    function saveBody(){const fromHome=Boolean(document.querySelector('#bodySheet'));const weight=Number($('[data-body="weight"]')?.value);if(!Number.isFinite(weight)||weight<=0){showToast('Enter body weight.');return;}const value=name=>{const n=Number($(`[data-body="${name}"]`)?.value);return Number.isFinite(n)?n:null;};state.bodyMetrics.push({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),date:new Date().toISOString(),weight,bodyFat:value('bodyFat'),waist:value('waist'),muscleMass:value('muscleMass'),skeletalMuscle:value('skeletalMuscle'),visceralFat:value('visceralFat'),note:$('[data-body="note"]')?.value?.trim()||''});saveState();if(fromHome){closeBodySheet();renderHome();}else renderProgress();showToast('Today’s body reading saved.');}
    function renderPRs(){const items=[];for(const id of weightedExerciseIds()){const ex=getExercise(id),best=bestSet(id);if(best)items.push({ex,best});}items.sort((a,b)=>b.best.score-a.best.score);if(!items.length)return'<div class="empty">Complete workouts to build personal records.</div>';return`<div class="stack" style="gap:10px">${items.slice(0,12).map(({ex,best})=>`<div class="soft-card" style="display:flex;justify-content:space-between;gap:12px;align-items:center"><div><strong>${esc(ex.name)}</strong><div class="muted" style="font-size:12px;margin-top:3px">${fmtDate(best.date)}</div></div><span class="target-pill">🏆 ${esc(formatLogShort(ex,best.log))}</span></div>`).join('')}</div>`;}

    function renderPlan(){const selected=getDay();$('#view').innerHTML=`<div class="stack"><div class="page-title-row"><div><div class="eyebrow">Fixed seven-day split</div><h1>Plan</h1></div></div><div class="plan-week-tabs">${PLAN.map((day,i)=>`<button class="${i===state.settings.currentDayIndex?'active':''} ${day.type==='rest'?'rest':''}" data-action="select-plan-day" data-index="${i}"><span>${day.day}</span><small>${day.title.split(' ')[0]}</small></button>`).join('')}</div><section class="card plan-detail-card"><div class="card-pad"><div class="plan-detail-head"><div><span class="section-kicker">Day ${selected.day}</span><h2>${esc(selected.title)}</h2><p>${esc(selected.focus)}</p></div><span class="target-pill">${estimatedMinutes(selected)} min</span></div><div class="brief-note"><strong>Focus</strong><span>${esc(selected.note)}</span></div><div class="compact-exercise-list">${selected.exercises.map((ex,i)=>`<div><span>${i+1}</span><p><strong>${esc(ex.name)}</strong><small>${esc(ex.equipment||'')}</small></p><b>${esc(targetLabel(ex))}</b></div>`).join('')}</div></div></section></div>`;}

    function renderMore(){
      const sessions=[...state.history].sort((a,b)=>new Date(b.startedAt)-new Date(a.startedAt));
      if(moreSection==='history'){ $('#view').innerHTML=`<div class="stack"><button class="back-link" data-action="more-back">← More</button><div class="page-title-row"><div><div class="eyebrow">Training log</div><h1>History</h1></div><span class="target-pill">${sessions.length}</span></div><div class="stack" style="gap:10px">${sessions.length?sessions.map(renderHistoryCard).join(''):'<div class="empty">Your completed workouts will appear here.</div>'}</div></div>`; return; }
      if(moreSection==='coach'){ $('#view').innerHTML=`<div class="stack"><button class="back-link" data-action="more-back">← More</button><section class="card"><div class="card-pad"><div class="eyebrow">Coach</div><h1 style="margin-top:8px">Check-in</h1><p class="muted">Share your workouts, body trends, and next-weight recommendations with ChatGPT.</p><button class="btn green block" data-action="share-coach">Share full check-in</button><button class="btn block" style="margin-top:10px" data-action="share-weekly">Share weekly review</button></div></section></div>`; return; }
      if(moreSection==='settings'){ $('#view').innerHTML=`<div class="stack"><button class="back-link" data-action="more-back">← More</button><div class="page-title-row"><div><div class="eyebrow">Preferences</div><h1>Settings</h1></div></div>${renderSettings()}</div>`; return; }
      if(moreSection==='backup'){ $('#view').innerHTML=`<div class="stack"><button class="back-link" data-action="more-back">← More</button><section class="card"><div class="card-pad"><div class="eyebrow">Your data</div><h1 style="margin-top:8px">Backup</h1><p class="muted">Workout data stays on this device. Export a backup before changing phones or clearing Safari data.</p><div class="button-row"><button class="btn primary" data-action="export-backup">Export</button><button class="btn" data-action="import-backup">Import</button></div><button class="btn block" style="margin-top:10px" data-action="refresh-cache">Refresh app cache</button><button class="btn danger block" style="margin-top:10px" data-action="reset-app">Reset app data</button></div></section></div>`; return; }
      $('#view').innerHTML=`<div class="stack"><div class="page-title-row"><div><div class="eyebrow">ATLAS</div><h1>More</h1></div></div><section class="card"><div class="more-menu"><button data-action="more-section" data-section="history"><span class="menu-icon">↺</span><div><strong>History</strong><small>${sessions.length} saved sessions</small></div><b>›</b></button><button data-action="more-section" data-section="coach"><span class="menu-icon coach">A</span><div><strong>Coach check-in</strong><small>Share progress and recommendations</small></div><b>›</b></button><button data-action="more-section" data-section="settings"><span class="menu-icon">⚙</span><div><strong>Settings</strong><small>Rest timer, units, app links</small></div><b>›</b></button><button data-action="more-section" data-section="backup"><span class="menu-icon">⇩</span><div><strong>Backup & restore</strong><small>Protect your training history</small></div><b>›</b></button></div></section><section class="card"><div class="card-pad"><div class="eyebrow">Quick launch</div><div style="margin-top:12px">${renderQuickLaunch()}</div></div></section><div class="about-atlas"><img src="atlas-mark.svg" alt=""><span>ATLAS 2.5.3</span><small>Built for progress.</small></div></div>`;
    }

    function renderHistoryCard(s){const sets=sessionWorkingSets(s),volume=sessionVolume(s),cardio=sessionCardioMinutes(s);return`<details class="history-card"><summary><div class="history-top"><div><strong style="font-size:18px">${esc(s.title||'Workout')}</strong><div class="muted" style="font-size:12px;margin-top:4px">${fmtDate(s.startedAt)} · ${formatDuration(s.durationMs)}</div></div><span class="target-pill">${s.type==='rest'?'☁️ Rest':s.prs?.length?`🏆 ${s.prs.length} PR`:'✓ Done'}</span></div><div class="history-stats"><span class="chip">${sets} sets</span><span class="chip">${volume.toLocaleString()} lb</span>${cardio?`<span class="chip">${cardio} min cardio</span>`:''}</div></summary><div class="history-body">${s.sessionNote?`<div class="soft-card"><strong>Session note</strong><p class="muted" style="margin:6px 0 0">${esc(s.sessionNote)}</p></div>`:''}${(s.exercises||[]).map(entry=>{const ex=getExercise(entry.id);if(!ex||(entry.logs||[]).length===0)return'';return`<div class="history-ex"><strong>${esc(ex.name)}</strong><div class="set-inline">${(entry.logs||[]).map(log=>`<span class="set-chip ${log.warmup?'wu':''}">${esc(formatLogShort(ex,log))} ${ex.type==='weighted'||ex.type==='bodyweight'?feelEmoji(log.feel):''}</span>`).join('')}</div>${entry.notes?`<div class="muted" style="font-size:12px;margin-top:7px">Note: ${esc(entry.notes)}</div>`:''}</div>`;}).join('')}<button class="btn danger block" data-action="delete-session" data-id="${esc(s.id)}">Delete session</button></div></details>`;}

    function renderSettings(){return`<div class="stack" style="gap:10px"><details class="setting" open><summary>Training preferences <span>⌄</span></summary><div class="setting-body"><div class="field"><label>Your name</label><input data-setting="profileName" value="${esc(state.settings.profileName||'')}"></div><div class="mini-grid"><div class="field"><label>Default rest seconds</label><input data-setting="restSeconds" inputmode="numeric" value="${esc(state.settings.restSeconds)}"></div><div class="field"><label>Smith starting resistance</label><input data-setting="smithBarWeight" inputmode="decimal" value="${esc(state.settings.smithBarWeight)}"></div><div class="field"><label>Units</label><select data-setting="units"><option value="lb" ${state.settings.units==='lb'?'selected':''}>lb</option><option value="kg" ${state.settings.units==='kg'?'selected':''}>kg</option></select></div><div class="field"><label>Theme</label><select data-setting="theme"><option value="dark" ${state.settings.theme==='dark'?'selected':''}>Dark</option><option value="light" ${state.settings.theme==='light'?'selected':''}>Light</option></select></div></div><label class="warm-toggle"><input type="checkbox" data-setting-check="autoRest" ${state.settings.autoRest?'checked':''}> Start the rest timer after logged lifting sets</label><label class="warm-toggle"><input type="checkbox" data-setting-check="sound" ${state.settings.sound?'checked':''}> Play an alert when rest ends</label><button class="btn primary block" data-action="save-settings">Save preferences</button></div></details><details class="setting"><summary>Quick-app links <span>⌄</span></summary><div class="setting-body"><div class="field"><label>Planet Fitness URL / Shortcut</label><input data-setting="pfAppUrl" value="${esc(state.settings.pfAppUrl||'')}"></div><div class="field"><label>Apple Music URL</label><input data-setting="musicAppUrl" value="${esc(state.settings.musicAppUrl||'')}"></div><p class="muted" style="font-size:12px;margin:0">On iPhone, the PF button can run a Shortcut named “Open Planet Fitness.”</p><button class="btn primary block" data-action="save-settings">Save links</button></div></details><details class="setting"><summary>Body goals <span>⌄</span></summary><div class="setting-body"><div class="mini-grid"><div class="field"><label>Target weight</label><input data-goal="targetWeight" inputmode="decimal" value="${esc(state.goals.targetWeight||'')}"></div><div class="field"><label>Target body fat %</label><input data-goal="targetBodyFat" inputmode="decimal" value="${esc(state.goals.targetBodyFat||'')}"></div></div><p class="muted" style="font-size:12px;margin:0">Nutrition tracking is intentionally left out for now. This version focuses on training, recovery, strength, and body trends.</p><button class="btn primary block" data-action="save-settings">Save goals</button></div></details></div>`;}

    function saveSettings(){$$('[data-setting]').forEach(input=>{const key=input.dataset.setting;let value=input.value;if(['restSeconds','smithBarWeight'].includes(key))value=Number(value);state.settings[key]=value;});$$('[data-setting-check]').forEach(input=>state.settings[input.dataset.settingCheck]=input.checked);$$('[data-goal]').forEach(input=>{const n=Number(input.value);if(Number.isFinite(n))state.goals[input.dataset.goal]=n;});saveState();render();showToast('Settings saved.');}

    function coachReport(){const st=stats(),metric=latestBodyMetric(),trend=getWeightTrend(),sessions=[...state.history].sort((a,b)=>new Date(b.startedAt)-new Date(a.startedAt)).slice(0,5),day=getDay();const lines=[`ATLAS 2.5.3 — COACH CHECK-IN`,`Generated: ${new Date().toLocaleString()}`,`Next workout: Day ${day.day} — ${day.title} (${day.focus})`,`Stats: ${st.liftSessions} lift sessions, ${st.restDays} rest days, ${st.totalSets} working sets, ${st.totalVolume.toLocaleString()} total volume.`,metric?`Body metrics: latest ${metric.weight} lb${metric.bodyFat?`, body fat ${metric.bodyFat}%`:''}; 7-day average ${Number.isFinite(trend.avg7)?cleanNumber(trend.avg7)+' lb':'collecting'}.`:'Body metrics: none logged yet.','',`Recent sessions:`];for(const s of sessions){lines.push(`- ${fmtDate(s.startedAt)} — ${s.title} (${formatDuration(s.durationMs)}), ${sessionWorkingSets(s)} working sets, ${sessionVolume(s).toLocaleString()} lb volume`);for(const e of s.exercises||[]){const ex=getExercise(e.id),logs=e.logs||[];if(ex&&logs.length)lines.push(`  • ${ex.name}: ${logs.map(l=>`${formatLogShort(ex,l)}${l.feel?' '+feelEmoji(l.feel):''}`).join(', ')}`);}}lines.push('',`Next-time recommendations:`);for(const day of PLAN)for(const ex of day.exercises){const p=state.exerciseProgress[ex.id];if(p?.note)lines.push(`- ${ex.name}: ${p.note}`);}lines.push('',`Ask: Review my training for fat loss and muscle definition. Tell me what to adjust next, without adding nutrition tracking yet.`);return lines.join('\n');}
    function weeklyReportText(){const w=weeklyReview();return[`ATLAS 2.5.3 — WEEKLY REVIEW`,w.title,`Lift days: ${w.lifts}/5`,`Working sets: ${w.sets}`,`Cardio: ${w.cardio} min`,`Hard sets: ${w.hardPct}%`,'','Wins:',...w.wins.map(x=>`- ${x}`),'','Next adjustments:',...w.adjustments.map(x=>`- ${x}`),'','Ask: Review this week and adjust my next week for fat loss and muscle definition. No nutrition tracking yet.'].join('\n');}
    async function shareText(text,title){try{if(navigator.share){await navigator.share({title,text});return;}await navigator.clipboard.writeText(text);showToast('Copied. Paste it into ChatGPT.');}catch(err){if(err?.name!=='AbortError'){downloadBlob(`${title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}.txt`,text,'text/plain');showToast('Report downloaded.');}}}

    function openApp(kind){const url=kind==='music'?state.settings.musicAppUrl:state.settings.pfAppUrl,fallback=kind==='music'?state.settings.musicFallbackUrl:state.settings.pfFallbackUrl;if(!url){showToast('Add this app link in More → Settings.');return;}try{window.location.href=url;setTimeout(()=>{if(!document.hidden&&fallback&&!url.startsWith('shortcuts:'))window.open(fallback,'_blank','noopener');},1200);}catch(_){if(fallback)window.open(fallback,'_blank','noopener');}}
    function openQuickMenu(){
      $('#quickMenu')?.remove();
      document.body.insertAdjacentHTML('beforeend',`<div class="sheet-backdrop" id="quickMenu" data-action="close-quick-menu"><section class="bottom-sheet quick-menu-sheet" role="dialog" aria-modal="true" aria-label="Quick actions" onclick="event.stopPropagation()"><div class="sheet-handle"></div><div class="sheet-head"><div><span class="section-kicker">ATLAS</span><h2>Quick actions</h2></div><button data-action="close-quick-menu" aria-label="Close">×</button></div><div class="quick-action-list"><button data-action="open-app" data-app="pf"><span>PF</span><div><strong>Planet Fitness</strong><small>Check in or view the crowd meter</small></div><b>›</b></button><button data-action="open-app" data-app="music"><span>♫</span><div><strong>Apple Music</strong><small>Start your gym music</small></div><b>›</b></button><button data-action="share-coach"><span>A</span><div><strong>Coach check-in</strong><small>Share your latest training report</small></div><b>›</b></button></div></section></div>`);
    }
    function closeQuickMenu(){ $('#quickMenu')?.remove(); }

    function exportBackup(){downloadBlob(`atlas-workout-backup-${dateKey()}.json`,JSON.stringify({appVersion:APP_VERSION,exportedAt:new Date().toISOString(),state,active},null,2),'application/json');showToast('Backup exported.');}
    function downloadBlob(name,text,type){const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
    function importBackup(file){const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(reader.result),incoming=parsed.state||parsed;if(!incoming.history)throw new Error('Invalid backup');const base=defaultState();state={...base,...incoming,settings:{...base.settings,...(incoming.settings||{})},goals:{...base.goals,...(incoming.goals||{})},history:Array.isArray(incoming.history)?incoming.history:[],bodyMetrics:Array.isArray(incoming.bodyMetrics)?incoming.bodyMetrics:[],dailyCheckins:Array.isArray(incoming.dailyCheckins)?incoming.dailyCheckins:[]};active=parsed.active||null;rebuildProgress();saveState();saveActive();currentView=active?'workout':'home';render();showToast('Backup imported.');}catch(err){showToast('Could not import that backup.');}};reader.readAsText(file);}
    async function refreshCache(){try{if('serviceWorker'in navigator){const regs=await navigator.serviceWorker.getRegistrations();for(const r of regs)await r.update();}if('caches'in window){for(const key of await caches.keys())await caches.delete(key);}showToast('Cache refreshed. Reloading…');setTimeout(()=>location.reload(true),700);}catch(_){location.reload(true);}}

    function cancelActive(){if(!active)return;syncDraftFromInputs();const hasActivity=active.exercises.some(e=>(e.logs||[]).length||String(e.notes||'').trim())||String(active.sessionNote||'').trim();const message=hasActivity?'Cancel this workout? All logged sets, notes, and elapsed time from this active session will be permanently discarded.':'Discard this empty workout? It will not be added to your history.';if(!confirm(message))return;active=null;removeExerciseToolsOverlay();saveActive();stopRest();currentView='home';render();showToast('Workout canceled. Nothing was saved.');}
    function deleteSession(id){if(!confirm('Delete this completed session?'))return;state.history=state.history.filter(s=>s.id!==id);rebuildProgress();saveState();renderMore();showToast('Session deleted.');}
    function resetApp(){if(!confirm('Delete all workouts, body metrics, and settings from this device?'))return;localStorage.removeItem(STORAGE_KEY);localStorage.removeItem(ACTIVE_KEY);state=defaultState();active=null;currentView='home';render();showToast('App reset.');}

    document.addEventListener('click',event=>{
      const viewBtn=event.target.closest('[data-view]');if(viewBtn){haptic('light');currentView=viewBtn.dataset.view;render();return;}
      const btn=event.target.closest('[data-action]');if(!btn)return;const action=btn.dataset.action;
      haptic(['finish-workout','complete-done','mark-rest','save-body'].includes(action)?'success':['start-workout','resume-workout','log-set'].includes(action)?'medium':'light');
      if(action==='start-workout')startWorkout();
      else if(action==='resume-workout'){currentView='workout';render();}
      else if(action==='pause-workout')pauseWorkout();
      else if(action==='cancel-workout')cancelActive();
      else if(action==='mark-rest')markRest();
      else if(action==='previous-exercise')nextExercise(-1);
      else if(action==='next-exercise')nextExercise(1);
      else if(action==='adjust-weight')adjustDraft('weight',Number(btn.dataset.delta));
      else if(action==='adjust-reps')adjustDraft('reps',Number(btn.dataset.delta));
      else if(action==='adjust-duration')adjustDraft('duration',Number(btn.dataset.delta));
      else if(action==='set-feel')setFeel(btn.dataset.feel);
      else if(action==='log-set')logSet();
      else if(action==='delete-last-set')deleteLastSet();
      else if(action==='edit-set')deleteSpecificSet(btn.dataset.setIndex);
      else if(action==='finish-workout')finishWorkout();
      else if(action==='add-rest')addRest();
      else if(action==='skip-rest')finishRest();
      else if(action==='complete-done'){lastCompletedSession=null;currentView='home';render();}
      else if(action==='change-day'){}
      else if(action==='select-plan-day'){state.settings.currentDayIndex=Number(btn.dataset.index)||0;saveState();renderPlan();showToast(`Day ${getDay().day} set as next.`);}
      else if(action==='open-app')openApp(btn.dataset.app);
      else if(action==='open-quick-menu')openQuickMenu();
      else if(action==='close-quick-menu')closeQuickMenu();
      else if(action==='open-body-sheet')openBodySheet();
      else if(action==='close-body-sheet')closeBodySheet();
      else if(action==='open-exercise-tools')openExerciseTools();
      else if(action==='close-exercise-tools')closeExerciseTools();
      else if(action==='progress-tab'){progressTab=btn.dataset.tab||'overview';renderProgress();}
      else if(action==='more-section'){moreSection=btn.dataset.section||'menu';renderMore();}
      else if(action==='more-back'){moreSection='menu';renderMore();}
      else if(action==='save-body')saveBody();
      else if(action==='delete-body'){state.bodyMetrics=state.bodyMetrics.filter(m=>m.id!==btn.dataset.id);saveState();renderProgress();}
      else if(action==='share-weekly')shareText(weeklyReportText(),'ATLAS Weekly Review');
      else if(action==='share-coach')shareText(coachReport(),'ATLAS Coach Check-In');
      else if(action==='save-settings')saveSettings();
      else if(action==='export-backup')exportBackup();
      else if(action==='import-backup')$('#importFile').click();
      else if(action==='refresh-cache')refreshCache();
      else if(action==='delete-session')deleteSession(btn.dataset.id);
      else if(action==='reset-app')resetApp();
    });

    document.addEventListener('change',event=>{
      if(event.target.matches('[data-action="change-day"]')){state.settings.currentDayIndex=Number(event.target.value)||0;saveState();renderWorkoutPreview();}
      if(event.target.matches('[data-action="progress-exercise"]')){state.settings.progressExerciseId=event.target.value;saveState();renderProgress();}
      if(event.target===$('#importFile')&&event.target.files?.[0]){importBackup(event.target.files[0]);event.target.value='';}
    });
    document.addEventListener('input',event=>{
      if(!active) return;
      const entry=active.exercises[active.currentExerciseIndex];
      if(event.target.matches('[data-input="exercise-note"]')) entry.notes=event.target.value;
      else if(event.target.matches('[data-input="weight"]')) { const n=Number(event.target.value); if(Number.isFinite(n)) entry.draftWeight=n; }
      else if(event.target.matches('[data-input="reps"],[data-input="duration"]')) { const n=Number(event.target.value); if(Number.isFinite(n)) entry.draftReps=n; }
      saveActive();
    });
    document.addEventListener('change',event=>{ if(active&&event.target.matches('[data-input="warmup"]')) { active.exercises[active.currentExerciseIndex].draftWarmup=event.target.checked; saveActive(); } });
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&$('#exerciseSheetOverlay'))closeExerciseTools();});
    document.addEventListener('visibilitychange',()=>{if(!document.hidden&&restState)updateRest();});

    rebuildProgress();saveState();render();
    if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
  })();