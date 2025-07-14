import { MessagingInboxScreen } from '@/craftrn-templates/MessagingInbox/MessagingInboxScreen';
import { useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { useStyles } from 'react-native-unistyles';

export default function MessagingInbox() {
  const [searchText, setSearchText] = useState('');
  const { theme } = useStyles();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search',
        hideWhenScrolling: true,
        barTintColor: theme.colors.surfacePrimary,
        tintColor: theme.colors.accentPrimary,
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

  return <MessagingInboxScreen searchText={searchText} />;
}
