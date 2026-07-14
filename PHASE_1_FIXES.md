# NEXSET 2.2.0 — Phase One Fixes

## Resolved

- Restored the missing `icons/` directory used by the manifest and iOS Home Screen metadata.
- Restored the missing `splash/` directory used by iPhone startup images.
- Corrected the favicon declaration so the SVG favicon points to an actual SVG file.
- Changed visible in-app NEXSET marks to `nexset-mark.svg`, preventing the broken-image question-mark tile when an app icon is unavailable.
- Updated visible and manifest version references to `2.2.0`.
- Rebuilt service-worker caching with a new cache version, explicit app-shell assets, old-cache cleanup, and a dedicated offline navigation fallback.
- Added `.nojekyll` for predictable GitHub Pages asset delivery.
- Added a GitHub Pages Actions workflow that deploys the entire repository, including nested asset folders.

## Deploy

1. Export a backup from **More → Backup & restore**.
2. Upload or commit all files and folders in this package to the existing repository.
3. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the source.
4. After deployment, open the site once with `?nexset=3.1.0` appended.
5. Use **More → Backup & restore → Refresh app cache**, then fully close and reopen NEXSET.
6. If the iPhone Home Screen icon remains stale, remove and re-add the Home Screen shortcut after confirming the backup is saved.
