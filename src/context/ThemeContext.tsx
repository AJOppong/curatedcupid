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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = async (newTheme: Theme) => {
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
    <ThemeContext.Provider value={{ theme, setTheme, isLoading }}>
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
