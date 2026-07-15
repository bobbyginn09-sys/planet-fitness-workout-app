# NEXSET 3.2.0 Validation

## Static checks

- `extracted.js` passes `node --check`.
- `service-worker.js` passes `node --check`.
- Both web manifests parse as valid JSON and launch `?nexset=3.2.0`.
- All 23 service-worker app-shell entries exist in the release folder.
- Existing data keys remain `pfWorkoutApp.v1` and `pfWorkoutApp.active.v1`.
- The update worker waits for the in-app **Update now** action before calling `skipWaiting`.

## Mobile browser regression checks

29 automated checks passed at a 390 × 844 mobile viewport:

- Home screen renders without runtime errors.
- Existing state and active-workout keys are preserved.
- Schema v3 metadata and a local recovery snapshot are created.
- A workout starts, a working set logs, and the rest timer opens.
- Paused active workouts survive a relaunch.
- Canceling a workout clears both the active key and recovery-active state.
- Active Recovery renders and **Mark rest day** saves correctly.
- Backup status, versioned export, and diagnostics download work.
- Backup import is validated and records an import timestamp.
- The pre-import local recovery copy is preserved.
- Corrupted primary state restores from the local recovery copy and is rewritten validly.
- The update banner is present and hidden until a waiting service worker exists.

## Data compatibility

The release preserves the established local-storage keys, so existing workout history, body metrics, settings, and active sessions remain compatible with the 3.1.x builds.
