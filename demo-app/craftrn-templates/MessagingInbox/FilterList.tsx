import { Button } from '@/craftrn-ui/components/Button';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

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
  return (
    <View style={styles.filterContainer}>
      {filterOptions.map(filter => (
        <Button
          key={filter.key}
          size="small"
          onPress={() => onFilterChange(filter.key)}
          intent={activeFilter === filter.key ? 'primary' : 'secondary'}
        >
          {filter.label}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.large,
    paddingBottom: theme.spacing.medium,
    gap: theme.spacing.small,
  },
}));
