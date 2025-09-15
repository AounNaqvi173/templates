import { ContextMenu } from '@/craftrn-ui/components/ContextMenu';
import { Text } from '@/craftrn-ui/components/Text/Text';
import { ChevronDown } from '@/tetrisly-icons/ChevronDown';
import React from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { AiAssistant } from './data/conversations';

export const HeaderTitle = ({
  title,
  aiAssistant,
}: {
  title: string;
  aiAssistant: AiAssistant;
}) => {
  const { theme } = useUnistyles();

  const contextMenuItems = [
    {
      id: 'o3',
      label: 'OpenAI o3',
      subtitle: 'Best reasoning model',
      onPress: () => console.log('o3 selected'),
    },
    {
      id: 'gpt-4.5',
      label: 'OpenAI GPT-4.5',
      subtitle: 'Latest flagship model',
      onPress: () => console.log('GPT-4.5 selected'),
    },
    {
      id: 'claude-sonnet-4',
      label: 'Claude Sonnet 4',
      subtitle: 'Advanced reasoning',
      onPress: () => console.log('Claude Sonnet 4 selected'),
    },
  ];

  return (
    <ContextMenu
      items={contextMenuItems}
      menuAnchorPosition="bottom-center"
      trigger={onPress => (
        <Pressable style={styles.titleContainer} onPress={onPress}>
          <View style={styles.titleContent}>
            <View style={styles.titleRow}>
              <Text variant="body1" style={styles.name}>
                {title}
              </Text>
              <ChevronDown color={theme.colors.contentQuaternary} size={16} />
            </View>
            <Text variant="body3" color="contentSecondary" style={styles.model}>
              {aiAssistant.model}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create(() => ({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContent: {
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  model: {
    textAlign: 'center',
  },
}));
