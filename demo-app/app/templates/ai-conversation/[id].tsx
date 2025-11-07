import { AiConversationScreen } from '@/craftrn-templates/AiConversation/AiConversationScreen';
import { conversationsData } from '@/craftrn-templates/AiConversation/data/conversations';
import { HeaderTitle } from '@/craftrn-templates/AiConversation/HeaderTitle';
import { ButtonRound } from '@/craftrn-ui/components/ButtonRound/ButtonRound';
import { Plus } from '@/tetrisly-icons/Plus';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

export default function AiConversation() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const { theme } = useUnistyles();

  const conversation = useMemo(
    () => conversationsData.find((c: any) => c.id === id),
    [id],
  );

  const updateNavigationHeader = (title: string) => {
    if (conversation) {
      navigation.setOptions({
        headerTitle: () => (
          <HeaderTitle title={title} aiAssistant={conversation.aiAssistant} />
        ),
        headerLeft: () => (
          <View style={styles.headerLeft}>
            <ButtonRound
              disabled
              size="medium"
              renderContent={() => <></>}
              variant="neutral"
            />
          </View>
        ),
        headerRight: () => (
          <ButtonRound
            renderContent={({ iconSize }) => (
              <Plus color={theme.colors.contentPrimary} size={iconSize} />
            )}
            animationConfig={{ scaleIn: 1.1 }}
            onPress={() => console.log('New message pressed')}
            variant="neutral"
          />
        ),
      });
    }
  };

  if (!id) {
    return null;
  }

  return (
    <AiConversationScreen
      id={id}
      updateNavigationHeader={updateNavigationHeader}
    />
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    opacity: 0,
  },
});
