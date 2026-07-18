# Deploy checklist — NEXSET 3.5.0

1. Finish or cancel any active workout.
2. Export a fresh backup from **Profile → Backup & restore**.
3. Replace these three files in the GitHub repository root:
   - `service-worker.js`
   - `manifest.json`
   - `manifest.webmanifest`
4. Keep the existing `index.html`, icons, launch images, and `muscle-*-v342.png` files.
5. Wait for GitHub Pages to publish.
6. Open this once in Safari:

   `https://bobbyginn09-sys.github.io/planet-fitness-workout-app/?nexset=3.5.0`

7. In the installed app, use **Profile → Backup & restore → Check for update → Update now**.
8. Fully close NEXSET from the app switcher and reopen it.
9. Confirm Profile displays **NEXSET 3.5.0**.

## Required smoke test

- Confirm the next scheduled sequence is Upper Strength, Lower Body, Active Recovery, Push Build, Pull + Arms, Upper Definition, Full Rest.
- Open Monday and confirm Smith bench starts at 135 lb.
- Open Tuesday and confirm it is the only dedicated leg day with 15 working sets.
- Start a short test workout containing one lift and an incline walk.
- Complete or intentionally skip the lift, log the final incline walk, and confirm the Workout Complete / Share with Atlas screen opens automatically.
- Confirm 3-digit weights and all rep values remain fully visible.
