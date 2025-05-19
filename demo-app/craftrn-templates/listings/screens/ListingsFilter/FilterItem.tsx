import { Text } from '@/craftrn-ui/components/Text';
import { ComponentType, default as React } from 'react';
import { Pressable, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const config = {
  minHeight: 40,
} as const;

type FilterItemProps = {
  label: string;
  rightAccessory?: React.ReactElement;
  onPress?: () => void;
};

export const FilterItem: ComponentType<FilterItemProps> = ({
  rightAccessory = null,
  label,
  onPress,
}) => {
  const { styles } = useStyles(stylesheet);
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text variant="body2" style={styles.labelText}>
            {label}
          </Text>
        </View>
        {rightAccessory}
      </View>
    </Pressable>
  );
};

const stylesheet = createStyleSheet(theme => ({
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
