import { Text } from '@/craftrn-ui/components/Text';
import { ComponentType } from 'react';
import { StyleSheet } from 'react-native-unistyles';

export const SectionHeader: ComponentType<{ children: string }> = ({
  children,
}) => {
  return <Text style={styles.sectionHeader}>{children}</Text>;
};

const styles = StyleSheet.create(theme => ({
  sectionHeader: {
    ...theme.textVariants.body3,
    fontWeight: 'bold',
    color: theme.colors.contentTertiary,
    textTransform: 'uppercase',
    paddingHorizontal: theme.spacing.large,
  },
}));
