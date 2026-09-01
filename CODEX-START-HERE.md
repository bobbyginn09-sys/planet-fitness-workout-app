# Start NEXSET in Codex on Windows

## Recommended setup

Use the **Codex desktop app** with the existing local Git repository. GitHub Desktop is optional but makes cloning, branches, commits, and pushing easier.

### 1. Establish a clean baseline

1. Clone the existing `planet-fitness-workout-app` repository to a normal local folder, such as `Documents\NEXSET`.
2. Create a branch named `codex/nexset-4.2-baseline`.
3. Replace the old cluttered deployment files with the 15 files from the clean NEXSET 4.2.0 deployment package.
4. Copy `AGENTS.md` and `.gitignore` from this starter kit into the repository root.
5. Commit that exact baseline before asking Codex to refactor anything.

Do not place the cookbook, coach packet, full backup, history import, or personal screenshots inside the public repository.

### 2. Open the project in Codex

1. Open Codex and sign in with the same ChatGPT account.
2. Choose **Open folder/project** and select the local NEXSET repository folder.
3. Confirm Codex can see `index.html`, `service-worker.js`, `manifest.webmanifest`, and `AGENTS.md`.
4. Keep command approvals enabled so you can review anything that changes files, installs software, accesses the network, or pushes to GitHub.

## First prompt — audit only

Paste this first. Do not begin with a rewrite request.

> Read AGENTS.md and audit the complete NEXSET 4.2.0 repository without changing any files. Map the architecture, navigation, workout flow, nutrition tracker, storage keys and schema migrations, backup/restore flow, service-worker update logic, and GitHub Pages assumptions. Identify concrete bugs, maintainability problems, privacy risks, and missing tests. Verify all asset references exist. Then propose a phased plan that preserves all user data and keeps the current vanilla PWA working. Do not recommend a framework rewrite as Phase 1.

## Second prompt — create a safe test baseline

Use this only after reviewing the audit.

> Implement Phase 1 only: add a lightweight local development and automated-validation setup without changing user-visible app behavior. Add the minimum files needed to serve the static PWA over HTTP, run JavaScript/asset/version consistency checks, and perform mobile browser smoke tests at 390×844 and 360×800. Test fresh load, navigation, start/cancel workout, nutrition entry add/edit/delete, backup export, and absence of horizontal overflow or console errors. Do not modify the data schema. Show me the diff and test results before committing.

## Third prompt — refactor carefully

Use this only after the tests pass and the baseline is committed.

> Propose the smallest safe first extraction from the monolithic index.html. Prefer moving CSS into a versioned stylesheet before moving application logic. Preserve DOM structure, runtime behavior, storage, migrations, service-worker caching, and GitHub Pages relative paths. Implement only one extraction, update the cache safely, run the full tests, and show the diff before committing.

## Release workflow

1. Let Codex work on a feature branch.
2. Review the changed-file list and diff.
3. Run the app locally through HTTP and test it yourself.
4. Have Codex run its tests again.
5. Commit the feature branch.
6. Push the branch and merge only after approval.
7. Confirm the live GitHub Pages build before updating the installed iPhone PWA.
