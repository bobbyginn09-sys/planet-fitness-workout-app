# NEXSET 3.4.0 Deployment Checklist

## Before replacing files

- [ ] Open the current installed app.
- [ ] Go to **Profile → Backup & restore**.
- [ ] Export a fresh backup.
- [ ] Store the backup somewhere outside the browser or Home Screen app.
- [ ] Confirm the backup file opens as JSON and contains `"format": "nexset-backup"`.

## Repository deployment

- [ ] Extract `NEXSET-3.4.0-all-in-one-flexible-workouts.zip`.
- [ ] Open the `planet-fitness-workout-app-3.4.0` folder.
- [ ] Replace these runtime files in the repository root in the same commit:
  - `index.html`
  - `service-worker.js`
  - `manifest.json`
  - `manifest.webmanifest`
  - `nexset-mark.svg`
  - `nexset-lockup-v317.svg`
  - `apple-touch-icon.png`
  - `icon-192.png`
  - `icon-512.png`
  - `icon-1024.png`
  - All four `launch-*.png` files
- [ ] Upload the current documentation and validation files as desired.
- [ ] Commit and push.
- [ ] Wait for GitHub Pages to finish publishing.

Obsolete `muscle-*.png` files and older release artifacts may remain without affecting the app, but they are no longer referenced by 3.4.0 and can be removed during repository cleanup.

## Force the new shell once

Open:

```text
https://bobbyginn09-sys.github.io/planet-fitness-workout-app/?nexset=3.4.0
```

Then:

- [ ] Confirm Home shows the geometric training focus map.
- [ ] Confirm a **Quick Workout** card appears below the scheduled workout.
- [ ] Confirm Profile reports **NEXSET 3.4.0**.

## Update an installed Home Screen copy

- [ ] Open **Profile → Backup & restore → Check for update**.
- [ ] Choose **Update now** when prompted.
- [ ] Fully close NEXSET from the app switcher.
- [ ] Reopen NEXSET.
- [ ] Recheck the version in Profile.

If an old shell remains after GitHub Pages has published, open the query-string URL in Safari once, then close and reopen the installed copy.

## Data-preservation checks

- [ ] Existing workout history is present.
- [ ] Existing body readings are present.
- [ ] Units and theme are unchanged.
- [ ] Progress totals appear reasonable.
- [ ] Any previously unfinished workout is offered for recovery.

## Functional smoke test

- [ ] Start the scheduled workout.
- [ ] Log one test set.
- [ ] Confirm the rest timer appears when expected.
- [ ] Close and reopen NEXSET; confirm the active workout restores.
- [ ] Open the workout list and jump to another exercise.
- [ ] Skip one exercise and return it to the workout.
- [ ] Replace an exercise for this workout only.
- [ ] Add one exercise during the session.
- [ ] Cancel the test workout and verify no completed history entry was added.
- [ ] Build and save a two-exercise Quick Workout.
- [ ] Start and complete that Quick Workout.
- [ ] Confirm the scheduled program day did not advance.
- [ ] Edit one workout day and save it.
- [ ] Reopen the app and confirm the edit remains.
- [ ] Record a body reading, open Progress → Body, and edit it from Recent readings.
- [ ] Export a new backup.

## Offline smoke test

After at least one successful online launch:

- [ ] Fully close NEXSET.
- [ ] Enable airplane mode.
- [ ] Reopen the Home Screen app.
- [ ] Confirm the application shell opens.
- [ ] Disable airplane mode after the check.

## Rollback

If saved data looks wrong:

1. Stop entering new data.
2. Open **Profile → Backup & restore**.
3. Import the backup exported before deployment.
4. Confirm the restored counts before continuing.
