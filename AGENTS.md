# NEXSET project instructions

## Product

NEXSET is Bobby's private, mobile-first Planet Fitness workout and nutrition PWA. The current baseline is **NEXSET 4.2.0 — Jacked + Lean + Nutrition**. It is hosted from the existing GitHub Pages project repository and is primarily used as an installed iPhone PWA.

- Keep the existing GitHub repository and project URL.
- No App Store release, backend, login system, cloud database, or subscription is required.
- iPhone standalone-PWA behavior is the primary target; desktop behavior is secondary.

## Current architecture

- Vanilla HTML, CSS, and JavaScript.
- `index.html` currently contains most UI, state, migrations, and application logic.
- `service-worker.js` provides offline caching and update behavior.
- `manifest.webmanifest` provides install metadata.
- Image, SVG, and icon files in the repository are live application assets.
- Use relative asset URLs so the app continues to work from a GitHub Pages project path.
- Do not migrate the app to React, Next.js, Vite, Svelte, a backend, or another framework unless Bobby explicitly approves that architectural change.
- Refactoring is encouraged only in small, behavior-preserving stages with tests between stages.

## Data safety — highest priority

The app stores personal training and nutrition data locally and supports JSON backup/restore. A code change must never silently erase or corrupt that data.

- Preserve existing localStorage and IndexedDB data, storage keys, backup formats, schema versions, migrations, and import/export compatibility.
- Preserve workout history, active workouts, missed-day records, exercise progression, PRs, achievements, body metrics, nutrition logs, macro targets, photos, settings, and app-update metadata.
- Do not delete compatibility or migration code merely because it looks old or repetitive.
- Before changing a schema: document the old shape, add a migration, test importing an older backup, test export/import round trips, and make failure non-destructive.
- Never commit personal backup JSON files, coach packets, body/health data, progress photos, the cookbook PDF, credentials, access tokens, or API keys.

## UI requirements

- Design mobile-first for at least **390 × 844** and **360 × 800** viewports.
- Respect iPhone safe areas and standalone display mode.
- No horizontal scrolling.
- No clipped or covered weight, rep, set, timer, cardio, or navigation controls.
- Keep tap targets large enough for use during a workout.
- Keep scrolling low and the active-workout flow fast.
- Preserve the NEXSET dark visual identity, logo, and tagline: “Progress Starts With Your Next Set.”
- Keep Planet Fitness equipment constraints and the current rolling five-day strength plan unless a task explicitly changes programming.

## Functional requirements

Preserve and test these workflows whenever related code changes:

1. Start, pause, resume, cancel, and complete a workout.
2. Log weighted, bodyweight, timed, and cardio exercises.
3. Remember prior weights and generate progression recommendations.
4. Handle skipped/missed days without moving the rolling plan incorrectly.
5. Log post-lift cardio and optional evening running.
6. Log calories, protein, carbohydrates, and fat; edit and delete entries; copy yesterday; change targets.
7. Export and import a full backup without losing data.
8. Generate coach reports and completion summaries.
9. Install and update as a GitHub Pages PWA; continue working offline after caching.

## Service-worker rules

- When a release changes cached app files, update the app version, cache name, manifest start URL when appropriate, and every relevant in-app version label together.
- Keep `APP_SHELL` complete and limited to files that actually exist.
- Test both first install and upgrade from the prior cache.
- Do not test PWA behavior from `file://`; use a local HTTP server or the live GitHub Pages URL.

## Working method

For every task:

1. Read this file and inspect the relevant code before editing.
2. State a short plan and identify data-loss or PWA-update risks.
3. Make the smallest coherent change.
4. Run syntax checks and available automated tests.
5. Open the app through HTTP, inspect the browser console, and test the affected flow at mobile sizes.
6. Review the diff for accidental unrelated changes.
7. Summarize what changed, what was tested, and any remaining uncertainty.

Use a feature branch. Prefer small commits. Do not push or merge to the publishing branch until the app has been tested and Bobby approves the result.
