# PF Workout Coach — Atlas 2.0

This is the first clean rebuild of the workout app around one rule: **tell you what to do next with as little friction as possible.**

## What changed

- Simplified Home screen focused on today's mission.
- Full-screen flash-card workout mode with one exercise at a time.
- Swipe left/right or use Back / Next exercise.
- One-thumb weight and rep steppers.
- Easy / Just right / Hard effort logging.
- Warm-up sets are saved but ignored by progression logic.
- Full-screen rest timer with sound/haptic attempt.
- Mission Complete summary with volume, working sets, cardio, PRs, and coach recommendations.
- Cleaner History cards, weekly Plan, progress charts, PRs, body metrics, and coach reports.
- Nutrition tracking is intentionally absent for now.
- Existing data is preserved because the app keeps the same localStorage keys as prior versions.

## Update your GitHub Pages app

1. Export a backup from the current app first.
2. Upload every file and folder from this package to the repository root, replacing the old files.
3. Commit the changes.
4. Open the site once with `?atlas=2` appended.
5. In More → Backup & restore, tap **Refresh app cache** if an older version remains.
6. Fully close and reopen the Home Screen app.

The active-workout and saved-data storage keys remain `pfWorkoutApp.active.v1` and `pfWorkoutApp.v1` so the same device/browser should retain existing history.
