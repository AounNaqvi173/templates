import { BottomSheet } from '@/craftrn-ui/components/BottomSheet';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { ChevronRight } from '@/tetrisly-icons/ChevronRight';
import { Settings } from '@/tetrisly-icons/Settings';
import { User } from '@/tetrisly-icons/User';
import React, { ComponentType } from 'react';
import { View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

type Props = {
  visible: boolean;
  onRequestClose: () => void;
};

export const ProfileBottomSheet: ComponentType<Props> = ({
  visible,
  onRequestClose,
}) => {
  const { styles, theme } = useStyles(stylesheet);

  const iconProps = {
    color: theme.colors.contentPrimary,
  };

  return (
    <BottomSheet
      enableOverlayTapToClose
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.bottomSheetContent}>
        <ListItem
          text="View profile"
          onPress={() => {}}
          itemLeft={
            <View style={styles.bottomSheetIcon}>
              <User {...iconProps} />
            </View>
          }
          itemRight={
            <ChevronRight size={24} color={theme.colors.contentPrimary} />
          }
          style={styles.bottomSheetItem}
          divider={true}
        />
        <ListItem
          text="Manage settings"
          onPress={() => {}}
          itemLeft={
            <View style={styles.bottomSheetIcon}>
              <Settings {...iconProps} />
            </View>
          }
          itemRight={
            <ChevronRight size={24} color={theme.colors.contentPrimary} />
          }
          style={styles.bottomSheetItem}
        />
      </View>
    </BottomSheet>
  );
};

const stylesheet = createStyleSheet(theme => ({
  bottomSheetContent: {
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
  bottomSheetIcon: {
    marginRight: theme.spacing.small,
  },
  bottomSheetItem: {
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.small,
    marginHorizontal: theme.spacing.small,
    borderRadius: theme.borderRadius.medium,
    marginVertical: theme.spacing.xxsmall,
  },
}));
