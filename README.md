# NEXSET 3.1.6 — Reference-Inspired Polish

## 3.1.6 visual-polish update

- Compact NEXSET header lockup and a short branded startup animation.
- Reference-inspired Home dashboard with the workout hero card, four quick actions, and a progress summary.
- The flash-card workout logger remains intact, with a small NEXSET mark and refined electric-blue treatment.
- Program page now uses a 7-day list, recent-workout cards, and an expandable exercise-detail drawer.
- Existing storage keys, workout history, progression logic, and interaction behavior are preserved.
- Body-metric and quick-action sheets now handle Close, Save, and internal action buttons reliably.


This release fixes the completed-set chip being clipped at the bottom in iPhone Safari. The working-set status now uses a small CSS indicator instead of an emoji, and the chip has explicit height and line spacing so the full **Set 1**, **Set 2**, and later labels remain visible.

## Version 2.5.6

- Prevented logged-set chips from shrinking inside the workout card.
- Replaced the Apple emoji status dot with a stable CSS dot for **Easy**, **Just right**, and **Hard** sets.
- Added explicit line height and bottom spacing so the set label is not cut off in Safari.
- Preserved tap-to-delete behavior, set logging, the rest timer, progression suggestions, and all existing saved workout data.

## Version 2.5.5

- Replaced the always-visible **Next** button with **Log Set 1**, **Log Set 2**, and so on while the current exercise is incomplete.
- Changes the bottom action to **Next Exercise** only after all programmed working sets are logged.
- Keeps the set action visible above the iPhone safe area at all times.
- Compacted the first-session and previous-session coaching card.
- Removed duplicated previous-set/suggested-next information from the logging controls.
- Allows the exercise card to scroll on unusually short viewports instead of clipping the lower controls.
- Preserved the text-only cue-and-notes sheet, warm-up tracking, progression suggestions, and cancel-workout flow.

---

# NEXSET 3.0.0 — Workout Coach

NEXSET 3.0.0 is the branded, iPhone-first redesign of the workout app. It keeps the same saved-data keys as previous PF Workout Coach / NEXSET builds, so existing workout history should remain available when the files are uploaded to the same GitHub Pages address.

## What changed

### Professional NEXSET identity
- New NEXSET geometric app mark and Home Screen icon.
- New electric-blue performance gradient.
- Deep navy, slate, muted gray, success, warning, and danger color system.
- iPhone system typography and more consistent spacing.
- App name, manifest, splash screens, coach reports, and backup filenames now use NEXSET.

### Less scrolling
- Home is a single focused dashboard on current iPhones.
- Workout mode has no vertical scrolling: one exercise, one screen.
- Exercise form cues, notes, plate calculator, and delete controls moved into a bottom sheet.
- Progress uses Overview / Strength / Body / Review tabs.
- More uses short menu pages instead of one long settings/history wall.
- Workout Preview keeps the complete exercise list collapsed until needed.

### Workout experience
- One-thumb weight and rep steppers.
- Quick `−10`, `−5`, `+5`, and `+10` weight controls.
- Easy / Just right / Hard effort buttons.
- Warm-up sets remain excluded from progression recommendations.
- Swipe left or right between exercise cards.
- Full-screen rest timer.
- Compact Workout Complete screen with stats, PRs, and coach notes.

### Included brand assets
The repository root contains the NEXSET mark, compact header lockup, wordmark, app icons, workout-card artwork, and iPhone launch images.

## Update the live GitHub Pages app

1. In the current app, open **More → Backup & restore → Export** and save the JSON backup.
2. Upload every file and folder from this package to the repository root, replacing the old files.
3. Commit the changes.
4. Open the site once with `?nexset=3.1.6` appended.
5. Open **More → Backup & restore → Refresh app cache**.
6. Fully close and reopen the Home Screen app.

Example:

```text
https://bobbyginn09-sys.github.io/planet-fitness-workout-app/?nexset=3.1.6
```

## App icon note

Safari may keep the old Home Screen icon after the website files change. If the old PF icon remains, remove the Home Screen app and add the GitHub Pages link to the Home Screen again. Export a backup first; removing the icon normally does not delete Safari website data, but the backup is the safest protection.

## Data compatibility

NEXSET 3.1.6 keeps:

```text
pfWorkoutApp.v1
pfWorkoutApp.active.v1
```

Those are the same local storage keys used by the prior builds.


## Phase Two
See `PHASE_2_POLISH.md` for the 2.3.0 interaction and visual-polish changes.

## Version 2.3.1

- Added **Cancel workout** to the active workout exercise-details menu.
- Empty workouts receive a simple discard warning.
- Workouts containing sets or notes receive a stronger permanent-loss warning.
- Canceled workouts are removed from the active draft and are not added to History or progress statistics.
