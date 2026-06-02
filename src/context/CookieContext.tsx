"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

type CookieContextValue = {
  preferences: CookiePreferences | null;
  bannerVisible: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: Omit<CookiePreferences, "necessary">) => void;
  openSettings: () => void;
};

const STORAGE_KEY = "wfep-cookie-preferences";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CookieContext = createContext<CookieContextValue | null>(null);

function loadPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePreferences;
  } catch {
    return null;
  }
}

function persistPreferences(prefs: CookiePreferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function CookieProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = loadPreferences();
    if (stored) {
      setPreferences(stored);
      setBannerVisible(false);
    } else {
      setBannerVisible(true);
    }
  }, []);

  const save = useCallback((prefs: CookiePreferences) => {
    persistPreferences(prefs);
    setPreferences(prefs);
    setBannerVisible(false);
    setSettingsOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    save({ necessary: true, analytics: true, marketing: true });
  }, [save]);

  const rejectNonEssential = useCallback(() => {
    save(defaultPreferences);
  }, [save]);

  const savePreferences = useCallback(
    (partial: Omit<CookiePreferences, "necessary">) => {
      save({ necessary: true, ...partial });
    },
    [save],
  );

  const openSettings = useCallback(() => {
    setSettingsOpen(true);
    setBannerVisible(true);
  }, []);

  return (
    <CookieContext.Provider
      value={{
        preferences,
        bannerVisible: bannerVisible || settingsOpen,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        openSettings,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookies() {
  const ctx = useContext(CookieContext);
  if (!ctx) throw new Error("useCookies must be used within CookieProvider");
  return ctx;
}
