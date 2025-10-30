export const colors = {
  brightTeal100: '#bdf0f0',
  brightTeal200: '#9de2e2',
  brightTeal300: '#6ED1D1',
  brightTeal400: '#48B8B8',

  darkGreen500: '#1e809e',
  darkGreen600: '#157183',
  darkGreen700: '#105161',
  darkGreen800: '#09414f',
  darkGreen900: '#072829',
  darkGreen950: '#031a1d',

  brightOrange100: '#fecea5',
  brightOrange200: '#fdbb82',
  brightOrange300: '#fca85e',

  darkPurple800: '#390f47',
  darkPurple900: '#210729',

  brightPink100: '#FFD7EF',
  brightPink200: '#ffb4e1',
  brightPink300: '#ff96d5',

  darkMaroon800: '#420909',
  darkMaroon900: '#320707',

  brightYellow: '#FFEB69',
  darkGold: '#3A341C',

  neutral10: '#fcfcff',
  neutral50: '#f9f9fb',
  neutral100: '#e0e0e6',
  neutral200: '#d0d0d8',
  neutral300: '#c0c0c9',
  neutral400: '#b0b0ba',
  neutral500: '#9696a4',
  neutral600: '#7c7c93',
  neutral700: '#636375',
  neutral800: '#4a4a5b',
  neutral900: '#353545',
  neutral950: '#202029',
  neutral990: '#121217',

  // neutral50: '#f9f9f7',
  // neutral100: '#dfdfd4',
  // neutral200: '#cfcfc4',
  // neutral300: '#bfbfb4',
  // neutral400: '#afafa4',
  // neutral500: '#95948f',
  // neutral600: '#7b7b76',
  // neutral700: '#62625d',
  // neutral800: '#494944',
  // neutral900: '#30302b',
  // neutral950: '#262623',
  // neutral990: '#111110',

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

  stone50: '#fafaf9',
  stone100: '#f5f5f4',
  stone150: '#f0efec',
  stone200: '#e7e5e4',
  stone300: '#d6d3d1',
  stone400: '#beb9b6',
  stone500: '#837b75',
  stone600: '#57534e',
  stone700: '#44403c',
  stone800: '#292524',
  stone900: '#1c1917',
  stone950: '#110e0c',

  teal150: '#d4edf0',
  teal300: '#a3d6da',
  teal400: '#6bbbc4',
  teal500: '#048391',
  teal600: '#007884',
  teal700: '#006771',
  teal800: '#004247',
  teal900: '#00282c',

  // Semantic colors
  green150: '#d2f2dd',
  green300: '#86efac',
  green500: '#22c55e',
  green700: '#15803d',
  green800: '#166534',

  red150: '#f0dada',
  red300: '#d19a9a',
  red500: '#c44e4e',
  red700: '#9b3535',
  red800: '#7a2828',

  blue300: '#6aa7f1',
  blue700: '#1d4ed8',

  // Non-semantic colors
  grape600: '#544171',
  eggplant600: '#714148',
  fjord600: '#415171',
  olive600: '#456138',
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

export const lightTheme = {
  colors: {
    interactivePrimary: colors.brightTeal200,
    interactivePrimaryPress: colors.brightTeal300,
    interactivePrimaryContent: colors.darkGreen900,
    interactivePrimaryContentPress: colors.darkGreen950,

    interactiveSecondary: colors.brightTeal100,
    interactiveSecondaryPress: colors.brightTeal200,
    interactiveSecondaryContent: colors.darkGreen800,
    interactiveSecondaryContentPress: colors.darkGreen900,

    interactiveNeutral: colors.neutral100,
    interactiveNeutralPress: colors.neutral200,
    interactiveNeutralContent: colors.neutral900,
    interactiveNeutralContentPress: colors.neutral990,

    interactiveNeutralSecondary: colors.neutral10,
    interactiveNeutralSecondaryPress: colors.neutral200,

    interactiveNeutralReversed: colors.neutral990,
    interactiveNeutralReversedPress: colors.neutral900,
    interactiveNeutralReversedContent: colors.neutral50,
    interactiveNeutralReversedContentPress: colors.neutral10,

    sentimentNegative: colors.negative400,
    sentimentNegativePress: colors.negative500,

    sentimentNegativeSecondary: colors.negative50,
    sentimentNegativeSecondaryPress: colors.negative100,

    sentimentPositive: colors.positive400,
    sentimentPositivePress: colors.positive500,

    sentimentPositiveSecondary: colors.positive50,
    sentimentPositiveSecondaryPress: colors.positive100,

    backgroundScreen: colors.neutral100,
    backgroundElevated: colors.neutral10,
    backgroundNeutral: `${colors.neutral950}15`,
    backgroundOverlay: `${colors.neutral950}80`,

    baseLight: colors.neutral10,
    baseDark: colors.neutral990,

    borderNeutral: `${colors.neutral950}10`,
    borderNeutralSecondary: `${colors.neutral950}30`,

    contentPrimary: colors.neutral990,
    contentSecondary: colors.neutral900,
    contentTertiary: colors.neutral700,
    contentAccent: colors.darkGreen800,

    /////////

    // backgroundPrimary: colors.stone100,
    // backgroundSecondary: colors.stone200,
    // backgroundTertiary: colors.stone300,
    // backgroundQuaternary: colors.stone400,

    // surfacePrimary: colors.stone100,
    // surfaceSecondary: colors.stone200,
    // surfaceTertiary: colors.stone300,
    // surfaceQuaternary: colors.stone500,

    // surfaceReversedPrimary: colors.stone800,
    // surfaceReversedSecondary: colors.stone700,

    // accentPrimary: colors.teal700,
    // accentSecondary: colors.teal800,
    // accentTertiary: colors.teal300,
    // accentQuaternary: colors.teal150,

    // contentQuaternary: colors.stone500,
    // contentReversed: colors.stone50,

    // borderPrimary: colors.stone500,
    // borderSecondary: colors.stone300,

    // shadowPrimary: colors.stone800,

    // overlay: colors.stone600,

    transparent: 'transparent',

    // Semantic colors
    informativePrimary: colors.blue700,

    positivePrimary: colors.green800,
    positiveSecondary: colors.green700,
    positiveTertiary: colors.green300,
    positiveQuaternary: colors.green150,

    negativePrimary: colors.red800,
    negativeSecondary: colors.red700,
    negativeTertiary: colors.red300,
    negativeQuaternary: colors.red150,

    // Non-semantic colors
    white: colors.stone50,
    black: colors.stone950,
    berryStrong: colors.grape600,
    wineStrong: colors.eggplant600,
    imperialBlueStrong: colors.fjord600,
    darkOliveStrong: colors.olive600,
    sunshineStrong: colors.sunshine200,
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
} as const;

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,

    interactivePrimary: colors.brightTeal300,
    interactivePrimaryPress: colors.brightTeal200,
    interactivePrimaryContent: colors.darkGreen900,
    interactivePrimaryContentPress: colors.darkGreen800,

    interactiveSecondary: colors.darkGreen800,
    interactiveSecondaryPress: colors.darkGreen600,
    interactiveSecondaryContent: colors.brightTeal300,
    interactiveSecondaryContentPress: colors.brightTeal100,

    interactiveNeutral: colors.neutral900,
    interactiveNeutralPress: colors.neutral800,
    interactiveNeutralContent: colors.neutral100,
    interactiveNeutralContentPress: colors.neutral50,

    interactiveNeutralSecondary: colors.neutral950,
    interactiveNeutralSecondaryPress: colors.neutral900,

    sentimentNegative: colors.negative200,
    sentimentNegativePress: colors.negative100,

    sentimentNegativeSecondary: colors.negative950,
    sentimentNegativeSecondaryPress: colors.negative900,

    sentimentPositive: colors.positive400,
    sentimentPositivePress: colors.positive500,

    sentimentPositiveSecondary: colors.positive950,
    sentimentPositiveSecondaryPress: colors.positive900,

    backgroundScreen: colors.neutral990,
    backgroundElevated: `${colors.neutral500}20`,
    backgroundNeutral: `${colors.neutral200}15`,
    backgroundOverlay: `${colors.neutral100}80`,

    borderNeutral: `${colors.neutral10}10`,
    borderNeutralSecondary: `${colors.neutral10}30`,

    contentPrimary: colors.neutral10,
    contentSecondary: colors.neutral100,
    contentTertiary: colors.neutral200,
    contentAccent: colors.brightTeal200,

    //////////

    // backgroundPrimary: colors.neutral950,
    // backgroundSecondary: colors.neutral990,
    // backgroundTertiary: colors.neutral100,
    // backgroundQuaternary: colors.stone600,

    // surfacePrimary: colors.neutral950,
    // surfaceSecondary: colors.stone700,
    // surfaceTertiary: colors.stone600,
    // surfaceQuaternary: colors.stone500,

    // surfaceReversedPrimary: colors.stone100,
    // surfaceReversedSecondary: colors.stone200,

    // accentPrimary: colors.teal600,
    // accentSecondary: colors.teal700,
    // accentTertiary: colors.teal800,
    // accentQuaternary: colors.teal900,

    // contentReversed: colors.stone900,

    // borderPrimary: colors.stone700,
    // borderSecondary: colors.stone900,

    // shadowPrimary: colors.stone600,

    // overlay: colors.stone600,

    // Semantic colors
    informativePrimary: colors.blue300,

    positivePrimary: colors.green300,
    positiveSecondary: colors.green150,
    positiveTertiary: colors.green700,
    positiveQuaternary: colors.green800,

    negativePrimary: colors.red300,
    negativeSecondary: colors.red150,
    negativeTertiary: colors.red700,
    negativeQuaternary: colors.red800,
  },
} as const;
