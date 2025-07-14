import { User } from '@/craftrn-templates/MessagingThread/data/users';
import { HeaderTitle } from '@/craftrn-templates/MessagingThread/HeaderTitle';
import { MessagingThreadScreen } from '@/craftrn-templates/MessagingThread/MessagingThreadScreen';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback } from 'react';
import { useStyles } from 'react-native-unistyles';

export default function MessageThread() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useStyles();

  const updateNavigationHeader = useCallback(
    (user: User) => {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: theme.colors.backgroundSecondary,
        },
        headerTitle: () => <HeaderTitle user={user} />,
      });
    },
    [navigation, theme.colors.backgroundSecondary],
  );

  return (
    <MessagingThreadScreen
      id={id}
      updateNavigationHeader={updateNavigationHeader}
    />
  );
}
