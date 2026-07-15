# NEXSET 3.2.1 Release Notes

Released July 15, 2026.

## Reliable training data

- Stores strength and body-weight values canonically in pounds while displaying and accepting either pounds or kilograms.
- Migrates existing 3.2.0 state and active-workout data without changing the established local-storage keys.
- Preserves the meaning of older body-weight, goal-weight, and Smith-machine values that the prior version stored as pounds even when kilograms was selected.
- Separates strength sessions, recovery days, training streaks, and overall consistency.
- Replaces misleading zero-data coaching with a clear first-workout baseline state.
- Keeps optional body fields genuinely blank instead of normalizing missing entries to zero.

## Corrections and recovery

- Fixes a pre-existing stale-reference issue that could start the rest timer without retaining the newly logged set.
- Logged sets open an editor instead of immediately leading to deletion.
- Active and historical set deletions include Undo and restore the exact record.
- Completed-session deletion and body-reading deletion include Undo.
- Body readings can be edited or deleted from the same sheet.
- Rest timers survive refreshes and app closures by storing their scheduled end timestamp.
- Migrated active sessions are written back immediately so they are not repeatedly reprocessed.
- Adds a visible workout-level note alongside exercise notes.

## Reliability and polish

- Makes charts, reports, progression suggestions, volume, PRs, body metrics, and Smith plate calculations unit-aware.
- Adds exercise-specific setup instructions for every movement in the bundled program.
- Removes duplicate micro weight-adjustment controls.
- Limits cache cleanup to NEXSET-owned caches and makes optional asset caching fault tolerant.
- Allows browser text zoom and improves reduced-motion behavior.
- Adds the standard standalone-web-app capability metadata alongside the iOS metadata.

## Compatibility

- Existing keys remain `pfWorkoutApp.v1` and `pfWorkoutApp.active.v1`.
- State schema advances from 3 to 4 through an in-place migration.
- GitHub Pages deployment and install flow remain unchanged.
