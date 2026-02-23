import { useCallback, useState } from "react";

const STORAGE_KEY = "blog-theme";

type BlogTheme = "dark" | "light";

function readStoredTheme(): BlogTheme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" ? "light" : "dark";
}

export function useBlogTheme(): [BlogTheme, (theme: BlogTheme) => void] {
  const [theme, setThemeState] = useState<BlogTheme>(readStoredTheme);

  const setTheme = useCallback((next: BlogTheme) => {
    setThemeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return [theme, setTheme];
}
