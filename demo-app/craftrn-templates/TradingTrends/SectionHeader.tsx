import { Text } from '@/craftrn-ui/components/Text';
import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type Props = {
  title: string;
  onPressSeeMore?: () => void;
  iconLeft?: ReactNode;
};

export const SectionHeader = ({ title, onPressSeeMore, iconLeft }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {iconLeft && <View style={styles.iconContainer}>{iconLeft}</View>}
        <Text variant="heading3">{title}</Text>
      </View>
      {onPressSeeMore && (
        <Text
          variant="body2"
          color="contentAccent"
          style={styles.action}
          onPress={onPressSeeMore}
        >
          See more
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    paddingHorizontal: theme.spacing.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    fontWeight: 'bold',
  },
}));
