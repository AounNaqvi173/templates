import React, { ComponentType, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { AnimatedKeyboardView } from './AnimatedKeyboardView';
import { Notification, notificationsData } from './data/notifications';
import { MoreOptionsBottomSheet } from './MoreOptionsBottomSheet';
import { NotificationItem } from './NotificationItem/NotificationItem';
import { Tabs } from './Tabs';

const INITIAL_ACTIVE_TAB = 0;

type Props = {
  isBottomSheetVisible: boolean;
  onRequestBottomSheetClose: () => void;
};

export const NotificationsScreen: ComponentType<Props> = ({
  isBottomSheetVisible,
  onRequestBottomSheetClose,
}) => {
  const [selectedTab, setSelectedTab] = useState(INITIAL_ACTIVE_TAB);
  const { styles } = useStyles(stylesheet);

  const filteredData = useMemo(
    () =>
      notificationsData.filter(notification => {
        if (selectedTab === 1) {
          return ['access', 'comment', 'mention'].includes(notification.type);
        } else if (selectedTab === 2) {
          return notification.type === 'file';
        }
        return true;
      }),
    [selectedTab],
  );

  return (
    <AnimatedKeyboardView style={styles.container}>
      <Tabs initialActive={INITIAL_ACTIVE_TAB} onPress={setSelectedTab} />
      <FlatList<Notification>
        style={styles.flatList}
        data={filteredData}
        renderItem={({ item, index }) => (
          <NotificationItem {...item} index={index} />
        )}
        keyExtractor={({ id }) => id}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          paddingBottom: UnistylesRuntime.insets.bottom,
        }}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        scrollIndicatorInsets={{ right: 1 }}
      />
      <MoreOptionsBottomSheet
        visible={isBottomSheetVisible}
        onRequestClose={onRequestBottomSheetClose}
      />
    </AnimatedKeyboardView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderPrimary,
  },
}));
