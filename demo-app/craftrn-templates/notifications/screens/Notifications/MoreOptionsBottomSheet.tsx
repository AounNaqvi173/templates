import { BottomSheet } from '@/craftrn-ui/components/BottomSheet';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { Switch } from '@/craftrn-ui/components/Switch';
import { Bell } from '@/tetrisly-icons/Bell';
import { ChevronRight } from '@/tetrisly-icons/ChevronRight';
import { Settings } from '@/tetrisly-icons/Settings';
import React, { ComponentType, useState } from 'react';
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

export const MoreOptionsBottomSheet: ComponentType<Props> = ({
  visible,
  onRequestClose,
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

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
          text="Enable push notifications"
          itemLeft={
            <View style={styles.bottomSheetIcon}>
              <Bell {...iconProps} />
            </View>
          }
          itemRight={
            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
            />
          }
          divider={true}
          style={styles.bottomSheetItem}
        />
        <ListItem
          text="Manage settings"
          onPress={() => {}}
          itemLeft={
            <View style={styles.bottomSheetIcon}>
              <Settings {...iconProps} />
            </View>
          }
          itemRight={<ChevronRight size={24} {...iconProps} />}
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
