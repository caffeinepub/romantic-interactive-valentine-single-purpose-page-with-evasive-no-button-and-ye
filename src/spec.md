# Specification

## Summary
**Goal:** Fix celebration-state inline photo rendering so the two existing static images reliably load after clicking YES across devices and base paths.

**Planned changes:**
- Update celebration photo `src` construction to work correctly when the app is served from `/` or from a non-root base path (without renaming files or changing inline layout).
- Improve the `CelebrationPhoto` component state handling so it resets error/loading when `src` changes or on remount, preventing it from getting stuck on the fallback.
- Keep photos inline (stacked vertically above the existing celebration text) and preserve current fade-in styling while removing erroneous fallback display when assets are reachable.

**User-visible outcome:** After clicking YES, both celebration photos render inline above the celebration message on desktop and mobile/iPad Safari/Chrome, without showing “Photo could not be loaded” when the assets exist.
