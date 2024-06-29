import type { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { telegramUserSchema } from "../constant/styles";

const theme = {
  bgColor: "var(--tg-theme-bg-color)" || "#333",
  textColor: telegramUserSchema.textColor || "#f2f2f2",
};

function StyledThemeProvider({ children }: PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default StyledThemeProvider;
