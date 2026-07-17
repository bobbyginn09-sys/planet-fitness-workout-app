# Deploy checklist — NEXSET 3.4.7

1. Export a fresh backup from **Profile → Backup & restore**.
2. Replace these files in the GitHub repository root:
   - `service-worker.js`
   - `manifest.json`
   - `manifest.webmanifest`
3. Wait for GitHub Pages to publish.
4. Open the site once in Safari with `?nexset=3.4.7`.
5. In NEXSET, use **Check for update → Update now**.
6. Fully close and reopen the Home Screen app.

## Required smoke test
- Open a weighted exercise and confirm 8, 10, 12, and 15 display fully in Reps.
- Confirm 3-digit weights still display fully.
- Complete a short test workout with treadmill cardio as the last exercise.
- Log the final cardio entry and confirm the Workout Complete stats screen opens automatically.
- Confirm Share with Atlas and Copy still work.
