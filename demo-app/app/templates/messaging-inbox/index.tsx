import { MessagingInboxScreen } from '@/craftrn-templates/MessagingInbox/MessagingInboxScreen';
import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useUnistyles } from 'react-native-unistyles';

export default function MessagingInbox() {
  const [searchText, setSearchText] = useState('');
  const { theme } = useUnistyles();
  const navigation = useNavigation();
  const router = useRouter();

  const handlePressItem = useCallback(
    (id: string) => () => {
      router.push(`/templates/messaging-thread/${id}`);
    },
    [router],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search',
        hideWhenScrolling: true,
        barTintColor: theme.colors.backgroundElevated,
        tintColor: theme.colors.contentAccent,
        textColor: theme.colors.contentSecondary,
        onChangeText: (event: { nativeEvent: { text: string } }) => {
          setSearchText(event.nativeEvent.text);
        },
        onCancelButtonPress: () => {
          setSearchText('');
        },
      },
    });
  }, [navigation, theme.colors]);

  return (
    <MessagingInboxScreen
      searchText={searchText}
      onPressItem={handlePressItem}
    />
  );
}
