import clsx from "clsx";
import { Spline_Sans_Mono, Work_Sans } from "next/font/google";
import { cookies } from "next/headers";

import { DARK_TOKENS, LIGHT_TOKENS, THEME_COOKIE_NAME } from "@/constants";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ReduceMotionContainer from "@/components/ReduceMotionContainer";
import "./styles.css";
const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

function RootLayout({ children }) {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE_NAME);
  const theme = themeCookie?.value || "light";

  return (
    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <ReduceMotionContainer>
          <Header theme={theme} />
          <main>{children}</main>
          <Footer />
        </ReduceMotionContainer>
      </body>
    </html>
  );
}

export default RootLayout;
