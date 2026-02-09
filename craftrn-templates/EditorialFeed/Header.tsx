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
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';
import { Categories } from './Categories';
import { EditorialCategory, EditorialCategoryData } from './data/categories';
import { Gradient } from './Gradient';
import { ProfileBottomSheet } from './ProfileBottomSheet';

export const HEADER_HEIGHT = 45;
const GRADIENT_HEIGHT = 35;

type Props = {
  scrollY: SharedValue<number>;
  onCategoryChanged: (categoryTitle: EditorialCategory['title']) => void;
};

export const Header: ComponentType<Props> = ({
  scrollY,
  onCategoryChanged,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    EditorialCategory['title']
  >(EditorialCategoryData[0].title);
  const { theme } = useUnistyles();
  const [profileBottomSheetVisible, setProfileBottomSheetVisible] =
    useState(false);
  const topOffset = UnistylesRuntime.insets.top;
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
    (categoryTitle: EditorialCategory['title']) => {
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
                variant="neutral"
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
          <Gradient height={GRADIENT_HEIGHT} />
        </Animated.View>
      </Animated.View>
      <ProfileBottomSheet
        visible={profileBottomSheetVisible}
        onRequestClose={() => setProfileBottomSheetVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerContainer: {
    backgroundColor: theme.colors.backgroundElevated,
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
    backgroundColor: theme.colors.backgroundElevated,
    borderBottomColor: theme.colors.borderNeutralSecondary,
    borderBottomWidth: 1,
  },
}));
