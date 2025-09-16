import { NotificationsScreen } from '@/craftrn-templates/Notifications/NotificationsScreen';
import { ButtonRound } from '@/craftrn-ui/components/ButtonRound';
import { MoreHorizontal } from '@/tetrisly-icons/MoreHorizontal';
import { useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function Notifications() {
  const navigation = useNavigation();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const { theme } = useUnistyles();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ButtonRound
          renderContent={({ iconSize }) => (
            <MoreHorizontal
              size={iconSize}
              color={theme.colors.contentPrimary}
            />
          )}
          onPress={() => setIsBottomSheetVisible(true)}
          intent="secondary"
        />
      ),
    });
  }, [navigation, theme.colors.contentPrimary]);

  return (
    <NotificationsScreen
      isBottomSheetVisible={isBottomSheetVisible}
      onRequestBottomSheetClose={() => setIsBottomSheetVisible(false)}
    />
  );
}
