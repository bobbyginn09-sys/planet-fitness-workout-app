# Deploy checklist — NEXSET 3.4.6

1. Export a fresh backup from **Profile → Backup & restore**.
2. Upload and replace these three files in the repository root:
   - `service-worker.js`
   - `manifest.json`
   - `manifest.webmanifest`
3. Keep the existing `index.html`, icons, launch images, and anatomy assets.
4. Wait for GitHub Pages to publish.
5. Open the versioned site once in Safari with `?nexset=3.4.6`.
6. In NEXSET, use **Profile → Backup & restore → Check for update**.
7. Fully close and reopen the Home Screen app.

## Smoke test
- Complete a short test workout.
- Confirm the completion screen shows duration, working sets, volume, and cardio when applicable.
- Confirm **Share with Atlas** opens the native iPhone share sheet.
- Confirm **Copy** places the Coach Check-In text on the clipboard.
- Confirm **Return home** still works.
- Confirm reps and treadmill controls remain fully visible.
