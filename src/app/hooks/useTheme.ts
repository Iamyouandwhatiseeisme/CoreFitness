import { cilSun, cilMoon, cilScreenDesktop } from "@coreui/icons";

export interface ThemeOption {
  label: string;
  icon: string[];
}

export default function useTheme() {
  const themeOptions: ThemeOption[] = [
    {
      label: "light",
      icon: cilSun,
    },
    {
      label: "dark",
      icon: cilMoon,
    },
    {
      label: "system",
      icon: cilScreenDesktop,
    },
  ];

  return { themeOptions };
}
