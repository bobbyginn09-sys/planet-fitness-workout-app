# Deploy checklist — NEXSET 3.4.9

1. Back up the current repository/build.
2. Replace the patched files with the 3.4.9 files from this package.
3. Deploy to GitHub Pages.
4. In the installed iPhone app, use Check for update → Update now.
5. Fully close and reopen NEXSET. If the old layout remains, remove and reinstall the PWA once to clear the previous service worker.
6. Confirm:
   - Weight and Reps appear as two compact full-width rows.
   - 140 lb is fully visible.
   - 8, 10, 12, and 15 reps are fully visible.
   - Both minus and plus buttons remain entirely inside the card.
   - Logging the final incline walk opens the completed-workout/share screen.
