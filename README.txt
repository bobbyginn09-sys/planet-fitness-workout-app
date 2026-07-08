# PF Workout Coach v3

Updated Planet Fitness workout tracker.

## What changed

- Removed the confusing in-app Install button from the top.
- Cleaned up the mobile header so it does not create huge top buttons.
- Added **Coach check-in** so you can share/copy your workouts, body metrics, and next-weight recommendations into ChatGPT.
- Added import backup in Settings.
- Added **Refresh app cache** for GitHub Pages updates that appear stuck.
- Updated the service worker to fetch fresh files first.

## How to update GitHub Pages

1. Unzip this package.
2. Upload/replace these files in your GitHub repository root: `index.html`, `manifest.webmanifest`, `manifest.json`, `service-worker.js`, and the `icons` folder.
3. Commit the changes.
4. Open your GitHub Pages URL with `?v=3` at the end once, then refresh.
5. If the old app still shows, open Settings → Refresh app cache, then close and reopen the app.

Your workout history should stay on the same phone/browser because the app keeps the same local storage key.

## How to install on phone

Use your browser menu, not an in-app Install button:

- iPhone Safari: Share → Add to Home Screen
- Android/Chrome: three dots → Add to Home screen / Install app

## How to let ChatGPT review your progress

Open Today, History, or Settings and tap **Coach check-in**. Share/copy the report, then paste it into ChatGPT. The app does not send data automatically; your data stays local unless you share it.

## Backup note

Use **Export backup** before switching phones, clearing browser data, or reinstalling the web app.


Version 4 update:
- Added Easy weight controls on weighted exercises: -10, -5, +5, +10, Last, and Clear.
- Tap +5/+10 before logging a set. After you log the set, the new weight stays filled in for the next sets on that exercise.
- Existing workout history stays local in the browser and is not reset by this update.
