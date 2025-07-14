import { BottomSheet } from '@/craftrn-ui/components/BottomSheet';
import { ButtonRound } from '@/craftrn-ui/components/ButtonRound';
import { Card } from '@/craftrn-ui/components/Card';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { Text } from '@/craftrn-ui/components/Text';
import { Bell } from '@/tetrisly-icons/Bell';
import { TimeClock } from '@/tetrisly-icons/TimeClock';
import React, { ComponentProps, ComponentType } from 'react';
import { View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

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
  const { styles, theme } = useStyles(stylesheet);

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
      variant="secondary"
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
                variant="secondary"
                renderContent={() => <Text>{reaction}</Text>}
              />
            ))}
          </View>
          <Card>
            <ListItem
              text="Get reply notifications"
              onPress={onRequestClose}
              itemRight={
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
              itemRight={
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

const stylesheet = createStyleSheet(theme => ({
  container: {
    paddingHorizontal: theme.spacing.large,
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
  content: {
    gap: theme.spacing.large,
  },
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    marginLeft: theme.spacing.medium,
    fontWeight: 'bold',
  },
  item: {
    padding: theme.spacing.large,
  },
  icon: {
    marginRight: theme.spacing.small,
  },
}));
