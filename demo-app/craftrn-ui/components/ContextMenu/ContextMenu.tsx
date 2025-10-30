import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  View,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';
import { darkTheme, lightTheme } from '../../themes/config';
import { ListItem } from '../ListItem';

const createContextMenuTokens = (
  theme: typeof lightTheme | typeof darkTheme,
) => {
  return {
    size: {
      minWidth: 200,
    },
    colors: {
      overlay: theme.colors.backgroundOverlay,
      background: theme.colors.backgroundPrimary,
      shadow: theme.colors.backgroundNeutral,
    },
    animation: {
      enterDuration: 200,
      exitDuration: 150,
    },
  };
};

export type ContextMenuItem = {
  id: string;
  label: string;
  subtitle?: string;
  itemLeft?: ReactElement;
  itemRight?: ReactElement;
  onPress: () => void;
};

export type MenuAnchorPosition =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right';

type HorizontalAlignment = 'left' | 'center' | 'right';

export type ContextMenuProps = {
  items: ContextMenuItem[];
  trigger: (onPress: () => void) => ReactElement;
  menuAnchorPosition?: MenuAnchorPosition;
  offset?: { x: number; y: number };
};

export const ContextMenu = ({
  items,
  trigger,
  menuAnchorPosition = 'bottom-center',
  offset = { x: 0, y: 8 },
}: ContextMenuProps) => {
  const { theme } = useUnistyles();
  const contextMenuTokens = useMemo(
    () => createContextMenuTokens(theme),
    [theme],
  );
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [triggerPosition, setTriggerPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [menuSize, setMenuSize] = useState({ height: 0, width: 0 });
  const [hasMenuPositioned, setHasMenuPositioned] = useState(false);
  const triggerRef = useRef<View>(null);

  const animationProgress = useSharedValue(0);
  const transformOriginX = useSharedValue(0);
  const transformOriginY = useSharedValue(0);

  const isMenuOnTop = useCallback(() => {
    const { y, height } = triggerPosition;
    const screenHeight = Dimensions.get('window').height;
    const screenY =
      Platform.OS === 'android' ? y - UnistylesRuntime.insets.top : y;
    const spaceAbove = screenY - UnistylesRuntime.insets.top;
    const spaceBelow =
      screenHeight - UnistylesRuntime.insets.bottom - (screenY + height);

    return menuAnchorPosition.startsWith('top-')
      ? spaceAbove >= menuSize.height + offset.y
      : spaceBelow < menuSize.height + offset.y &&
          spaceAbove >= menuSize.height + offset.y;
  }, [triggerPosition, menuAnchorPosition, menuSize.height, offset.y]);

  useEffect(() => {
    if (!menuSize.height || !menuSize.width || !hasMenuPositioned) return;

    const align = menuAnchorPosition.split('-')[1] as HorizontalAlignment;
    transformOriginY.value = isMenuOnTop()
      ? menuSize.height / 2
      : -menuSize.height / 2;
    transformOriginX.value =
      align === 'left'
        ? -menuSize.width / 2
        : align === 'right'
          ? menuSize.width / 2
          : 0;
  }, [
    menuSize,
    hasMenuPositioned,
    menuAnchorPosition,
    isMenuOnTop,
    transformOriginX,
    transformOriginY,
  ]);

  const measureTrigger = useCallback(() => {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTriggerPosition({ x: pageX, y: pageY, width, height });
      setHasMenuPositioned(true);
    });
  }, []);

  useEffect(() => {
    if (visible && !hasMenuPositioned) {
      const timer = setTimeout(measureTrigger, 10);
      return () => clearTimeout(timer);
    }
  }, [visible, measureTrigger, hasMenuPositioned]);

  useEffect(() => {
    if (visible) {
      setHasMenuPositioned(false);
      setIsModalVisible(true);
      animationProgress.value = 0;
      Keyboard.dismiss();
    } else if (isModalVisible) {
      animationProgress.value = withTiming(
        0,
        {
          duration: contextMenuTokens.animation.exitDuration,
          easing: Easing.in(Easing.cubic),
        },
        finished => finished && runOnJS(setIsModalVisible)(false),
      );
    }
  }, [visible, isModalVisible, animationProgress, contextMenuTokens]);

  const getMenuPosition = () => {
    const { x, y, width, height } = triggerPosition;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const screenY =
      Platform.OS === 'android' ? y - UnistylesRuntime.insets.top : y;

    const align = menuAnchorPosition.split('-')[1] as HorizontalAlignment;

    const top = isMenuOnTop()
      ? Math.max(
          screenY - menuSize.height - offset.y,
          UnistylesRuntime.insets.top,
        )
      : Math.min(
          screenY + height + offset.y,
          screenHeight - UnistylesRuntime.insets.bottom - menuSize.height,
        );

    if (align === 'center') {
      return {
        top,
        alignSelf: 'center' as const,
        marginHorizontal: theme.spacing.large,
      };
    }
    if (align === 'left') {
      return { top, left: x + offset.x };
    }
    if (align === 'right') {
      return { top, right: screenWidth - (x + width) + offset.x };
    }
    return { top, left: theme.spacing.large, right: theme.spacing.large };
  };

  const onClose = useCallback(() => setVisible(false), []);
  const onOpen = useCallback(() => setVisible(true), []);

  const handleItemPress = useCallback(
    (itemOnPress: () => void) => {
      itemOnPress();
      onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (visible && hasMenuPositioned && isModalVisible) {
      animationProgress.value = withTiming(1, {
        duration: contextMenuTokens.animation.enterDuration,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [
    visible,
    hasMenuPositioned,
    isModalVisible,
    animationProgress,
    contextMenuTokens,
  ]);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animationProgress.value, [0, 1], [0, 0.3]),
  }));

  const menuAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animationProgress.value,
      [0, 1],
      [transformOriginX.value, 0],
    );
    const translateY = interpolate(
      animationProgress.value,
      [0, 1],
      [transformOriginY.value, 0],
    );
    const scale = interpolate(animationProgress.value, [0, 1], [0.8, 1]);

    return {
      opacity: animationProgress.value,
      transform: [
        { translateX },
        { translateY },
        { scale },
        { translateX: -translateX },
        { translateY: -translateY },
      ],
    };
  });

  return (
    <>
      <View ref={triggerRef} collapsable={false}>
        {trigger(onOpen)}
      </View>
      {isModalVisible && (
        <Modal
          transparent
          visible
          animationType="none"
          onRequestClose={onClose}
        >
          <Animated.View style={[styles.overlay, overlayAnimatedStyle]}>
            <Pressable style={styles.overlayPressable} onPress={onClose} />
          </Animated.View>
          <Animated.View
            style={[styles.menu, getMenuPosition(), menuAnimatedStyle]}
            onLayout={e => setMenuSize(e.nativeEvent.layout)}
          >
            {items.map((item, index) => (
              <ListItem
                key={item.id}
                text={item.label}
                textBelow={item.subtitle}
                itemLeft={item.itemLeft}
                itemRight={item.itemRight}
                onPress={() => handleItemPress(item.onPress)}
                divider={index !== items.length - 1}
                style={styles.menuItem}
              />
            ))}
          </Animated.View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create(theme => {
  const contextMenuTokens = createContextMenuTokens(theme);

  return {
    overlay: {
      flex: 1,
      backgroundColor: contextMenuTokens.colors.overlay,
    },
    overlayPressable: {
      flex: 1,
    },
    menu: {
      position: 'absolute',
      backgroundColor: contextMenuTokens.colors.background,
      borderRadius: theme.spacing.medium,
      shadowColor: contextMenuTokens.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 1,
      shadowRadius: 16,
      elevation: 10,
      overflow: 'hidden',
      minWidth: contextMenuTokens.size.minWidth,
    },
    menuItem: {
      paddingHorizontal: theme.spacing.medium,
      paddingVertical: theme.spacing.small,
    },
  };
});
