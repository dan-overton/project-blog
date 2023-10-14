"use client";
import { Moon, Sun } from "react-feather";

import VisuallyHidden from "@/components/VisuallyHidden";
import { DARK_TOKENS, LIGHT_TOKENS, THEME_COOKIE_NAME } from "@/constants";
import Cookies from "js-cookie";
import React from "react";

function ThemeToggle({ className, initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  React.useEffect(() => {
    Cookies.set(THEME_COOKIE_NAME, theme, { expires: 1000, sameSite: "Lax" });
    const html = document.body.parentElement;

    const colors = theme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

    Object.entries(colors).forEach(([key, value]) => {
      html.style.setProperty(key, value);
    });
  }, [theme]);

  return (
    <button
      className={className}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default ThemeToggle;
