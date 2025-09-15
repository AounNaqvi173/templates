import { Text } from '@/craftrn-ui/components/Text';
import { MarkerPin } from '@/tetrisly-icons/MarkerPin';
import { TimeClock } from '@/tetrisly-icons/TimeClock';
import { ComponentType, default as React } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

type Props = {
  label: string;
  icon: 'MarkerPin' | 'TimeClock';
  onPress?: () => void;
};

export const DestinationItem: ComponentType<Props> = ({
  icon,
  label,
  onPress,
}) => {
  const { theme } = useUnistyles();
  const Icon = icon === 'MarkerPin' ? MarkerPin : TimeClock;

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View style={[styles.container, pressed && styles.containerPressed]}>
          <View style={styles.iconContainer}>
            <Icon color={theme.colors.contentPrimary} />
          </View>
          <View style={styles.labelContainer}>
            <Text variant="body2" style={styles.label}>
              {label}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.small,
    alignItems: 'center',
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.small,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  containerPressed: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  iconContainer: {
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.borderPrimary,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: theme.spacing.small,
  },
  labelContainer: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
  },
}));
