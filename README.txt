# PF Workout Coach v5

Updated Planet Fitness workout coach.

## New in v5

- Added **How did this set feel?** buttons: Easy, Just right, Hard.
- Added **Warm-up set** checkbox so warm-up/ramp-up sets do not drive next-weight recommendations.
- Updated next-weight recommendations to use reps, weight, set feel, and warm-up status.
- Added a body-metrics dashboard for weight, body fat, waist, skeletal muscle, muscle mass, visceral fat, and BMR.
- Added daily nutrition/recovery check-ins for calories, protein, steps, water, sleep, and notes.
- Added editable coach goals in Settings.
- Coach check-in reports now include body metrics, nutrition/recovery averages, set feel, and warm-up labels.

## How to update GitHub Pages

1. Unzip this package.
2. Upload/replace these files in your GitHub repository root: `index.html`, `manifest.webmanifest`, `manifest.json`, `service-worker.js`, `.nojekyll`, and the `icons` folder.
3. Commit the changes.
4. Open your GitHub Pages URL with `?v=5` at the end once.
5. If the old app still shows, open Settings → Refresh app cache, then close and reopen the app.

Your existing workout history should stay in the browser because this version keeps the same local storage key. Export a backup first anyway.

## How to use the new set feel buttons

For every working set, tap one:

- Easy: you had several reps left
- Just right: challenging but clean
- Hard: barely got it or form started to break

Mark ramp-up sets as Warm-up. The app will show them in history, but ignore them for next-weight recommendations.
