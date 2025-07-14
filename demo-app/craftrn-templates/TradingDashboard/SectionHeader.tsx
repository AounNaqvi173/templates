import { Text } from '@/craftrn-ui/components/Text';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const SectionHeader = ({ title }: { title: string }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <Text variant="heading3">{title}</Text>
      <Text
        variant="body2"
        color="contentAccent"
        style={styles.action}
        onPress={() => {}}
      >
        See more
      </Text>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    paddingHorizontal: theme.spacing.large,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  action: {
    fontWeight: 'bold',
  },
}));
