NEXSET 3.1.0 — WORKOUT COACH

This release fixes the completed-set chip being clipped at the bottom in iPhone Safari. Set status now uses a CSS dot instead of an emoji, with explicit chip height and line spacing so Set 1, Set 2, and later labels remain fully visible.

VERSION 3.1.0
- Prevents logged-set chips from shrinking inside the workout card.
- Replaces the Apple emoji status dot with a stable CSS dot.
- Adds enough vertical space for the full set label in Safari.
- Preserves tap-to-delete, rest timers, progression suggestions, and saved workout data.

VERSION 2.5.5
- The bottom action says Log Set 1, Log Set 2, and so on while the exercise is incomplete.
- It changes to Next Exercise only after the programmed working sets are complete.
- The set action remains visible above the iPhone safe area.
- Previous-session coaching is more compact and duplicate reference boxes are removed.
- Short screens can scroll the exercise card instead of clipping lower controls.
- Cue-and-notes sheet, warm-up tracking, progression suggestions, and cancel workout remain included.

----------------------------------------

# NEXSET 3.1.0 — Workout Coach

NEXSET 3.1.0 is the branded, iPhone-first redesign of the workout app. It keeps the same saved-data keys as previous PF Workout Coach / NEXSET builds, so existing workout history should remain available when the files are uploaded to the same GitHub Pages address.

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
The `brand` folder contains the mark, wordmark, concept board, and written brand guide. The `splash` folder contains iPhone launch images.

## Update the live GitHub Pages app

1. In the current app, open **More → Backup & restore → Export** and save the JSON backup.
2. Upload every file and folder from this package to the repository root, replacing the old files.
3. Commit the changes.
4. Open the site once with `?nexset=3.1.0` appended.
5. Open **More → Backup & restore → Refresh app cache**.
6. Fully close and reopen the Home Screen app.

Example:

```text
https://bobbyginn09-sys.github.io/planet-fitness-workout-app/?nexset=3.1.0
```

## App icon note

Safari may keep the old Home Screen icon after the website files change. If the old PF icon remains, remove the Home Screen app and add the GitHub Pages link to the Home Screen again. Export a backup first; removing the icon normally does not delete Safari website data, but the backup is the safest protection.

## Data compatibility

NEXSET 3.1.0 keeps:

```text
pfWorkoutApp.v1
pfWorkoutApp.active.v1
```

Those are the same local storage keys used by the prior builds.


## Phase Two
See `PHASE_2_POLISH.md` for the 2.3.0 interaction and visual-polish changes.
