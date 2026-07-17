# NEXSET 3.4.7 — Rep Controls + Final Cardio Completion

## Fixed
- Rebuilt the Weight and Reps controls instead of relying on the older shared stepper layout.
- Rep values now use a dedicated, fixed-width center field so 8, 10, 12, 15, and higher values remain fully visible.
- The new controls use text inputs with numeric keyboards to avoid iOS number-input clipping.
- On narrow phones, Weight and Reps stack vertically rather than squeezing the rep value behind the plus button.
- Logging the final cardio exercise now completes the workout automatically when all other exercises are done.
- Added an error fallback: cardio remains saved and the Finish Workout button remains available if completion encounters a runtime problem.

## Carried forward
- Post-workout statistics and Share with Atlas flow from 3.4.6.
- Treadmill responsive layout, progressive cardio, and workout-plan corrections.
