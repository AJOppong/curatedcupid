"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Theme = "light" | "dark" | "valentine" | "mothers-day" | "fathers-day" | "eid" | "christmas" | "new-year";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  forcedTheme,
}: {
  children: React.ReactNode;
  forcedTheme?: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(forcedTheme ?? "light");
  const [isLoading, setIsLoading] = useState(!forcedTheme);

  useEffect(() => {
    // If a forcedTheme is passed (e.g. admin always dark), skip DB fetch
    if (forcedTheme) {
      document.documentElement.setAttribute("data-theme", forcedTheme);
      return;
    }

    async function loadTheme() {
      try {
        const { data, error } = await supabase
          .from("settings")
          .select("value")
          .eq("key", "active_theme")
          .single();

        if (data && !error) {
          setThemeState(data.value as Theme);
        }
      } catch (err) {
        console.error("Error loading theme:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadTheme();
  }, [forcedTheme]);

  useEffect(() => {
    // If forced, always keep that theme applied
    const active = forcedTheme ?? theme;
    document.documentElement.setAttribute("data-theme", active);
  }, [theme, forcedTheme]);

  const setTheme = async (newTheme: Theme) => {
    if (forcedTheme) return; // ignore changes when forced
    setThemeState(newTheme);
    try {
      await supabase
        .from("settings")
        .upsert({ key: "active_theme", value: newTheme });
    } catch (err) {
      console.error("Error saving theme:", err);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: forcedTheme ?? theme, setTheme, isLoading }}>
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
