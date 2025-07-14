import { Text } from '@/craftrn-ui/components/Text';
import { File } from '@/tetrisly-icons/File';
import { LayerTwo } from '@/tetrisly-icons/LayerTwo';
import { Notification } from '@/tetrisly-icons/Notification';
import React, { ComponentProps, useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import Animated, {
  Easing,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Tab, tabsData } from './data/notificationsTabs';

const TAB_GAP = 16;
const ICON_SIZE = 14;

const TabItem = ({
  icon,
  label,
  notifications,
  isActive,
  onPress,
  onLayout,
}: Tab &
  ComponentProps<typeof Pressable> & {
    isActive: boolean;
  }) => {
  const { styles, theme } = useStyles(tabItemStylesheet);

  const Icon = useMemo(() => {
    return { LayerTwo, File, Notification }[icon];
  }, [icon]);

  return (
    <Pressable
      style={styles.pressable}
      disabled={isActive}
      onPress={onPress}
      onLayout={onLayout}
    >
      <Icon
        color={
          isActive ? theme.colors.contentPrimary : theme.colors.contentTertiary
        }
        size={ICON_SIZE}
      />
      <Text
        color={isActive ? 'contentPrimary' : 'contentTertiary'}
        variant="body2"
        style={styles.labelText}
      >
        {label}
      </Text>
      {!!notifications && (
        <View style={styles.notificationsContainer(isActive)}>
          <Text
            color={isActive ? 'contentPrimary' : 'contentTertiary'}
            variant="body3"
            style={styles.notificationText}
          >
            {notifications}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const tabItemStylesheet = createStyleSheet(theme => ({
  pressable: {
    paddingVertical: theme.spacing.medium,
    flexDirection: 'row',
    gap: theme.spacing.xsmall,
    alignItems: 'center',
  },
  labelText: {
    fontWeight: 'bold',
  },
  notificationsContainer: (isActive: boolean) => ({
    borderRadius: theme.borderRadius.small,
    paddingHorizontal: theme.spacing.xxsmall,
    backgroundColor: isActive
      ? theme.colors.backgroundTertiary
      : theme.colors.backgroundSecondary,
  }),
  notificationText: {
    fontWeight: 'bold',
  },
}));

const renderItem =
  ({
    activeIndex,
    onPress,
    onLayout,
  }: {
    activeIndex: number;
    onPress: (index: number) => void;
    onLayout: (index: number, width: number) => void;
  }) =>
  ({ item, index }: { item: Tab; index: number }) => (
    <TabItem
      {...item}
      isActive={activeIndex === index}
      onPress={() => onPress(index)}
      onLayout={({ nativeEvent }) => onLayout(index, nativeEvent.layout.width)}
    />
  );

const useIndicatorAnimated = ({
  tabWidths,
  activeIndexShared,
}: {
  tabWidths: number[];
  activeIndexShared: SharedValue<number>;
}) => {
  const { theme } = useStyles();
  const initialLeft = theme.spacing.large;

  const animateIndicator = useCallback(
    (selectedIndex: number) => {
      activeIndexShared.value = withTiming(selectedIndex, {
        easing: Easing.inOut(Easing.ease),
      });
    },
    [activeIndexShared],
  );

  const indicatorStyle = useAnimatedStyle(() => {
    // If there are fewer than 2 tabs, return an empty style object
    if (tabWidths.length < 2) {
      return { width: 0, left: 0 };
    }

    // Calculate the left and width for the indicator line based on the active index
    const from = [...Array(tabsData.length).keys()];
    const left = interpolate(
      activeIndexShared.value,
      from,
      tabWidths.reduce<number[]>(
        (prev, cur, i) => [...prev, prev[i] + cur + TAB_GAP],
        [initialLeft],
      ),
    );
    const width = interpolate(activeIndexShared.value, from, tabWidths);

    return { width, left };
  }, [activeIndexShared.value, tabWidths]);

  return { indicatorStyle, animateIndicator };
};

type Props = {
  initialActive: number;
  onPress: (index: number) => void;
};

export const Tabs = ({ initialActive = 0, onPress }: Props) => {
  const { styles } = useStyles(stylesheet);
  const [activeIndex, setActiveIndex] = useState(initialActive);
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const activeIndexShared = useSharedValue(initialActive);
  const { indicatorStyle, animateIndicator } = useIndicatorAnimated({
    tabWidths,
    activeIndexShared,
  });

  const handleTabPress = (selectedIndex: number) => {
    animateIndicator(selectedIndex);
    setActiveIndex(selectedIndex);
    onPress?.(selectedIndex);
  };

  const handleLayout = (index: number, width: number) => {
    setTabWidths(prevWidths => {
      const newWidths = [...prevWidths];
      newWidths[index] = width;
      return newWidths;
    });
  };

  return (
    <View>
      <FlatList
        data={tabsData}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem({
          activeIndex,
          onPress: handleTabPress,
          onLayout: handleLayout,
        })}
        contentContainerStyle={styles.flatListContainer}
        style={styles.flatList}
      />
      <Animated.View style={[styles.indicator, indicatorStyle]} />
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  flatList: {
    borderBottomColor: theme.colors.borderPrimary,
    borderBottomWidth: 1,
  },
  flatListContainer: {
    paddingHorizontal: theme.spacing.large,
    gap: TAB_GAP,
  },
  indicator: {
    borderBottomColor: theme.colors.contentPrimary,
    borderBottomWidth: 1,
    // Ensures the line appears on top of the screen divider
    top: -1,
  },
}));
