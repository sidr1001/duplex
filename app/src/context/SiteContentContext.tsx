import { createContext, useContext, useMemo, useState } from 'react';
import { defaultSiteContent } from '@/content/siteContent';
import type { SiteContent } from '@/content/siteContent';

const STORAGE_KEY = 'duplex-site-content';

interface SiteContentContextValue {
  content: SiteContent;
  updateContent: (next: SiteContent) => void;
  resetContent: () => void;
}

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);

function getInitialContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSiteContent;
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return {
      ...defaultSiteContent,
      ...parsed,
      contacts: { ...defaultSiteContent.contacts, ...parsed.contacts },
      hero: { ...defaultSiteContent.hero, ...parsed.hero },
      seo: { ...defaultSiteContent.seo, ...parsed.seo },
      ready: { ...defaultSiteContent.ready, ...parsed.ready, duplexes: parsed.ready?.duplexes ?? defaultSiteContent.ready.duplexes },
      construction: { ...defaultSiteContent.construction, ...parsed.construction, duplexes: parsed.construction?.duplexes ?? defaultSiteContent.construction.duplexes },
      map: {
        ...defaultSiteContent.map,
        ...parsed.map,
        objects: parsed.map?.objects ?? defaultSiteContent.map.objects
      }
    };
  } catch {
    return defaultSiteContent;
  }
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(getInitialContent);

  const updateContent = (next: SiteContent) => {
    setContent(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const resetContent = () => {
    setContent(defaultSiteContent);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({ content, updateContent, resetContent }), [content]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within SiteContentProvider');
  }
  return context;
}
