import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const applyThemeToDOM = (newTheme) => {
  const root = document.documentElement;
  let nextTheme = newTheme;

  if (typeof newTheme === 'function') {
    const isDarkNow = root.classList.contains('dark');
    nextTheme = newTheme(isDarkNow ? 'dark' : 'light');
  }

  if (nextTheme === 'system') {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemDark) root.classList.add('dark');
    else root.classList.remove('dark');
  } else if (nextTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  try {
    localStorage.setItem('portfolio-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    root.setAttribute('data-theme', nextTheme);
  } catch (e) {}
};

const defaultContextValue = {
  theme: 'dark',
  setTheme: applyThemeToDOM,
  toggleTheme: () => applyThemeToDOM((prev) => (prev === 'dark' ? 'light' : 'dark'))
};

const ThemeContext = createContext(defaultContextValue);

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme') || localStorage.getItem('theme');
      if (saved) return saved;
    } catch (e) {}
    return 'dark';
  });

  const setTheme = useCallback((newTheme) => {
    setThemeState((prevTheme) => {
      const resolvedTheme = typeof newTheme === 'function' ? newTheme(prevTheme) : newTheme;
      applyThemeToDOM(resolvedTheme);
      return resolvedTheme;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context || typeof context.setTheme !== 'function') {
    return defaultContextValue;
  }
  return context;
};

export default ThemeContext;