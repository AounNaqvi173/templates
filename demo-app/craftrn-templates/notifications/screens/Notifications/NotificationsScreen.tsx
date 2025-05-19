import { ButtonRound } from '@/craftrn-ui/components/ButtonRound';
import { More } from '@/tetrisly-icons/More';
import { useNavigation } from '@react-navigation/native';
import React, {
  ComponentType,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { AnimatedKeyboardView } from '../../components/AnimatedKeyboardView';
import { Notification, notificationsData } from '../../data/notifications';
import { MoreOptionsBottomSheet } from './MoreOptionsBottomSheet';
import { NotificationItem } from './NotificationItem/NotificationItem';
import { Tabs } from './Tabs';

const INITIAL_ACTIVE_TAB = 0;

export const NotificationsScreen: ComponentType = () => {
  const [selectedTab, setSelectedTab] = useState(INITIAL_ACTIVE_TAB);
  const navigation = useNavigation();
  const { styles, theme } = useStyles(stylesheet);
  const insets = useSafeAreaInsets();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ButtonRound
          renderContent={({ iconSize }) => (
            <More size={iconSize} color={theme.colors.contentPrimary} />
          )}
          onPress={() => setIsBottomSheetVisible(true)}
        />
      ),
    });
  }, [navigation, theme.colors.contentPrimary]);

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
          paddingBottom: insets.bottom,
        }}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        scrollIndicatorInsets={{ right: 1 }}
      />
      <MoreOptionsBottomSheet
        visible={isBottomSheetVisible}
        onRequestClose={() => setIsBottomSheetVisible(false)}
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
