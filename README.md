# NEXSET 3.2.1 — Reliability Update

NEXSET is an iPhone-first workout coach built as a static Progressive Web App for GitHub Pages. Version 3.2.1 strengthens data accuracy, correction tools, workout recovery, and offline updating while preserving the existing interface and saved-data keys.

## Highlights

- Real pounds/kilograms conversion backed by canonical pound storage
- Safe migration of existing 3.2.0 workout, body, goal, Smith-machine, and active-session data
- Separate strength-session, recovery-day, training-streak, and consistency statistics
- Editable active and historical sets, body readings, and completed sessions
- Undo after destructive set, session, and body-record actions
- Rest timer recovery after refresh, closure, or relaunch
- Workout-level notes plus reviewed setup guidance for every bundled exercise
- Honest no-data coaching states
- Scoped, fault-tolerant NEXSET service-worker cache management
- Mobile accessibility improvements, including text zoom and reduced-motion support

Detailed changes are in `RELEASE_NOTES_3.2.1.md`. Test coverage is documented in `VALIDATION.md`.

## Data compatibility

The update keeps the established browser-storage keys:

```text
pfWorkoutApp.v1
pfWorkoutApp.active.v1
```

The state schema advances to version 4. Existing data is migrated in place. Strength and body-weight values are stored canonically in pounds and converted only for display and input.

Export a backup before deployment or before clearing browser data.

## Deploy to GitHub Pages

1. Open the current app and use **Profile → Backup & restore → Export backup**.
2. Replace the repository-root files with the contents of this package.
3. Commit and push the changes to the GitHub Pages branch.
4. Open the deployed app once at:

   ```text
   https://bobbyginn09-sys.github.io/planet-fitness-workout-app/?nexset=3.2.1
   ```

5. In an already installed copy, use **Profile → Backup & restore → Check for update**, then fully close and reopen the app.
6. Confirm that history, body readings, settings, and any unfinished workout are present.

## Important behavior changes

- Tapping a logged set opens an editor. Delete is now a secondary action.
- Rest timers use a saved end timestamp, so remaining time is recalculated after relaunch.
- Switching units changes display and input only; it does not reinterpret stored values.
- Strength workouts and recovery days are reported separately.
- The Review tab waits for actual training data before making progression claims.

## Main files

- `index.html` — complete application shell and UI
- `service-worker.js` — offline cache and update behavior
- `manifest.webmanifest` / `manifest.json` — install metadata
- `extracted.js` — exact copy of the inline application script for syntax review
- `RELEASE_NOTES_3.2.1.md` — release details
- `RELEASE_CHECKLIST_3.2.1.md` — deployment verification
- `VALIDATION.md` — completed automated and static checks

## Browser support

The app is optimized for current iPhone Safari as an installed Home Screen PWA. It also works in current Chromium-based mobile browsers. Local browser storage remains device- and browser-profile-specific, so periodic backup export is recommended.
