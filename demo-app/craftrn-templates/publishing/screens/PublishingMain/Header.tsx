import { ButtonRound } from '@/craftrn-ui/components/ButtonRound/ButtonRound';
import { Text } from '@/craftrn-ui/components/Text/Text';
import { User } from '@/tetrisly-icons/User';
import React, { ComponentType, useCallback, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import {
  PublishingCategory,
  publishingCategoryData,
} from '../../data/categories';
import { Categories } from './Categories';
import { ProfileBottomSheet } from './ProfileBottomSheet';

export const HEADER_HEIGHT = 45;
const GRADIENT_HEIGHT = 35;

const GradientComponent = () => {
  const { theme } = useStyles();
  return (
    <Svg height="35" width="100%">
      <Defs>
        <LinearGradient id="headerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop
            offset="0%"
            stopColor={theme.colors.backgroundSecondary}
            stopOpacity="1"
          />
          <Stop
            offset="100%"
            stopColor={theme.colors.backgroundSecondary}
            stopOpacity="0"
          />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="35" fill="url(#headerGradient)" />
    </Svg>
  );
};

type Props = {
  scrollY: SharedValue<number>;
  onCategoryChanged: (categoryTitle: PublishingCategory['title']) => void;
};

export const Header: ComponentType<Props> = ({
  scrollY,
  onCategoryChanged,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    PublishingCategory['title']
  >(publishingCategoryData[0].title);
  const insets = useSafeAreaInsets();
  const { styles, theme } = useStyles(stylesheet);
  const [profileBottomSheetVisible, setProfileBottomSheetVisible] =
    useState(false);
  const topOffset = insets.top;
  const headerHeight = HEADER_HEIGHT + topOffset;

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [-1, 0, HEADER_HEIGHT, HEADER_HEIGHT - 1],
          [0, 0, -HEADER_HEIGHT, -HEADER_HEIGHT],
        ),
      },
    ],
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, topOffset], [1, 0]),
  }));

  const gradientAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [
        0,
        topOffset,
        topOffset + GRADIENT_HEIGHT + 10,
        topOffset + GRADIENT_HEIGHT + 11,
      ],
      [0, 0, 1, 1],
    ),
  }));

  const handleCategoryChanged = useCallback(
    (categoryTitle: PublishingCategory['title']) => {
      setSelectedCategory(categoryTitle);
      onCategoryChanged(categoryTitle);
    },
    [onCategoryChanged],
  );

  return (
    <>
      <Animated.View style={[styles.container, containerAnimatedStyle]}>
        <View style={[styles.headerContainer, { height: headerHeight }]}>
          <Animated.View style={[styles.headerBar, logoAnimatedStyle]}>
            <View style={styles.logoContainer}>
              <Text variant="heading3">Discover</Text>
            </View>
            <View style={styles.navigationButton}>
              <ButtonRound
                renderContent={({ iconSize }) => (
                  <User size={iconSize} color={theme.colors.contentPrimary} />
                )}
                onPress={() => setProfileBottomSheetVisible(true)}
              />
            </View>
          </Animated.View>
        </View>
        <View style={styles.categoriesContainer}>
          <Categories
            onPress={handleCategoryChanged}
            selectedCategoryTitle={selectedCategory}
          />
        </View>
        <Animated.View style={gradientAnimatedStyle}>
          <GradientComponent />
        </Animated.View>
      </Animated.View>
      <ProfileBottomSheet
        visible={profileBottomSheetVisible}
        onRequestClose={() => setProfileBottomSheetVisible(false)}
      />
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerContainer: {
    backgroundColor: theme.colors.backgroundPrimary,
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing.medium,
  },
  headerBar: {
    marginHorizontal: theme.spacing.large,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navigationButton: {
    position: 'absolute',
    right: 0,
  },
  categoriesContainer: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderBottomColor: theme.colors.borderPrimary,
    borderBottomWidth: 1,
  },
}));
