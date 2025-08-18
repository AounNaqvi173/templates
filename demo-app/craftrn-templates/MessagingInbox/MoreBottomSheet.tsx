import { Avatar } from '@/craftrn-ui/components/Avatar';
import { BottomSheet } from '@/craftrn-ui/components/BottomSheet';
import { ButtonRound } from '@/craftrn-ui/components/ButtonRound';
import { Card } from '@/craftrn-ui/components/Card';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { Text } from '@/craftrn-ui/components/Text';
import { Block } from '@/tetrisly-icons/Block';
import { Close } from '@/tetrisly-icons/Close';
import { Heart } from '@/tetrisly-icons/Heart';
import { InfoCircle } from '@/tetrisly-icons/InfoCircle';
import { LogOut } from '@/tetrisly-icons/LogOut';
import React, { ComponentProps, ComponentType, useMemo } from 'react';
import { View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { inboxItemData } from './data/inbox';
import { currentUser } from './data/users';

type Props = Pick<
  ComponentProps<typeof BottomSheet>,
  'onRequestClose' | 'onClose' | 'visible'
> & {
  selectedInboxId: string | null;
};

export const MoreBottomSheet: ComponentType<Props> = ({
  visible,
  selectedInboxId,
  onRequestClose,
  onClose,
}) => {
  const { styles, theme } = useStyles(stylesheet);

  const iconProps = {
    color: theme.colors.contentPrimary,
  };

  const participant = useMemo(() => {
    if (!selectedInboxId) return null;
    const selectedInboxItem = inboxItemData.find(
      item => item.id === selectedInboxId,
    );
    return (
      selectedInboxItem?.participants.find(p => p.id !== currentUser.id) || null
    );
  }, [selectedInboxId]);

  if (!participant) return null;

  return (
    <BottomSheet
      enableOverlayTapToClose
      onRequestClose={onRequestClose}
      onClose={onClose}
      visible={visible}
      variant="secondary"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.participantContainer}>
            <Avatar
              size="medium"
              fallbackColor={participant.avatarColor}
              fallbackInitials={participant.initials}
              source={{ uri: participant.avatarUri }}
              showOnlineIndicator={participant.isOnline}
            />
            <Text variant="body2" style={styles.name}>
              {participant.name}
            </Text>
          </View>
          <ButtonRound
            renderContent={({ iconSize }) => (
              <Close size={iconSize} color={theme.colors.contentTertiary} />
            )}
            onPress={onRequestClose}
            intent="secondary"
          />
        </View>
        <View style={styles.content}>
          <Card>
            <ListItem
              text="Contact info"
              onPress={onRequestClose}
              itemRight={
                <View style={styles.icon}>
                  <InfoCircle {...iconProps} />
                </View>
              }
              divider={true}
              style={styles.item}
            />
            <ListItem
              text="Add to Favourites"
              onPress={onRequestClose}
              itemRight={
                <View style={styles.icon}>
                  <Heart {...iconProps} />
                </View>
              }
              style={styles.item}
            />
          </Card>
          <Card>
            <ListItem
              text={`Block ${participant.name}`}
              onPress={onRequestClose}
              itemRight={
                <View style={styles.icon}>
                  <Block {...iconProps} color={theme.colors.negativePrimary} />
                </View>
              }
              divider={true}
              style={styles.item}
              variant="danger"
            />
            <ListItem
              text="Leave chat"
              onPress={onRequestClose}
              itemRight={
                <View style={styles.icon}>
                  <LogOut {...iconProps} color={theme.colors.negativePrimary} />
                </View>
              }
              style={styles.item}
              variant="danger"
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  participantContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.large,
    alignItems: 'center',
  },
  name: {
    marginLeft: theme.spacing.medium,
    fontWeight: 'bold',
  },
  content: {
    gap: theme.spacing.small,
  },
  item: {
    padding: theme.spacing.large,
  },
  icon: {
    marginRight: theme.spacing.small,
  },
}));
