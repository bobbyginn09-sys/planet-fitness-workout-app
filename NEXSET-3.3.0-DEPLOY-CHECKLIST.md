# NEXSET 3.3.0 deployment checklist

## Before publishing

- Export a current backup from **Profile → Backup & restore**.
- Keep the backup outside the app/PWA storage.
- Open the validation and package-integrity reports.
- Upload every file from the release folder in the same GitHub commit.

## Publish

1. Extract `NEXSET-3.3.0-flexible-workouts.zip`.
2. Open `planet-fitness-workout-app-3.3.0`.
3. Replace the repository-root app files with the contents of that directory.
4. Commit and push once, rather than updating the service worker and page separately.
5. Let GitHub Pages finish publishing.

## Installed-PWA refresh

1. Open the live site in Safari once with `?nexset=3.3.0` appended.
2. Open **Profile → Backup & restore → Check for update**.
3. Fully close the Home Screen app.
4. Reopen it and confirm version 3.3.0 in Profile.

## Smoke test after publication

- Open Home, Program, Progress, and Profile.
- Start the planned workout and log one set.
- Refresh/reopen and verify the active session remains.
- Replace one exercise for this workout only.
- Skip one exercise, complete another, then revisit the skipped movement.
- Start and save a Quick Workout.
- Edit a routine, reorder an exercise, and confirm the new order survives reload.
- Save or update equipment setup notes and reopen the exercise.
- Finish a test workout, correct a set from history, and verify totals update.
- Export a new backup.
- Enable airplane mode after one online launch and confirm the app shell reopens.
