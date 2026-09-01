# NEXSET behavior baseline tests

These dependency-free browser tests exercise the unchanged NEXSET app through its real UI, localStorage, IndexedDB, backup files, and startup migrations.

All fixtures are fictional and are created in code. The test suite never reads a private NEXSET export.

## Run locally

From the repository root, start any static HTTP server. For example:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/tests/behavior-baseline.html
```

The suite runs automatically. It refuses to run anywhere except `http://127.0.0.1` or `http://localhost`, uses that local browser origin only, and clears its fictional localStorage and IndexedDB records when it finishes. The hidden app frame follows the browser viewport so the same suite can be run at both supported iPhone sizes.

Expected failures document current data-safety risks without changing the running app. An unexpected failure means existing behavior changed or the harness could not complete. An unexpected pass means a documented risk may have been fixed and the test should be reclassified.
