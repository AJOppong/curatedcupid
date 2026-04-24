"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { usePathname } from "next/navigation";

export interface ThemeRecord {
  id: string;
  name: string;
  type: string;
  colors: Record<string, string>;
  fonts: Record<string, string>;
  background_image?: string;
  default_items?: any;
  hero_text: {
    title: string;
    desc: string;
    accent: string;
  };
  is_active: boolean;
  is_default: boolean;
  priority: number;
  start_date?: string;
  end_date?: string;
}

interface ThemeContextType {
  activeTheme: ThemeRecord | null;
  allThemes: ThemeRecord[];
  isLoading: boolean;
  refreshThemes: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const FALLBACK_THEME: ThemeRecord = {
  id: "fallback",
  name: "light",
  type: "default",
  colors: {
    background: "#FDF6F7",
    surface: "rgba(255, 255, 255, 0.85)",
    primary: "#C9748A",
    primaryLight: "#E8AABB",
    primaryGlow: "rgba(201, 116, 138, 0.15)",
    secondary: "#B5838D",
    textMain: "#4A2030",
    textMuted: "#9E7382",
    border: "rgba(201, 116, 138, 0.15)",
    glassBg: "rgba(255, 255, 255, 0.75)",
    glassBorder: "rgba(201, 116, 138, 0.12)",
    heroBg: "radial-gradient(ellipse at top left, #FCE8ED 0%, #FDF6F7 45%, #FEF0F3 100%)"
  },
  fonts: {
    heading: "var(--font-playfair)",
    body: "var(--font-montserrat)",
    accent: "var(--font-great-vibes)"
  },
  hero_text: {
    title: "Romantic Gestures",
    desc: "Transform ordinary moments into unforgettable memories. Experience the art of gifting with Curated Cupid.",
    accent: "unforgettable"
  },
  is_active: true,
  is_default: true,
  priority: 0
};

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  const [allThemes, setAllThemes] = useState<ThemeRecord[]>([]);
  const [activeTheme, setActiveTheme] = useState<ThemeRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadThemes = async () => {
    try {
      const { data, error } = await supabase.from("themes").select("*");
      if (error) throw error;
      
      const themes = data as ThemeRecord[];
      setAllThemes(themes);

      // Resolution Logic
      if (isAdminRoute) {
        const darkTheme = themes.find(t => t.name === "dark");
        setActiveTheme(darkTheme || FALLBACK_THEME);
        return;
      }

      // Check scheduled themes first (if start_date <= now <= end_date)
      const now = new Date();
      const scheduledThemes = themes.filter(t => {
        if (!t.start_date || !t.end_date) return false;
        const start = new Date(t.start_date);
        const end = new Date(t.end_date);
        return t.is_active && now >= start && now <= end;
      }).sort((a, b) => b.priority - a.priority);

      if (scheduledThemes.length > 0) {
        setActiveTheme(scheduledThemes[0]);
        return;
      }

      // Check manually active themes
      const activeThemes = themes.filter(t => t.is_active).sort((a, b) => b.priority - a.priority);
      if (activeThemes.length > 0) {
        setActiveTheme(activeThemes[0]);
        return;
      }

      // Fallback to default
      const defaultTheme = themes.find(t => t.is_default);
      setActiveTheme(defaultTheme || FALLBACK_THEME);

    } catch (err) {
      console.error("Error loading themes:", err);
      setActiveTheme(FALLBACK_THEME);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadThemes();
  }, [isAdminRoute]);

  // Inject CSS Variables dynamically
  useEffect(() => {
    const themeToApply = activeTheme || FALLBACK_THEME;
    const root = document.documentElement;
    
    // Create or find dynamic style tag
    let styleEl = document.getElementById("dynamic-theme-styles");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "dynamic-theme-styles";
      document.head.appendChild(styleEl);
    }

    const { colors, fonts } = themeToApply;
    
    const cssVars = `
      :root {
        --background: ${colors.background};
        --foreground: ${colors.foreground || colors.textMain};
        --surface: ${colors.surface};
        --primary: ${colors.primary};
        --primary-light: ${colors.primaryLight};
        --primary-glow: ${colors.primaryGlow};
        --secondary: ${colors.secondary};
        --text-main: ${colors.textMain};
        --text-muted: ${colors.textMuted};
        --border: ${colors.border};
        --glass-bg: ${colors.glassBg};
        --glass-border: ${colors.glassBorder};
        --hero-bg: ${colors.heroBg};
        ${fonts.heading ? `--font-heading: ${fonts.heading};` : ''}
        ${fonts.body ? `--font-body: ${fonts.body};` : ''}
        ${fonts.accent ? `--font-accent: ${fonts.accent};` : ''}
      }
    `;
    
    styleEl.innerHTML = cssVars;
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme: activeTheme || FALLBACK_THEME, allThemes, isLoading, refreshThemes: loadThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
