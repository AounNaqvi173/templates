import { Text } from '@/craftrn-ui/components/Text';
import { ComponentType } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export const SectionHeader: ComponentType<{ children: string }> = ({
  children,
}) => {
  const { styles } = useStyles(stylesheet);
  return <Text style={styles.sectionHeader}>{children}</Text>;
};

const stylesheet = createStyleSheet(theme => ({
  sectionHeader: {
    ...theme.textVariants.body3,
    fontWeight: 'bold',
    color: theme.colors.contentTertiary,
    textTransform: 'uppercase',
  },
}));
