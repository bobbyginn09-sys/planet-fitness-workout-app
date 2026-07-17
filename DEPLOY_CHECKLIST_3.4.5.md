# Deploy checklist — NEXSET 3.4.5

1. Back up the current repo / build.
2. Replace the patched files with the 3.4.5 versions from this package.
3. Hard refresh / reinstall the PWA or clear the service worker cache.
4. Verify on iPhone:
   - 130 and 140 fit in the weight block
   - treadmill screen does not overflow horizontally
   - reps values like 10, 12, and 15 show fully in the reps block
   - cardio logs correctly
