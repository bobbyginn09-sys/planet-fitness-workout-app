# NEXSET 3.4.3 Patch Deployment

This is an update patch for an existing NEXSET 3.4.2 repository. **Do not delete the current index, icons, launch images, or anatomy files.**

## Before uploading

1. Open NEXSET.
2. Go to **Profile → Backup & restore**.
3. Export a fresh backup and save it outside the app.
4. Finish or cancel any active workout. A paused workout keeps its original exercise list until that session ends.

## Upload to GitHub

Upload these three runtime files from the patch folder to the repository root and replace the existing copies:

- `service-worker.js`
- `manifest.json`
- `manifest.webmanifest`

Keep every existing 3.4.2 file in the repository, especially `index.html`, the icons and launch images, and all `muscle-*-v342.png` assets.

## Install the update

1. Wait for GitHub Pages to publish.
2. Open this once in Safari:

   `https://bobbyginn09-sys.github.io/planet-fitness-workout-app/?nexset=3.4.3`

3. Open the installed NEXSET app.
4. Go to **Profile → Backup & restore → Check for update**.
5. Tap **Update now**.
6. Fully close NEXSET from the app switcher and reopen it.
7. Confirm Profile displays **NEXSET 3.4.3**.

## Smoke test

- Start a test lifting workout and confirm a three-digit weight such as 130 is fully visible.
- Open an incline treadmill exercise and confirm Time, Speed, Incline, and effort controls appear.
- Log a treadmill entry and confirm History shows time, speed, incline, and estimated distance.
- Open Pull A and confirm its cardio exercise is Stair Climber with Time and Level controls.
- Confirm Legs A has 17 lifting sets.
- Confirm Upper Definition has 15 lifting sets and no reverse pec deck or dumbbell lateral raise.
- Close and reopen the app during a test cardio workout and confirm its draft values return.
- After one successful online launch, enable airplane mode and confirm NEXSET reopens.

## Recovery

If the update does not appear:

1. Open the versioned Safari URL again.
2. Use **Check for update** again.
3. Fully close and reopen the Home Screen app.
4. Use **Refresh app cache** only after confirming the backup exists.
