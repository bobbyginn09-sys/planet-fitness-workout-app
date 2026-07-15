# NEXSET 3.2.1 Release Checklist

## Before deployment

- [ ] Export a backup from the currently deployed app.
- [ ] Keep a copy of the previous repository version for rollback.
- [x] JavaScript syntax and manifest parsing passed.
- [x] Service-worker asset and cache-scope checks passed.
- [x] Automated mobile smoke suite passed 49 of 49 checks.

## Deploy

- [ ] Replace the repository-root files with the 3.2.1 package.
- [ ] Commit and push to the GitHub Pages branch.
- [ ] Open the site once with `?nexset=3.2.1`.
- [ ] In an installed copy, use **Profile → Backup & restore → Check for update**.
- [ ] Fully close and reopen the Home Screen app.

## Verify on the live device

- [ ] Confirm existing history, settings, body readings, and any unfinished workout are present.
- [ ] Log, edit, delete, and undo a lifting set.
- [ ] Refresh during a rest timer and confirm it resumes from the correct remaining time.
- [ ] Switch between lb and kg and confirm historical values retain the same meaning.
- [ ] Edit and undo-delete a body reading.
- [ ] Confirm the empty Review tab asks for a first workout rather than inventing wins.
- [ ] Confirm offline launch after the first online visit.
- [ ] Export and restore a fresh 3.2.1 backup before clearing any browser data.
