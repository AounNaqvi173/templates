import { Text } from '@/craftrn-ui/components/Text/Text';
import { ChevronDown } from '@/tetrisly-icons/ChevronDown';
import React, { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { ContextMenu } from './ContextMenu';
import { AiAssistant } from '../data/conversations';

export const HeaderTitle = ({
  title,
  aiAssistant,
}: {
  title: string;
  aiAssistant: AiAssistant;
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const titleRef = useRef<View>(null);

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
      subtitle: 'Advanced reasoning capabilities',
      onPress: () => console.log('Claude Sonnet 4 selected'),
    },
  ];

  const handleTitlePress = () => {
    if (titleRef.current) {
      titleRef.current.measure((_, __, width, height, pageX, pageY) => {
        setMenuPosition({
          x: pageX + width / 2,
          y: pageY + height,
        });
        setContextMenuVisible(true);
      });
    }
  };

  return (
    <Pressable
      ref={titleRef}
      style={styles.titleContainer}
      onPress={handleTitlePress}
    >
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

      <ContextMenu
        visible={contextMenuVisible}
        onClose={() => setContextMenuVisible(false)}
        items={contextMenuItems}
        anchorPosition={menuPosition}
      />
    </Pressable>
  );
};

const stylesheet = createStyleSheet(() => ({
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
