interface IBreakpoints {
  vp1: number;
  vp2: number;
  vp3: number;
  vp4: number;
}

export const breakpoints: IBreakpoints = {
  vp1: 400,
  vp2: 768,
  vp3: 1024,
  vp4: 1200
};

export interface IColors {
  foreground: string;
  foregroundSecondary: string;
  background: string;
  theme: string;
  themeSecondary: string;
}

interface IColorThemes {
  light: IColors;
  dark: IColors;
}

export const colorThemes: IColorThemes = {
  light: {
    foreground: "#131313",
    foregroundSecondary: "#000",
    background: "#f1f1f1",
    theme: "rgb(255, 128, 24)",
    themeSecondary: "rgba(255, 128, 24, .8)"
  },
  dark: {
    foreground: "#f1f1f1",
    foregroundSecondary: "#f1f1f1",
    background: "#181818",
    theme: "rgb(248, 168, 113)",
    themeSecondary: "rgba(248, 168, 113, .8)"
  }
};
