# NEXSET 3.4.1 Deployment Checklist

## Before uploading

- [ ] Open the existing NEXSET installation.
- [ ] Go to **Profile → Backup & restore**.
- [ ] Export a backup and save it outside the app.
- [ ] Extract the NEXSET 3.4.1 ZIP.
- [ ] Open the `planet-fitness-workout-app-3.4.1` folder.

## Repository upload

- [ ] Replace `index.html`.
- [ ] Replace `service-worker.js`.
- [ ] Replace both manifest files.
- [ ] Replace the NEXSET SVG and icon files.
- [ ] Upload all six `muscle-*-v341.png` files.
- [ ] Replace launch images if GitHub marks them as changed.
- [ ] Commit all changes together in one commit.
- [ ] Wait for GitHub Pages to finish publishing.

## Refresh the installed app

- [ ] Open `https://bobbyginn09-sys.github.io/planet-fitness-workout-app/?nexset=3.4.1` in Safari.
- [ ] Open the installed Home Screen app.
- [ ] Go to **Profile → Backup & restore → Check for update**.
- [ ] Select **Update now**.
- [ ] Fully close NEXSET from the app switcher.
- [ ] Reopen it.
- [ ] Confirm Profile reports **NEXSET 3.4.1**.

## Smoke test

- [ ] Confirm existing workout history is present.
- [ ] Confirm existing body readings and custom routine edits are present.
- [ ] Check Push, Pull, Legs A, Legs B, Upper, and Recovery figures.
- [ ] Start a workout and log one test set.
- [ ] Pause and reopen the workout.
- [ ] Open Quick Workout and verify the exercise list.
- [ ] Open Workouts and select a different day.
- [ ] Verify the header shortcuts icon opens Quick Actions.
- [ ] After one online launch, test opening NEXSET in airplane mode.
