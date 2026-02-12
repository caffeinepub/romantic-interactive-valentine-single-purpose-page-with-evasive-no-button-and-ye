# Specification

## Summary
**Goal:** Replace the two inline celebration photos with the newly uploaded images and prevent transient image load/decode issues from showing the inline fallback error.

**Planned changes:**
- Overwrite the existing static assets `frontend/public/assets/generated/valentine-photo-1.jpg` and `frontend/public/assets/generated/valentine-photo-2.jpg` with the newly uploaded images while keeping the exact same filenames/paths.
- Ensure the inline celebration view references both images using base-path-aware URLs (e.g., `getAssetUrl(...)`) and continues to render them inline stacked vertically above the celebration text (no fullscreen/lightbox behavior).
- Update the `CelebrationPhoto` component to automatically retry image loading on transient failures before showing the existing fallback text, without changing any user-facing copy.

**User-visible outcome:** After clicking YES, both celebration photos display inline (stacked vertically) above the celebration text on mobile/iPad Safari and Chrome without showing “Photo could not be loaded” due to transient loading issues.
