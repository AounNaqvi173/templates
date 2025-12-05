import { BottomSheet } from '@/craftrn-ui/components/BottomSheet';
import { ButtonRound } from '@/craftrn-ui/components/ButtonRound';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { Text } from '@/craftrn-ui/components/Text';
import { Bell } from '@/tetrisly-icons/Bell';
import { TimeClock } from '@/tetrisly-icons/TimeClock';
import React, { ComponentProps, ComponentType } from 'react';
import { View } from 'react-native';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';
import { Card } from '../../craftrn-ui/components/Card';

type Props = Pick<
  ComponentProps<typeof BottomSheet>,
  'onRequestClose' | 'onClose' | 'visible'
>;

const reactions = ['👍', '👋', '😂', '🤔', '🥰', '👀'];

export const MoreBottomSheet: ComponentType<Props> = ({
  visible,
  onRequestClose,
  onClose,
}) => {
  const { theme } = useUnistyles();

  const iconProps = {
    color: theme.colors.contentPrimary,
  };

  return (
    <BottomSheet
      enableOverlayTapToClose
      enableSwipeToClose
      onRequestClose={onRequestClose}
      onClose={onClose}
      visible={visible}
      showHandleBar
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.reactionContainer}>
            {reactions.map(reaction => (
              <ButtonRound
                onPress={onRequestClose}
                size="large"
                key={reaction}
                variant="neutral-secondary"
                renderContent={() => <Text>{reaction}</Text>}
              />
            ))}
          </View>
          <Card>
            <ListItem
              text="Get reply notifications"
              onPress={onRequestClose}
              itemLeft={
                <View style={styles.icon}>
                  <Bell {...iconProps} />
                </View>
              }
              divider={true}
              style={styles.item}
            />
            <ListItem
              text="Remind me"
              onPress={onRequestClose}
              itemLeft={
                <View style={styles.icon}>
                  <TimeClock {...iconProps} />
                </View>
              }
              style={styles.item}
            />
          </Card>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    paddingHorizontal: theme.spacing.large,
    paddingBottom: Math.max(
      UnistylesRuntime.insets.bottom,
      theme.spacing.large,
    ),
    backgroundColor: theme.colors.backgroundNeutral,
  },
  content: {
    gap: theme.spacing.xsmall,
  },
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.large,
  },
  name: {
    marginLeft: theme.spacing.medium,
    fontWeight: 'bold',
  },
  item: {
    padding: theme.spacing.medium,
  },
  icon: {
    marginRight: theme.spacing.small,
  },
}));
