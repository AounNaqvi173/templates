export const colors = {
  brightTeal100: '#c1f2f2',
  brightTeal200: '#9de2e2',
  brightTeal300: '#6ED1D1',
  brightTeal400: '#48B8B8',

  darkTeal500: '#1e809e',
  darkTeal600: '#157183',
  darkTeal700: '#105161',
  darkTeal800: '#09414f',
  darkTeal900: '#072829',
  darkTeal950: '#031a1d',

  brightOrange100: '#f2ddc1',
  brightOrange200: '#e2c49d',
  brightOrange300: '#d1a76e',
  brightOrange400: '#b88a48',

  darkOrange500: '#9e661e',
  darkOrange600: '#835515',
  darkOrange700: '#613e10',
  darkOrange800: '#4f3109',
  darkOrange900: '#291c07',
  darkOrange950: '#1d1303',

  slate10: '#fcfcff',
  slate50: '#f9f9fb',
  slate100: '#e0e0e6',
  slate200: '#d0d0d8',
  slate300: '#c0c0c9',
  slate400: '#b0b0ba',
  slate500: '#9696a4',
  slate600: '#7c7c93',
  slate700: '#636375',
  slate800: '#4a4a5b',
  slate900: '#353545',
  slate950: '#202029',
  slate990: '#121217',

  stone10: '#fdfcfb',
  stone50: '#faf8f6',
  stone100: '#e5e2df',
  stone200: '#d5d1cd',
  stone300: '#c5c0bc',
  stone400: '#b5afaa',
  stone500: '#9a9490',
  stone600: '#827c77',
  stone700: '#6a6460',
  stone800: '#524d49',
  stone900: '#3d3936',
  stone950: '#272421',
  stone990: '#161413',

  negative50: '#ffe5e5',
  negative100: '#f0d1d1',
  negative200: '#dea0a0',
  negative400: '#b30000',
  negative500: '#800000',
  negative900: '#330000',
  negative950: '#1a0000',

  positive50: '#effae7',
  positive100: '#e2f6d3',
  positive400: '#427b18',
  positive500: '#305911',
  positive900: '#0f1b05',
  positive950: '#070e03',

  // Non-semantic colors
  blue300: '#6aa7f1',
  blue700: '#1d4ed8',
  purple600: '#544171',
  maroon600: '#714148',
  steel600: '#415171',
  forest600: '#456138',
  sunshine200: '#f5be0a',
} as const;

const fontSizes = {
  xxlarge: {
    fontSize: 32,
    lineHeight: 32,
  },
  xlarge: {
    fontSize: 24,
    lineHeight: 30,
  },
  large: {
    fontSize: 18,
    lineHeight: 25,
  },
  medium: {
    fontSize: 16,
    lineHeight: 20,
  },
  small: {
    fontSize: 14,
    lineHeight: 18,
  },
  xsmall: {
    fontSize: 12,
    lineHeight: 15,
  },
} as const;

const baseTheme = {
  colors: {
    transparent: 'transparent',

    // Non-semantic colors
    white: colors.stone10,
    black: colors.stone900,
    purple: colors.purple600,
    maroon: colors.maroon600,
    steel: colors.steel600,
    forest: colors.forest600,
    sunshine: colors.sunshine200,
    red: colors.negative500,
    green: colors.positive500,
    blue: colors.blue700,
  },
  borderRadius: {
    xsmall: 4,
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
    xxlarge: 32,
    full: 999,
  },
  fontSizes,
  spacing: {
    xxsmall: 2,
    xsmall: 4,
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
    xxlarge: 32,
  },
  textVariants: {
    heading1: {
      ...fontSizes.xxlarge,
      fontWeight: '900',
      letterSpacing: -1,
    },
    heading2: {
      ...fontSizes.xlarge,
      fontWeight: '800',
    },
    heading3: {
      ...fontSizes.large,
      fontWeight: '700',
    },
    body1: {
      ...fontSizes.medium,
      fontWeight: '400',
    },
    body2: {
      ...fontSizes.small,
      fontWeight: '400',
    },
    body3: {
      ...fontSizes.xsmall,
      fontWeight: '400',
    },
  },
};

export const lightTealTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    interactivePrimary: colors.brightTeal200,
    interactivePrimaryPress: colors.brightTeal300,
    interactivePrimaryContent: colors.darkTeal900,
    interactivePrimaryContentPress: colors.darkTeal950,

    interactiveSecondary: colors.brightTeal100,
    interactiveSecondaryPress: colors.brightTeal200,
    interactiveSecondaryContent: colors.darkTeal800,
    interactiveSecondaryContentPress: colors.darkTeal900,

    interactiveNeutral: colors.slate100,
    interactiveNeutralPress: colors.slate200,
    interactiveNeutralContent: colors.slate900,
    interactiveNeutralContentPress: colors.slate990,

    interactiveNeutralSecondary: colors.slate10,
    interactiveNeutralSecondaryPress: colors.slate200,

    interactiveNeutralReversed: colors.slate990,
    interactiveNeutralReversedPress: colors.slate900,
    interactiveNeutralReversedContent: colors.slate50,
    interactiveNeutralReversedContentPress: colors.slate10,

    backgroundScreen: colors.slate100,
    backgroundScreenSecondary: colors.slate10,
    backgroundElevated: colors.slate10,
    backgroundNeutral: `${colors.slate950}15`,
    backgroundOverlay: `${colors.slate950}80`,

    baseLight: colors.slate10,
    baseDark: colors.slate990,

    borderNeutral: `${colors.slate950}10`,
    borderNeutralSecondary: `${colors.slate950}30`,

    contentPrimary: colors.slate990,
    contentSecondary: colors.slate900,
    contentTertiary: colors.slate700,
    contentAccent: colors.darkTeal800,

    // Semantic colors
    informativePrimary: colors.blue700,

    sentimentNegative: colors.negative400,
    sentimentNegativePress: colors.negative500,

    sentimentSecondaryNegative: colors.negative50,
    sentimentSecondaryNegativePress: colors.negative100,

    sentimentPositive: colors.positive400,
    sentimentPositivePress: colors.positive500,

    sentimentSecondaryPositive: colors.positive50,
    sentimentSecondaryPositivePress: colors.positive100,
  },
} as const;

export const darkTealTheme = {
  ...lightTealTheme,
  colors: {
    ...lightTealTheme.colors,

    interactivePrimary: colors.brightTeal300,
    interactivePrimaryPress: colors.brightTeal200,
    interactivePrimaryContent: colors.darkTeal900,
    interactivePrimaryContentPress: colors.darkTeal800,

    interactiveSecondary: colors.darkTeal800,
    interactiveSecondaryPress: colors.darkTeal600,
    interactiveSecondaryContent: colors.brightTeal300,
    interactiveSecondaryContentPress: colors.brightTeal100,

    interactiveNeutral: colors.slate900,
    interactiveNeutralPress: colors.slate800,
    interactiveNeutralContent: colors.slate100,
    interactiveNeutralContentPress: colors.slate50,

    interactiveNeutralSecondary: colors.slate950,
    interactiveNeutralSecondaryPress: colors.slate900,

    interactiveNeutralReversed: colors.slate10,
    interactiveNeutralReversedPress: colors.slate100,
    interactiveNeutralReversedContent: colors.slate900,
    interactiveNeutralReversedContentPress: colors.slate990,

    backgroundScreen: colors.slate990,
    backgroundScreenSecondary: colors.slate950,
    backgroundElevated: `${colors.slate950}`,
    backgroundNeutral: `${colors.slate200}15`,
    backgroundOverlay: `${colors.slate100}80`,

    borderNeutral: `${colors.slate10}10`,
    borderNeutralSecondary: `${colors.slate10}30`,

    contentPrimary: colors.slate10,
    contentSecondary: colors.slate100,
    contentTertiary: colors.slate200,
    contentAccent: colors.brightTeal200,

    // Semantic colors
    informativePrimary: colors.blue300,

    sentimentNegative: colors.negative200,
    sentimentNegativePress: colors.negative100,

    sentimentSecondaryNegative: colors.negative950,
    sentimentSecondaryNegativePress: colors.negative900,

    sentimentPositive: colors.positive400,
    sentimentPositivePress: colors.positive500,

    sentimentSecondaryPositive: colors.positive950,
    sentimentSecondaryPositivePress: colors.positive900,
  },
} as const;

export const lightOrangeTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    interactivePrimary: colors.brightOrange200,
    interactivePrimaryPress: colors.brightOrange300,
    interactivePrimaryContent: colors.darkOrange900,
    interactivePrimaryContentPress: colors.darkOrange950,

    interactiveSecondary: colors.brightOrange100,
    interactiveSecondaryPress: colors.brightOrange200,
    interactiveSecondaryContent: colors.darkOrange800,
    interactiveSecondaryContentPress: colors.darkOrange900,

    interactiveNeutral: colors.stone100,
    interactiveNeutralPress: colors.stone200,
    interactiveNeutralContent: colors.stone900,
    interactiveNeutralContentPress: colors.stone990,

    interactiveNeutralSecondary: colors.stone10,
    interactiveNeutralSecondaryPress: colors.stone200,

    interactiveNeutralReversed: colors.stone990,
    interactiveNeutralReversedPress: colors.stone900,
    interactiveNeutralReversedContent: colors.stone50,
    interactiveNeutralReversedContentPress: colors.stone10,

    backgroundScreen: colors.stone100,
    backgroundScreenSecondary: colors.stone10,
    backgroundElevated: colors.stone10,
    backgroundNeutral: `${colors.stone950}15`,
    backgroundOverlay: `${colors.stone950}80`,

    baseLight: colors.stone10,
    baseDark: colors.stone990,

    borderNeutral: `${colors.stone950}10`,
    borderNeutralSecondary: `${colors.stone950}30`,

    contentPrimary: colors.stone990,
    contentSecondary: colors.stone900,
    contentTertiary: colors.stone700,
    contentAccent: colors.darkOrange800,

    // Semantic colors
    informativePrimary: colors.blue300,

    sentimentNegative: colors.negative400,
    sentimentNegativePress: colors.negative500,

    sentimentSecondaryNegative: colors.negative50,
    sentimentSecondaryNegativePress: colors.negative100,

    sentimentPositive: colors.positive400,
    sentimentPositivePress: colors.positive500,

    sentimentSecondaryPositive: colors.positive50,
    sentimentSecondaryPositivePress: colors.positive100,
  },
} as const;

export const darkOrangeTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,

    interactivePrimary: colors.brightOrange300,
    interactivePrimaryPress: colors.brightOrange200,
    interactivePrimaryContent: colors.darkOrange900,
    interactivePrimaryContentPress: colors.darkOrange800,

    interactiveSecondary: colors.darkOrange800,
    interactiveSecondaryPress: colors.darkOrange600,
    interactiveSecondaryContent: colors.brightOrange300,
    interactiveSecondaryContentPress: colors.brightOrange100,

    interactiveNeutral: colors.stone900,
    interactiveNeutralPress: colors.stone800,
    interactiveNeutralContent: colors.stone100,
    interactiveNeutralContentPress: colors.stone50,

    interactiveNeutralSecondary: colors.stone950,
    interactiveNeutralSecondaryPress: colors.stone900,

    interactiveNeutralReversed: colors.stone10,
    interactiveNeutralReversedPress: colors.stone100,
    interactiveNeutralReversedContent: colors.stone900,
    interactiveNeutralReversedContentPress: colors.stone990,

    backgroundScreen: colors.stone990,
    backgroundScreenSecondary: colors.stone950,
    backgroundElevated: `${colors.stone950}`,
    backgroundNeutral: `${colors.stone200}15`,
    backgroundOverlay: `${colors.stone100}80`,

    baseLight: colors.stone10,
    baseDark: colors.stone990,

    borderNeutral: `${colors.stone10}10`,
    borderNeutralSecondary: `${colors.stone10}30`,

    contentPrimary: colors.stone10,
    contentSecondary: colors.stone100,
    contentTertiary: colors.stone200,
    contentAccent: colors.brightOrange200,

    // Semantic colors
    informativePrimary: colors.blue300,

    sentimentNegative: colors.negative200,
    sentimentNegativePress: colors.negative100,

    sentimentSecondaryNegative: colors.negative950,
    sentimentSecondaryNegativePress: colors.negative900,

    sentimentPositive: colors.positive400,
    sentimentPositivePress: colors.positive500,

    sentimentSecondaryPositive: colors.positive950,
    sentimentSecondaryPositivePress: colors.positive900,
  },
} as const;

export type Theme =
  | typeof lightTealTheme
  | typeof darkTealTheme
  | typeof lightOrangeTheme
  | typeof darkOrangeTheme;
