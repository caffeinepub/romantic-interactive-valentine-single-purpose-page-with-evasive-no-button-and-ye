/**
 * Build a base-path-aware URL for static assets in the public directory.
 * Handles both root (/) and subdirectory deployments correctly.
 * 
 * @param assetPath - Relative path from public root (e.g., "assets/generated/photo.jpg")
 * @returns Full URL that works with the current base path
 */
export function getAssetUrl(assetPath: string): string {
  // Remove leading slash if present to ensure consistent joining
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  
  // Get the base URL from Vite's environment (defaults to '/')
  const base = import.meta.env.BASE_URL || '/';
  
  // Ensure base ends with slash
  const baseWithSlash = base.endsWith('/') ? base : `${base}/`;
  
  // Join base and asset path
  return `${baseWithSlash}${cleanPath}`;
}
