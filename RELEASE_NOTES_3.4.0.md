# NEXSET 3.4.0 Release Notes

**Release date:** July 15, 2026  
**Release type:** All-in-one visual polish and flexible-workout release  
**State schema:** 5

## Purpose

This build supersedes the uninstalled 3.3.1 visual-polish files and the earlier 3.3.0 package. It combines the accepted visual direction with the flexible-workout functionality that had previously been planned but was not present in the older code bundle.

## Flexible Workout system

### Quick Workout

A new Quick Workout builder supports unplanned gym sessions without advancing the scheduled program day.

The builder supports:

- Session naming.
- Search across the built-in and alternate exercise library.
- Adding and removing exercises.
- Reordering selected exercises.
- Saving reusable templates.
- Loading templates from Home or Workouts.
- Deleting templates with Undo.
- Starting a workout directly from the completed selection.

Quick Workout sessions are saved to History and contribute to real strength and volume totals, but they do not falsely advance the scheduled seven-day routine.

### Editable program

Every scheduled day can now be edited from the Workouts screen or Profile settings.

Editable fields include:

- Workout title.
- Training focus.
- Warm-up guidance.
- Day note.
- Exercise order.
- Exercises included in the day.
- Working sets.
- Minimum and maximum rep or duration targets.
- Weight or duration increment.
- Per-exercise rest duration.

The user can restore one day or the complete original NEXSET program without deleting workout history.

### Active-session flexibility

During a workout, the exercise list now distinguishes Current, Open, Done, and Skipped states. The user can:

- Jump directly to another exercise.
- Skip an occupied machine and return later.
- Reorder the current session.
- Add another exercise mid-workout.
- Replace the current exercise with a compatible movement alternative.
- Apply the replacement to this workout only or retain it in the program.
- Finish while intentionally skipped exercises remain.

When an exercise already contains logged sets, those sets remain attached to the original exercise and the replacement is inserted after it rather than rewriting training history.

### Exercise and equipment details

- Active and historical entries store an exercise snapshot so later routine edits do not change the meaning of old sessions.
- Machine and equipment setup notes are saved by exercise and shown again in future sessions.
- Alternate exercises include reviewed setup steps and movement-pattern metadata.
- Replacement options are restricted to compatible movement patterns instead of presenting a random list.

## Visual polish included from 3.3.1

- Replaced the previous realistic anatomical figure with consistent inline geometric focus maps.
- Added distinct Push, Pull, Lower Body, Posterior Chain, Upper Body, and Recovery maps.
- Rebalanced the Home workout card and Start Workout action.
- Added a dedicated Quick Workout card.
- Unified Quick Action icon styling.
- Replaced zero-volume language with “Build your baseline.”
- Simplified the active workout and consolidated form, setup, exercise notes, and workout notes.
- Changed active progress to completed sets and total target sets.
- Improved empty states and direct actions on Progress.
- Added a visible Recent Readings section with full-row body-record editing.
- Improved selected workout states, touch targets, keyboard focus, reduced motion, and light-theme rendering.

## Rest and target behavior

- Each exercise can use its own rest duration.
- A rest duration of zero seconds now genuinely disables automatic rest for that exercise.
- Timed and cardio exercises support multiple target sets and their own duration increments.
- Rest-timer end timestamps continue to survive refresh and relaunch.

## Progress and statistics

- Quick Workout strength entries are included in strength trends and personal records.
- Quick Workouts do not increase the scheduled program week number.
- Strength sessions, recovery days, training streak, and consistency streak remain separate concepts.
- The Body tab shows recent readings outside the entry form, making edits discoverable.
- Empty review states remain evidence-based and do not invent positive conclusions.

## Data model and migration

Version 3.4.0 moves state to schema 5 and adds:

- `programPlan`
- `quickTemplates`
- `exerciseSetups`
- Exercise snapshots on active and historical entries
- Flexible-workout status and plan-index metadata

Existing schema 4 and older data are normalized automatically. Existing history, active workout, timer state, units, body records, goals, progression, and app settings are preserved.

The original storage keys remain unchanged:

```text
pfWorkoutApp.v1
pfWorkoutApp.active.v1
pfWorkoutApp.recovery.v1
pfWorkoutApp.meta.v1
```

## Offline update behavior

- Application, manifest, and service-worker versions are aligned at 3.4.0.
- The cache is scoped to NEXSET-owned keys.
- Core assets are required during installation.
- Optional splash assets are cached with fault tolerance.
- The update message continues to preserve local workout data.

## Intentional limitations

- Data is still local to the current browser profile unless exported.
- There is no cloud account or multi-device synchronization.
- The current application remains a large static page; modularization and IndexedDB are planned for the engineering phase.
- Automated browser validation used a rendered in-memory document because local HTTP navigation is restricted in the build environment. Service-worker syntax, cache assets, scope, and versioning were validated statically, but a real installed iPhone PWA smoke test should still be completed after deployment.
