import siteConfigJson from '../config/site.json';
import type { SiteConfig } from '../types/config';

/**
 * Get the site configuration
 * This is a utility to access the configuration with proper typing
 */
export function getSiteConfig(): SiteConfig {
  return siteConfigJson as SiteConfig;
}

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof SiteConfig['gallery']): boolean {
  const config = getSiteConfig();
  return config.gallery[feature] as boolean;
}

/**
 * Get theme configuration
 */
export function getThemeConfig() {
  const config = getSiteConfig();
  return config.theme;
}

/**
 * Get lightbox configuration
 */
export function getLightboxConfig() {
  const config = getSiteConfig();
  return config.lightbox;
}
