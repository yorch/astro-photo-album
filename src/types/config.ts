export interface SiteConfig {
  analytics: {
    plausibleScriptUrl: string;
    plausibleDomain: string;
    enableOutboundLinks: boolean;
    enableFileDownloads: boolean;
  };
  site: {
    title: string;
    description: string;
    author: string;
  };
  homepage: {
    title: string;
    subtitle: string;
  };
  footer: {
    enabled: boolean;
    text: string;
    links: FooterLink[];
    social: SocialLink[];
  };
  gallery: {
    defaultLayout: 'masonry' | 'grid' | 'list';
    enableDownload: boolean;
    enableExif: boolean;
    enableKeyboardNavigation: boolean;
    enableTags: boolean;
    enableZoom: boolean;
  };
  theme: {
    defaultTheme: 'light' | 'dark' | 'auto';
    enableThemeSwitcher: boolean;
  };
}

export interface FooterLink {
  text: string;
  url: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
