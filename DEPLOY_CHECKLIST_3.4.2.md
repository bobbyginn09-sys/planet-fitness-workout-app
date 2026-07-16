# NEXSET 3.4.2 Deployment Checklist

## Before deployment

- [ ] Open the currently installed NEXSET app.
- [ ] Go to **Profile → Backup & restore**.
- [ ] Export a fresh backup and save it outside Safari/NEXSET.
- [ ] Confirm no workout is actively being logged, or pause it before deployment.

## GitHub deployment

- [ ] Extract the 3.4.2 release ZIP.
- [ ] Open `planet-fitness-workout-app-3.4.2`.
- [ ] Upload the **contents** of that directory to the root of the GitHub repository.
- [ ] Replace `index.html`, `service-worker.js`, both manifests, icons, launch images, SVG assets, and all six `muscle-*-v342.png` files together.
- [ ] Remove retired `muscle-*-v341.png` files from the repository if they are still present.
- [ ] Commit the deployment as one change.
- [ ] Wait for GitHub Pages to finish publishing.

## Refresh the installed app

- [ ] Open this URL once in Safari:

  `https://bobbyginn09-sys.github.io/planet-fitness-workout-app/?nexset=3.4.2`

- [ ] Open the installed NEXSET app.
- [ ] Go to **Profile → Backup & restore → Check for update**.
- [ ] Select **Update now**.
- [ ] Fully close NEXSET from the app switcher.
- [ ] Reopen NEXSET.
- [ ] Confirm Profile displays **NEXSET 3.4.2**.

## Data smoke test

- [ ] Confirm prior workout history is present.
- [ ] Confirm body readings and units are correct.
- [ ] Confirm edited routines, templates, and saved machine setups remain.
- [ ] Start a workout and log one test set.
- [ ] Confirm the rest timer opens.
- [ ] Pause and reopen the workout.
- [ ] Confirm the active workout returns.
- [ ] Confirm the Next Exercise preview appears.

## PWA smoke test

- [ ] Open each main tab once while online.
- [ ] Fully close NEXSET.
- [ ] Enable airplane mode.
- [ ] Reopen NEXSET.
- [ ] Confirm the application shell opens offline.
- [ ] Disable airplane mode afterward.

## Recovery

If the update does not appear:

1. Open NEXSET in Safari with `?nexset=3.4.2`.
2. Use **Check for update** again.
3. Use **Refresh app cache** only after confirming the backup exists.
4. Close and reopen the installed app.
5. Import the backup only if saved data is actually missing.
