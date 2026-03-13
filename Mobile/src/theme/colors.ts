export const colors = {
  background: "#081120",
  backgroundAlt: "#101A2D",
  backgroundChrome: "#0B1424",
  surface: "#121D33",
  surfaceStrong: "#18243C",
  surfaceMuted: "#0D1525",
  surfaceRaised: "#1A2742",
  border: "#24324D",
  borderStrong: "#324364",
  textPrimary: "#E6EEF8",
  textSecondary: "#A6B4CC",
  textMuted: "#7F8CA4",
  accent: "#33D1C6",
  accentStrong: "#78F5E8",
  accentMuted: "#123D44",
  success: "#1FC16B",
  warning: "#F5A524",
  danger: "#F04452",
  info: "#53A6FF",
  white: "#FFFFFF"
} as const;

export const shadows = {
  card: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8
  },
  glow: {
    shadowColor: "#33D1C6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 0
  }
} as const;
