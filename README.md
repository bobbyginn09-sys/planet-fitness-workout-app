# PF Workout Coach v9

A mobile-first Planet Fitness workout coach built around a fixed 7-day schedule: 5 lifting days, 2 recovery days, and no lunges.

## New in v9

- **Previous workout card** above every exercise with the last working sets and today's target.
- **Working-weight autofill** plus the existing -10, -5, +5, +10, Last, and Clear controls.
- **RPE 6–10** as an optional fine-tuning layer alongside Easy / Just right / Hard.
- **Warm-up-aware set counts and volume** so ramp-up sets do not falsely complete the target.
- **Session notes and exercise notes** saved into History and coach reports.
- **7-day average weight and 30-day trend**, replacing misleading single-reading changes.
- **Weekly coach review** with lift sessions, working sets, cardio minutes, performance bests, wins, and next adjustments.
- **Share weekly review** and **full coach check-in** reports for ChatGPT.
- **Coach modes:** Fat loss + definition, Maintenance, and Muscle gain.
- **Training-cycle / deload tracker** with an adjustable deload interval.
- **Smith machine plate calculator** with an editable starting bar weight.
- Improved backup importing so older app backups inherit the new v9 settings.

## Updating the GitHub Pages app

1. In the current app, open **Settings → Export backup**.
2. Unzip this package.
3. In the GitHub repository root, upload/replace:
   - `index.html`
   - `manifest.webmanifest`
   - `manifest.json`
   - `service-worker.js`
   - `.nojekyll`
   - the `icons` folder
4. Commit the changes.
5. Open the hosted app once with `?v=8` appended to the URL.
6. If an older version remains, use **Settings → Refresh app cache**, then fully close and reopen the Home Screen app.

The app intentionally keeps the same local-storage keys as earlier versions, so workout history and body data should remain on the same browser/device and GitHub Pages origin. Export a backup before updating anyway.

## Effort logging

- **Easy / RPE 6–7:** several clean reps remained.
- **Just right / RPE 8:** challenging, controlled working set.
- **Hard / RPE 9:** approximately one clean rep remained.
- **RPE 10:** maximum effort; use sparingly.
- Mark ramp-up sets as **Warm-up** so they are saved but ignored by progression recommendations.

## Smith plate calculator

The starting resistance of a Smith bar can vary. Enter the starting bar weight shown on the specific machine. The calculator then shows the plates needed on each side for the total weight you want to log.
