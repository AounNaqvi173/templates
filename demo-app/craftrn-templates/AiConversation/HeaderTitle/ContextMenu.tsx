import { ListItem } from '@/craftrn-ui/components/ListItem/ListItem';
import React, { useCallback, useEffect, useState } from 'react';
import { Keyboard, Modal, Pressable } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface ContextMenuItem {
  id: string;
  label: string;
  subtitle?: string;
  onPress: () => void;
}

interface ContextMenuProps {
  visible: boolean;
  onClose: () => void;
  items: ContextMenuItem[];
  anchorPosition: { x: number; y: number };
}

const ENTER_DURATION = 200;
const EXIT_DURATION = 150;

export const ContextMenu = ({
  visible,
  onClose,
  items,
  anchorPosition,
}: ContextMenuProps) => {
  const { styles } = useStyles(stylesheet);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const overlayOpacity = useSharedValue(0);
  const menuOpacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  const hideModal = () => setIsModalVisible(false);

  const handleItemPress = useCallback(
    (itemOnPress: () => void) => {
      itemOnPress();
      onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (visible) {
      setIsModalVisible(true);
      Keyboard.dismiss();
      overlayOpacity.value = withTiming(0.3, {
        duration: ENTER_DURATION,
        easing: Easing.out(Easing.cubic),
      });
      menuOpacity.value = withTiming(1, {
        duration: ENTER_DURATION,
        easing: Easing.out(Easing.cubic),
      });
      scale.value = withTiming(1, {
        duration: ENTER_DURATION,
        easing: Easing.out(Easing.cubic),
      });
    } else if (isModalVisible) {
      overlayOpacity.value = withTiming(0, {
        duration: EXIT_DURATION,
        easing: Easing.in(Easing.cubic),
      });
      menuOpacity.value = withTiming(0, {
        duration: EXIT_DURATION,
        easing: Easing.in(Easing.cubic),
      });
      scale.value = withTiming(
        0.8,
        {
          duration: EXIT_DURATION,
          easing: Easing.in(Easing.cubic),
        },
        finished => {
          if (finished) {
            runOnJS(hideModal)();
          }
        },
      );
    }
  }, [visible, isModalVisible, overlayOpacity, menuOpacity, scale]);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const menuAnimatedStyle = useAnimatedStyle(() => ({
    opacity: menuOpacity.value,
    transform: [{ scale: scale.value }],
  }));

  if (!isModalVisible) return null;

  return (
    <Modal
      transparent
      visible={isModalVisible}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, overlayAnimatedStyle]}>
        <Pressable style={styles.overlayPressable} onPress={onClose} />
      </Animated.View>
      <Animated.View
        style={[
          styles.menu,
          {
            top: anchorPosition.y + 10,
          },
          menuAnimatedStyle,
        ]}
      >
        {items.map((item, index) => (
          <ListItem
            key={item.id}
            text={item.label}
            textBelow={item.subtitle}
            onPress={() => handleItemPress(item.onPress)}
            divider={index !== items.length - 1}
            style={styles.menuItem}
          />
        ))}
      </Animated.View>
    </Modal>
  );
};

const stylesheet = createStyleSheet(({ colors, spacing }) => ({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  overlayPressable: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    backgroundColor: colors.backgroundPrimary,
    borderRadius: spacing.medium,
    alignSelf: 'center',
    shadowColor: colors.contentPrimary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 16,
    overflow: 'hidden',
    left: 64,
    right: 64,
  },
  menuItem: {
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
}));
