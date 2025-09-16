import { Text } from '@/craftrn-ui/components/Text';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const SectionHeader = ({ title }: { title: string }) => {
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

const styles = StyleSheet.create(theme => ({
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
