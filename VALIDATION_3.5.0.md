# NEXSET 3.5.0 Validation

## Result

**17 of 17 runtime-transform and semantic checks passed.**

The service worker and injected patch JavaScript both pass `node --check`, and both manifest files parse as valid JSON.

## Runtime-transform checks

- PASS — 3.5.0 patch marker is injected.
- PASS — all wrapped base functions are renamed before the patch is injected.
- PASS — transformed inline JavaScript parses successfully.
- PASS — the application click dispatcher remains present.
- PASS — a failed target match falls back to the untouched base shell rather than serving a partial patch.

## Program checks

- PASS — seven scheduled days are present.
- PASS — five days are strength-training days.
- PASS — exactly one dedicated Lower Body day is present.
- PASS — the plan contains 69 strength working sets per week.
- PASS — exercise IDs are unique across the scheduled plan.
- PASS — Monday Smith bench starts at 135 lb.
- PASS — Tuesday Smith squat starts at 130 lb.
- PASS — Tuesday Smith Romanian deadlift starts at 140 lb.
- PASS — coached starting weights survive the app's progress rebuild.
- PASS — an exercise with no prior weight falls back to its coached recommendation instead of `0`.
- PASS — cardio duration falls back to the coached target when no previous cardio record exists.

## Final-cardio checks

- PASS — the final cardio entry can complete the workout when another exercise was intentionally skipped.
- PASS — the workout does not auto-complete while another exercise remains unresolved.
- PASS — final completion is queued after the cardio log is saved, avoiding a conflicting click-event stack.

## Preserved behavior

- Existing workout history, body readings, settings, and backups are not cleared.
- Current day position is preserved; the new seven-day sequence installs without forcibly resetting the calendar position.
- Full-width Weight and Reps controls and the post-workout Share with Atlas flow remain included.

## Device limitation

A genuine installed-iPhone service-worker upgrade, Safari font rendering, safe-area behavior, and the final tap workflow cannot be reproduced in this container. Complete the short device smoke test in `DEPLOY_CHECKLIST_3.5.0.md` after GitHub Pages publishes.
