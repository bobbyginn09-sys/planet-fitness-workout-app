# NEXSET 3.4.1 Release Notes

## Premium Today experience

- Reintroduced realistic anatomical training figures using dedicated Push, Pull, Legs A, Legs B, Upper Body, and Recovery assets.
- Target muscles are clearly colored red for lifting days, while recovery imagery uses a cooler blue treatment.
- Integrated the figure directly into the workout card with controlled scale, vignette, glow, and card-edge masking.
- Added a clearer Day/Today label, compact workout-detail chips, and a stronger primary Start Workout action.

## Interface refinement

- Tightened the NEXSET header and changed the home shortcut control from a notification bell to a four-square shortcuts icon.
- Unified dark surfaces around a deeper navy palette with more restrained outlines and better depth.
- Improved typography, spacing, radii, gradients, shadows, and icon containers.
- Refined Quick Workout, Quick Actions, Progress Summary, and bottom navigation.
- Improved the Workouts program selector, selected-day treatment, edit controls, and anatomical thumbnails.
- Refined the active-workout header, progress indicator, exercise card, guidance row, set controls, effort controls, and fixed footer.
- Improved the visual treatment of Quick Workout, program editor, exercise library, workout list, and exercise-details sheets.

## Compatibility

- Carries forward all 3.4.0 flexible-workout functionality.
- Keeps data schema 5 and existing local-storage keys.
- Requires no data migration beyond the migrations already included in 3.4.0.
- Adds six new anatomical PNG assets and includes them in the service-worker cache.

## Files that must deploy together

- `index.html`
- `service-worker.js`
- `manifest.json`
- `manifest.webmanifest`
- NEXSET icons and launch images
- `nexset-mark.svg`
- `nexset-lockup-v317.svg`
- `muscle-push-v341.png`
- `muscle-pull-v341.png`
- `muscle-legs-a-v341.png`
- `muscle-legs-b-v341.png`
- `muscle-upper-v341.png`
- `muscle-recovery-v341.png`
