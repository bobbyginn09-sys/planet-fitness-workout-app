# NEXSET 3.4.0 Validation Report

**Generated:** July 15, 2026  
**Result:** **118 passed, 0 failed, 0 uncaught browser errors**

## Validation summary

| Area | Passed | Failed |
|---|---:|---:|
| Static package and source checks | 13 | 0 |
| Browser workflow and persistence checks | 105 | 0 |
| **Total** | **118** | **0** |

The machine-readable result is included as `VALIDATION_RESULTS_3.4.0.json`.

## Static checks

The release passed checks for:

- Application JavaScript syntax.
- Service-worker JavaScript syntax.
- Duplicate named function declarations.
- Both manifest files parsing as JSON.
- Manifest start URLs pointing to 3.4.0.
- Application, manifest, and service-worker version consistency.
- Presence of every service-worker core asset.
- NEXSET-scoped old-cache cleanup.
- Removal of runtime references to the obsolete anatomical PNG files.
- Absence of older 3.3.1 and 3.2.1 labels from runtime files.

## Mobile rendering checks

Fresh-state rendering was checked at:

- 375 × 667
- 390 × 844
- 430 × 932

At each viewport, Home rendered successfully, the focus map was present, Quick Workout was accessible, and no horizontal overflow was detected.

A populated light-theme state was also checked for horizontal overflow.

## Flexible-workout workflow checks

The browser suite exercised:

- Opening the Quick Workout builder.
- Searching a library with at least 50 available exercises.
- Adding, removing, and reordering selected exercises.
- Saving, deleting, undoing deletion, and retaining templates.
- Starting and completing a Quick Workout.
- Confirming Quick Workouts do not advance the scheduled day.
- Editing the scheduled program title, focus, targets, increment, and rest duration.
- Adding, removing, and reordering program exercises.
- Starting a customized program workout.
- Using zero-second rest without an automatic timer.
- Opening compatible replacement choices.
- Replacing an exercise temporarily and permanently.
- Preserving logged sets on the original exercise during replacement.
- Adding an exercise during an active workout.
- Skipping, revisiting, jumping to, and reordering active exercises.
- Pausing, restoring, and canceling a workout.
- Disabling Quick Workout while another workout is active.

## Logging and correction checks

The suite verified:

- Weighted-set logging.
- Rest-timer launch and persisted end timestamp.
- Active-workout restoration after simulated relaunch.
- Rest-timer restoration after simulated relaunch.
- Active-set editing.
- Historical-set editing.
- Historical-set deletion and Undo.
- Completed-session deletion and Undo.
- Body-reading creation, canonical storage, editing, deletion, and Undo.
- Discoverable recent body-reading rows in the Body tab.
- Equipment setup persistence.

## Units, theme, and statistics checks

The suite verified:

- Kilogram display mode.
- Canonical pound storage for body weight and muscle mass entered in kilograms.
- Light-theme application.
- Quick Workout history and program-week separation.
- Correct version display in Profile.

## Backup and restart checks

The browser suite exported a real JSON backup and verified:

- `nexset-backup` format.
- Schema version 5.
- Inclusion of the editable program.
- Inclusion of Quick Workout templates.
- Inclusion of equipment setup notes.

It then verified that a simulated full app restart preserved:

- Program customizations.
- Permanent replacements.
- Templates.
- Equipment setup notes.
- Workout history.
- Body readings.
- Units and theme.

A separate import flow restored history, program edits, templates, and body data.

## Legacy migration checks

A legacy state and unfinished workout were loaded and verified to migrate to schema 5 while preserving:

- Historical workout records.
- The active workout.
- Exercise definitions through snapshots.
- The active rest timer.
- A valid editable seven-day program.

## Runtime errors

No uncaught JavaScript exception or browser console error was recorded in the automated scenarios.

## Test environment and limitations

- Browser engine: headless Chromium available in the execution environment.
- The application was rendered from the packaged HTML with local SVG assets inlined.
- A localStorage-compatible in-memory implementation was used to test persistence and migration deterministically.
- Local HTTP and file navigation were restricted in the environment, so the service worker could not be exercised as a genuinely installed local PWA. Its syntax, asset inventory, cache scope, and version wiring were validated statically.
- This validation does not replace a short post-deployment smoke test on the actual iPhone and installed Home Screen app.

## Required post-deployment smoke test

After publishing:

1. Verify Profile reports 3.4.0.
2. Confirm existing history and body data.
3. Start a scheduled workout and log one set.
4. Close and reopen NEXSET; confirm the workout and timer restore.
5. Skip and revisit one exercise.
6. Replace one exercise for the current session only.
7. Start and save one Quick Workout.
8. Edit and save one program day.
9. Export a new backup.
10. After one successful online launch, enable airplane mode and confirm the app shell reopens.
