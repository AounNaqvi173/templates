import { Text } from '@/craftrn-ui/components/Text/Text';
import { ChevronDown } from '@/tetrisly-icons/ChevronDown';
import { ChevronUp } from '@/tetrisly-icons/ChevronUp';
import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const IMAGE_SIZE = 40;
type AssetGridItemProps = {
  label: string;
  change: string;
  imageURL: string;
  onPress: () => void;
};

export const AssetGridItem = ({
  label,
  change,
  imageURL,
  onPress,
}: AssetGridItemProps) => {
  const { theme } = useUnistyles();
  const isNegative = change.startsWith('-');

  const ChevronIcon = isNegative ? ChevronDown : ChevronUp;
  const chevronColor = isNegative
    ? theme.colors.sentimentNegative
    : theme.colors.sentimentPositive;

  return (
    <Pressable onPress={onPress} style={styles.pressableContainer}>
      {({ pressed }) => (
        <View style={[styles.contentContainer(pressed)]}>
          <Image source={{ uri: imageURL }} style={styles.image} />
          <Text variant="body2" style={styles.label}>
            {label}
          </Text>
          <View style={styles.changeContainer}>
            <ChevronIcon size={16} color={chevronColor} />
            <Text variant="body2" style={styles.changeText(isNegative)}>
              {change}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  pressableContainer: {
    width: '25%',
    padding: theme.spacing.xsmall,
  },
  contentContainer: (pressed: boolean) => ({
    alignItems: 'center',
    gap: theme.spacing.xsmall,
    padding: theme.spacing.small,
    backgroundColor: pressed
      ? theme.colors.interactiveNeutralPress
      : theme.colors.transparent,
    borderRadius: theme.borderRadius.large,
  }),
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.white,
  },
  label: {
    textAlign: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
  },
  changeText: (isNegative: boolean) => ({
    color: isNegative
      ? theme.colors.sentimentNegative
      : theme.colors.sentimentPositive,
  }),
}));
