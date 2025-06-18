import { Button } from '@/craftrn-ui/components/Button';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export type Filter = 'all' | 'unread' | 'favourites';

const filterOptions: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'favourites', label: 'Favourites' },
];

export const FilterList = ({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.filterContainer}>
      {filterOptions.map(filter => (
        <Button
          key={filter.key}
          size="small"
          onPress={() => onFilterChange(filter.key)}
          variant={activeFilter === filter.key ? 'primary' : 'secondary'}
        >
          {filter.label}
        </Button>
      ))}
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.large,
    paddingBottom: theme.spacing.medium,
    gap: theme.spacing.small,
  },
}));
