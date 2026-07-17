# NEXSET 3.4.9 — Full-Width Lift Controls

## Root cause fixed
The Weight and Reps cards were still arranged side-by-side on approximately 402px-wide iPhones. The fixed button columns consumed most of each card, leaving too little protected space for the number. Reducing font size alone could not solve that layout conflict.

## Changes
- On phone-sized screens, Weight and Reps are now separate compact full-width rows.
- Each row reserves fixed columns for the minus and plus buttons and a protected flexible center column for the value.
- Three-digit weights and two-digit reps no longer share space with the buttons.
- The label, unit/range, target, and suggested-weight note remain visible without horizontal overflow.
- Preserves the final-cardio auto-completion fix and the post-workout Share with Atlas flow from prior releases.

## Tested widths
- 402px CSS viewport, matching the reported iPhone screenshot class.
- 390px and 360px narrow-phone fallbacks.
