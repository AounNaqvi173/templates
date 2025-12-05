import { User } from '@/craftrn-templates/MessagingThread/data/users';
import { HeaderTitle } from '@/craftrn-templates/MessagingThread/HeaderTitle';
import { MessagingThreadScreen } from '@/craftrn-templates/MessagingThread/MessagingThreadScreen';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback } from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function MessageThread() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useUnistyles();

  const updateNavigationHeader = useCallback(
    (user: User) => {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: theme.colors.backgroundScreen,
        },
        contentStyle: {
          backgroundColor: theme.colors.backgroundScreenSecondary,
        },
        headerTitle: () => <HeaderTitle user={user} />,
      });
    },
    [navigation, theme.colors.backgroundScreen],
  );

  return (
    <MessagingThreadScreen
      id={id}
      updateNavigationHeader={updateNavigationHeader}
    />
  );
}
