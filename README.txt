NEXSET 3.2.1 — RELIABILITY UPDATE
Released: July 15, 2026

WHAT CHANGED
- Real lb/kg conversion with canonical pound storage and legacy migration.
- Separate strength, recovery, training-streak, and consistency statistics.
- Editable active and historical sets, body readings, and completed sessions.
- Undo after set, session, and body-record deletion.
- Rest timers recover after refresh, app closure, or relaunch.
- Workout-level notes and exercise-specific setup guidance.
- Honest empty coaching states.
- Safer NEXSET-only offline-cache cleanup.
- Text zoom and reduced-motion accessibility improvements.

DATA COMPATIBILITY
The update preserves these existing browser-storage keys:
  pfWorkoutApp.v1
  pfWorkoutApp.active.v1

The state schema moves to version 4. Existing data is migrated in place.
Export a backup before deployment or before clearing browser data.

DEPLOYMENT
1. Export a backup from Profile > Backup & restore.
2. Replace the GitHub Pages repository-root files with this package.
3. Commit and push the changes.
4. Open:
   https://bobbyginn09-sys.github.io/planet-fitness-workout-app/?nexset=3.2.1
5. In an installed copy, use Profile > Backup & restore > Check for update.
6. Fully close and reopen the app, then verify existing history and any unfinished workout.

VALIDATION
- 49 of 49 automated mobile checks passed.
- No uncaught JavaScript exceptions were recorded.
- Tested at 390 x 844 and 430 x 932 without horizontal overflow.
- JavaScript syntax, manifests, service-worker assets, migration, editing,
  Undo, timer recovery, units, body records, history, and PWA registration passed.

See README.md, RELEASE_NOTES_3.2.1.md, RELEASE_CHECKLIST_3.2.1.md,
and VALIDATION.md for full details.
