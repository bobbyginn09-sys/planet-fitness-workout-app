# NEXSET 3.2.1 Validation

Validation completed July 15, 2026 against the packaged release files.

## Result

**49 of 49 automated mobile checks passed.** No uncaught JavaScript exceptions were recorded during the browser run.

## Static checks

- The inline application script and `extracted.js` are byte-for-byte equivalent after trimming surrounding whitespace.
- `extracted.js` passes `node --check`.
- `service-worker.js` passes `node --check`.
- `manifest.json` and `manifest.webmanifest` parse as valid JSON.
- Both manifests launch `./index.html?nexset=3.2.1`.
- Every service-worker core and optional asset exists in the release folder.
- Every exercise in the bundled program has an exercise-specific setup entry.
- Existing storage keys remain `pfWorkoutApp.v1` and `pfWorkoutApp.active.v1`.
- The state schema is version 4 and canonical stored weight unit is pounds.
- Service-worker cleanup is limited to caches whose names begin with `nexset-workout-`.

## Automated browser coverage

The smoke suite verified:

- Fresh launch, schema initialization, canonical storage, and text zoom
- Honest no-data Review state
- Real set logging, reps, workout notes, and saved rest timestamp
- Active-set edit, delete, Undo, and exact restoration
- Rest-timer recovery after reload using the original end timestamp
- Workout completion and active-session cleanup
- Historical-set edit, delete, and Undo
- Completed-session delete and Undo
- Body-reading add, edit, delete, Undo, and blank optional fields
- Unit preference changes without mutating canonical values
- Kilogram display conversion
- Migration from legacy schema 3, including workout and active-session kilogram conversion
- Preservation of older body, goal, and Smith-machine values that were historically stored as pounds
- Migration notice and retained display preference
- PWA service-worker registration and NEXSET cache creation
- No horizontal overflow at 390 × 844 or 430 × 932
- No app-recorded runtime error

## Release limitation

The automated run validates the packaged static build in a controlled mobile Chromium environment. After GitHub Pages deployment, complete the short device checklist in `RELEASE_CHECKLIST_3.2.1.md`, especially iPhone Home Screen update behavior, offline relaunch, and preservation of the live browser profile’s existing records.
