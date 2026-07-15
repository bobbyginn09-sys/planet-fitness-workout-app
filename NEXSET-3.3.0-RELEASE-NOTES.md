# NEXSET 3.3.0 — Flexible Workouts

## Release objective

Make the workout adapt to real gym conditions without weakening the reliability work from 3.2.1. The release is packaged as one complete repository-root bundle so the page, manifest, service worker, scripts, styles, and assets stay on the same version.

## Included capabilities

- Equipment setup memory
- Exercise-specific instructions
- Workout completion summary

## Carried forward from 3.2.1

- Editable logged sets and history corrections
- Undo for destructive record changes
- Unit-aware strength and body-weight data
- Distinct strength, recovery, and consistency statistics
- Rest-timer and active-session recovery
- Workout-level notes
- Scoped PWA cache cleanup and safer offline installation

## Deployment rule

Deploy every file from the release folder to the repository root in a single commit. Mixing a new manifest or service worker with an older `index.html` is not a supported deployment state.

## Verification after deployment

1. Export a backup from Profile.
2. Publish the entire release root.
3. Open the versioned GitHub Pages URL.
4. Trigger Check for update, fully close the installed PWA, and reopen it.
5. Confirm the displayed version, then test one planned workout, one exercise swap, one skip-and-revisit action, one quick workout, one template edit, refresh recovery, and backup export.

Validation gate at packaging time: **REVIEW**. See `NEXSET-3.3.0-VALIDATION.md` for evidence and any review items.
