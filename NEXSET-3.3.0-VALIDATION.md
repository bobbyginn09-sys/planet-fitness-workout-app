# NEXSET 3.3.0 validation report

- Generated: `2026-07-15T16:46:00.831736+00:00`
- Release gate: **REVIEW**
- Static validation: **UNKNOWN**
- Browser audit: **SKIP**
- Package SHA-256: `ef1865f17a12bb1b8f7bef84b9f5208f67de8b4dc264dc92a335f53bb76050b0`

## Release-gate notes

- static checks: UNKNOWN
- browser automation unavailable or incomplete
- missing feature evidence: Add or remove exercises, Exercise replacement, Quick workouts, Reorder exercises, Skip and revisit, Workout templates

## Feature evidence

| Capability | Result | Evidence patterns |
|---|---:|---|
| Quick workouts | Not detected | `—` |
| Exercise replacement | Not detected | `—` |
| Skip and revisit | Not detected | `—` |
| Editable routine | Not detected | `—` |
| Add or remove exercises | Not detected | `—` |
| Reorder exercises | Not detected | `—` |
| Workout templates | Not detected | `—` |
| Equipment setup memory | Present | `seat position` |
| Exercise-specific instructions | Present | `setup, breathing` |
| Workout completion summary | Present | `workout complete, total volume, personal record|\bPR\b` |

## Browser summary

No browser summary was produced.

## Live deployment comparison

The live/local hash comparison was not available.

## Static-check details

```text
NEXSET 3.3 workspace audit
Generated: 2026-07-15T16:43:39Z

Top-level workspace:
2026-07-15T16:43:39.2862674090Z	f	nexset-3.3-workspace-audit.txt
2026-07-15T16:41:29.3551451710Z	f	test_output.txt
2026-07-15T16:41:28.9626767170Z	f	planet-fitness-workout-app-main 2(3).zip
2026-07-15T16:41:28.9487765180Z	f	NEXSET-3.2.1-RELEASE-NOTES.md
2026-07-15T16:41:28.8488111630Z	f	NEXSET-3.2.1-reliability-update.zip
2026-07-15T16:41:21.8432833460Z	d	planet-fitness-workout-app-3.2.1

Selected source: /mnt/data/.nexset-321-extracted/planet-fitness-workout-app-3.2.1
Source files:
ATLAS_BRAND_GUIDE.md	1364 bytes
NEXSET_BRAND_GUIDE.md	1364 bytes
PHASE_1_FIXES.md	1363 bytes
PHASE_2_POLISH.md	816 bytes
README.md	3235 bytes
README.txt	1728 bytes
RELEASE_CHECKLIST_3.2.0.md	555 bytes
RELEASE_CHECKLIST_3.2.1.md	1281 bytes
RELEASE_NOTES_3.1.0.md	973 bytes
RELEASE_NOTES_3.1.1.md	973 bytes
RELEASE_NOTES_3.1.2.md	622 bytes
RELEASE_NOTES_3.1.3.md	586 bytes
RELEASE_NOTES_3.1.4.md	338 bytes
RELEASE_NOTES_3.1.5.md	579 bytes
RELEASE_NOTES_3.1.6.md	583 bytes
RELEASE_NOTES_3.1.7.md	376 bytes
RELEASE_NOTES_3.2.0.md	625 bytes
RELEASE_NOTES_3.2.1.md	2170 bytes
SHA256SUMS.txt	5810 bytes
VALIDATION.md	2340 bytes
VALIDATION_RESULTS_3.2.1.json	5416 bytes
apple-touch-icon.png	15324 bytes
atlas-app-icon.svg	1648 bytes
atlas-brand-concept.png	175337 bytes
atlas-mark-1024.png	140997 bytes
atlas-mark.svg	1165 bytes
atlas-wordmark.png	20944 bytes
atlas-wordmark.svg	1281 bytes
extracted.js	150984 bytes
icon-1024.png	140997 bytes
icon-192.png	16806 bytes
icon-512.png	58847 bytes
index.html	260862 bytes
launch-1125x2436.png	154803 bytes
launch-1170x2532.png	163367 bytes
launch-1179x2556.png	165183 bytes
launch-1290x2796.png	180351 bytes
manifest.json	814 bytes
manifest.webmanifest	814 bytes
muscle-legs-a-v315.png	193359 bytes
muscle-legs-a-v316.png	193359 bytes
muscle-legs-a.png	193359 bytes
muscle-legs-b-v315.png	189445 bytes
muscle-legs-b-v316.png	189445 bytes
muscle-legs-b.png	189445 bytes
muscle-legs.png	193359 bytes
muscle-pull-v315.png	232458 bytes
muscle-pull-v316.png	231050 bytes
muscle-pull.png	232458 bytes
muscle-push-v315.png	238460 bytes
muscle-push-v316.png	237550 bytes
muscle-push.png	238460 bytes
muscle-recovery-v315.png	194649 bytes
muscle-recovery-v316.png	117686 bytes
muscle-recovery.png	194649 bytes
muscle-upper-v315.png	242411 bytes
muscle-upper-v316.png	241547 bytes
muscle-upper.png	242411 bytes
nexset-icon.svg	1648 bytes
nexset-lockup-v315.svg	1375 bytes
nexset-lockup-v316.svg	1371 bytes
nexset-lockup-v317.svg	1371 bytes
nexset-lockup.svg	1065 bytes
nexset-mark.svg	1165 bytes
nexset-strength-figure.svg	2093 bytes
nexset-wordmark.svg	1281 bytes
service-worker.js	1945 bytes

```

## Scope and limitations

- Static pattern detection confirms that implementation text and controls are present; it does not by itself prove every branch of behavior.
- Browser results are authoritative only for the viewports and flows recorded in the JSON report.
- A final deployment smoke test is still required after GitHub Pages publishes the complete root bundle.
