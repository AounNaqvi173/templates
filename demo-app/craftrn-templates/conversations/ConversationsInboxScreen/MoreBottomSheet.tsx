import { BottomSheet } from '@/craftrn-ui/components/BottomSheet/BottomSheet';
import { Button } from '@/craftrn-ui/components/Button/Button';
import { Text } from '@/craftrn-ui/components/Text/Text';
import React, { ComponentProps, ComponentType, useMemo } from 'react';
import { View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { Avatar } from '../../../craftrn-ui/components/Avatar';
import { inboxItemData } from './data/inbox';
import { currentUser } from './data/users';

type Props = Pick<
  ComponentProps<typeof BottomSheet>,
  'onRequestClose' | 'onClose' | 'visible'
> & {
  selectedInboxId: string | null;
  onPressCancel: () => void;
  onPressConfirm: () => void;
};

export const MoreBottomSheet: ComponentType<Props> = ({
  visible,
  selectedInboxId,
  onRequestClose,
  onClose,
  onPressCancel,
  onPressConfirm,
}) => {
  const { styles } = useStyles(stylesheet);

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
    >
      <View style={styles.container}>
        <View style={styles.participantContainer}>
          <Avatar
            size="medium"
            source={{ uri: participant.avatarUri }}
            showOnlineIndicator={participant.isOnline}
          />
          <Text variant="body2" style={styles.name}>
            {participant.name}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button variant="secondary" onPress={onPressCancel}>
            Cancel
          </Button>
          <Button onPress={onPressConfirm} variant="negative">
            Confirm
          </Button>
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
  participantContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.large,
    alignItems: 'center',
  },
  name: {
    marginLeft: theme.spacing.medium,
    fontWeight: 'bold',
  },
  buttonContainer: {
    gap: theme.spacing.small,
  },
}));
