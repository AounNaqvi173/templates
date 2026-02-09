import React, { ComponentType, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';
import { Divider } from '../../craftrn-ui/components/Divider';
import { Notification, notificationsData } from './data/notifications';
import { MoreOptionsBottomSheet } from './MoreOptionsBottomSheet';
import { NotificationItem } from './NotificationItem';
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
  const { theme } = useUnistyles();

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
    <View style={styles.container}>
      <Tabs initialActive={INITIAL_ACTIVE_TAB} onPress={setSelectedTab} />
      <FlatList<Notification>
        renderScrollComponent={props => (
          <KeyboardAwareScrollView
            bottomOffset={theme.spacing.xlarge}
            {...props}
          />
        )}
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
        ItemSeparatorComponent={() => <Divider />}
        scrollIndicatorInsets={{ right: 1 }}
      />
      <MoreOptionsBottomSheet
        visible={isBottomSheetVisible}
        onRequestClose={onRequestBottomSheetClose}
      />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
}));
