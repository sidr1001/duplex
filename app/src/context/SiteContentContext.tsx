import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultSiteContent } from '@/content/siteContent';
import type { SiteContent } from '@/content/siteContent';

interface SiteContentContextValue {
  content: SiteContent;
  loading: boolean;
  updateContent: (next: SiteContent) => Promise<boolean>;
  resetContent: () => Promise<boolean>;
}

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);

function mergeWithDefaults(parsed: Partial<SiteContent>): SiteContent {
  return {
    ...defaultSiteContent,
    ...parsed,
    contacts: { ...defaultSiteContent.contacts, ...parsed.contacts },
    hero: { ...defaultSiteContent.hero, ...parsed.hero },
    seo: { ...defaultSiteContent.seo, ...parsed.seo },
    admin: { ...defaultSiteContent.admin, ...parsed.admin },
    socials: { ...defaultSiteContent.socials, ...parsed.socials },
    sections: { ...defaultSiteContent.sections, ...parsed.sections },
    footer: { ...defaultSiteContent.footer, ...parsed.footer, footerLinks: parsed.footer?.footerLinks ?? defaultSiteContent.footer.footerLinks },
    ready: { ...defaultSiteContent.ready, ...parsed.ready, duplexes: parsed.ready?.duplexes ?? defaultSiteContent.ready.duplexes },
    construction: { ...defaultSiteContent.construction, ...parsed.construction, duplexes: parsed.construction?.duplexes ?? defaultSiteContent.construction.duplexes },
    map: {
      ...defaultSiteContent.map,
      ...parsed.map,
      objects: parsed.map?.objects ?? defaultSiteContent.map.objects
    }
  };
}

async function fetchSharedContent() {
  const response = await fetch('/api/get-content.php', { method: 'GET' });
  if (!response.ok) return null;
  const data = await response.json();
  return data?.content ?? null;
}

async function saveSharedContent(content: SiteContent | null) {
  const response = await fetch('/api/save-content.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ content })
  });

  return response.ok;
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const sharedContent = await fetchSharedContent();
        if (sharedContent) {
          setContent(mergeWithDefaults(sharedContent));
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateContent = async (next: SiteContent) => {
    const ok = await saveSharedContent(next);
    if (ok) {
      setContent(next);
    }
    return ok;
  };

  const resetContent = async () => {
    const ok = await saveSharedContent(defaultSiteContent);
    if (ok) {
      setContent(defaultSiteContent);
    }
    return ok;
  };

  const value = useMemo(() => ({ content, loading, updateContent, resetContent }), [content, loading]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within SiteContentProvider');
  }
  return context;
}
