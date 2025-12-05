import { Text } from '@/craftrn-ui/components/Text';
import { ComponentType, default as React } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const config = {
  minHeight: 40,
} as const;

type FilterItemProps = {
  label: string;
  itemRight?: React.ReactElement;
  onPress?: () => void;
};

export const FilterItem: ComponentType<FilterItemProps> = ({
  itemRight = null,
  label,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text variant="body2" style={styles.labelText}>
            {label}
          </Text>
        </View>
        {itemRight}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    minHeight: config.minHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelContainer: {
    flexDirection: 'row',
    gap: theme.spacing.small,
  },
  labelText: {
    fontWeight: 'bold',
  },
}));
