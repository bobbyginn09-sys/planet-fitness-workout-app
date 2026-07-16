# NEXSET 3.4.0 — All-in-One Flexible Workouts Release

NEXSET is an iPhone-first workout coach delivered as a static Progressive Web App for GitHub Pages. Version 3.4.0 includes the complete visual-polish work from the uninstalled 3.3.1 build **and** the flexible-workout phase in one deployment. No earlier package needs to be installed first.

## Release highlights

### Flexible workouts

- Build an unplanned **Quick Workout** from the exercise library.
- Save, reload, delete, and undo deletion of reusable workout templates.
- Edit every day in the seven-day program without changing application code.
- Rename workouts and edit focus, warm-up, and coaching notes.
- Add, remove, and reorder exercises.
- Edit sets, rep or duration targets, weight increments, and rest duration.
- Skip an occupied exercise, revisit it later, or jump directly to any exercise.
- Reorder exercises during an active session.
- Replace an exercise with a movement-compatible alternative.
- Apply a replacement only to the current session or retain it in the routine.
- Add another exercise while a workout is already underway.
- Save machine, bench, pad, handle, or personal setup notes per exercise.

### Visual and usability polish

- Replaced the previous realistic figure with consistent inline geometric focus maps.
- Rebalanced the Home workout card, Quick Actions, and progress summary.
- Added a dedicated Quick Workout entry point.
- Simplified the active-workout card and consolidated form, setup, and notes.
- Changed active progress to actual completed sets rather than exercise position.
- Added compact empty states and direct actions on Progress screens.
- Made recent body readings visible and editable directly from the Body tab.
- Improved light-theme rendering, focus states, touch targets, and reduced-motion behavior.

### Reliability carried forward

- Canonical pound storage with correct pound/kilogram display conversion.
- Editable active sets, historical sets, body readings, and completed sessions.
- Undo for destructive set, body-reading, session, and template operations.
- Rest-timer restoration from a saved end timestamp after refresh or relaunch.
- Active-workout recovery, local backup export/import, and scoped offline-cache cleanup.
- Honest no-data states and separate strength, recovery, and consistency statistics.

## Data compatibility

Version 3.4.0 advances the application state to schema **5** while preserving the established local-storage keys:

```text
pfWorkoutApp.v1
pfWorkoutApp.active.v1
pfWorkoutApp.recovery.v1
pfWorkoutApp.meta.v1
```

Existing workout history, body readings, settings, unfinished workouts, rest timers, and progression data are migrated in place. The new editable program, Quick Workout templates, exercise snapshots, and equipment setup notes are included in backups.

Strength and body-weight values remain stored canonically in pounds and are converted only for display and input.

## Deploy to GitHub Pages

1. In the currently installed app, open **Profile → Backup & restore → Export backup**.
2. Extract the release ZIP.
3. Open the `planet-fitness-workout-app-3.4.0` folder.
4. Replace the repository-root runtime files with the files from that folder in one commit.
5. Commit and push to the GitHub Pages branch.
6. After Pages finishes publishing, open:

   ```text
   https://bobbyginn09-sys.github.io/planet-fitness-workout-app/?nexset=3.4.0
   ```

7. In an already installed Home Screen copy, open **Profile → Backup & restore → Check for update**.
8. Choose **Update now**, fully close NEXSET, and reopen it.
9. Confirm that Profile reports **NEXSET 3.4.0** and that existing history is present.

A complete pre-deployment and post-deployment checklist is in `DEPLOY_CHECKLIST_3.4.0.md`.

## Validation

The release passed **118 of 118 checks**:

- 13 static package, JavaScript, manifest, asset, and version checks.
- 105 browser workflow, persistence, migration, editing, responsiveness, and backup checks.
- Zero uncaught browser errors in the automated scenarios.
- Mobile layouts checked at 375 × 667, 390 × 844, and 430 × 932 without horizontal overflow.

See `VALIDATION_3.4.0.md` and `VALIDATION_RESULTS_3.4.0.json` for the exact scope and limitations.

## Main files

- `index.html` — complete application shell, styling, and UI logic.
- `service-worker.js` — offline shell and update behavior.
- `manifest.webmanifest` and `manifest.json` — install metadata.
- `extracted.js` — exact copy of the inline application script for syntax review.
- `RELEASE_NOTES_3.4.0.md` — detailed changes.
- `VALIDATION_3.4.0.md` — completed test summary and limitations.
- `DEPLOY_CHECKLIST_3.4.0.md` — safe installation steps.
- `SHA256SUMS.txt` — integrity hashes for files inside the release folder.

## Current architectural limitation

The application is still concentrated in a large static page and stores data locally in the browser. The next engineering phase should modularize the code, migrate growing structured data to IndexedDB, and add repository-level automated checks before adaptive coaching is expanded.
