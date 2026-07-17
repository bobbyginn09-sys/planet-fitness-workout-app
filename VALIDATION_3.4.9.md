# Validation — NEXSET 3.4.9

## Static checks
- Service-worker version and cache key bumped to 3.4.9.
- Embedded patch CSS includes the phone-safe full-width control layout.
- Existing final-cardio completion and post-workout sharing JavaScript are preserved.

## Responsive layout checks
A local Chromium preview was rendered at a 402px CSS viewport. Bounding-box assertions verify that both stepper buttons and the numeric input remain inside each control card with no overlap. Additional fallbacks cover 390px and 360px widths.

## Device check still required
The installed iPhone PWA should be opened once after deployment to confirm Safari font rendering and service-worker activation.
