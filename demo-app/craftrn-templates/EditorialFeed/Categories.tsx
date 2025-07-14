import { Text } from '@/craftrn-ui/components/Text';
import React, { ComponentType, useCallback, useRef } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { EditorialCategory, EditorialCategoryData } from './data/categories';

export const CATEGORY_ITEM_HEIGHT = 40;

type CategoryItemProps = EditorialCategory & {
  selected: boolean;
  onPress: () => void;
};

export const CategoryItem = ({
  title,
  selected,
  onPress,
}: CategoryItemProps) => {
  const { styles } = useStyles(categoryItemStylesheet);

  return (
    <View style={[styles.container, selected && styles.selectedContainer]}>
      <Pressable onPress={onPress} hitSlop={4} style={styles.touchable}>
        <View style={styles.contentContainer}>
          <Text
            variant="body2"
            color={selected ? 'contentAccent' : 'contentSecondary'}
          >
            {title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const categoryItemStylesheet = createStyleSheet(theme => ({
  container: {
    height: CATEGORY_ITEM_HEIGHT,
    marginHorizontal: theme.spacing.xsmall,
    paddingHorizontal: theme.spacing.small,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedContainer: {
    borderBottomColor: theme.colors.contentAccent,
  },
  touchable: {
    height: CATEGORY_ITEM_HEIGHT,
  },
  contentContainer: {
    height: CATEGORY_ITEM_HEIGHT,
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing.small,
    gap: theme.spacing.xsmall,
  },
}));

type Props = {
  selectedCategoryTitle: EditorialCategory['title'];
  onPress: (categoryTitle: EditorialCategory['title']) => void;
};

export const Categories: ComponentType<Props> = ({
  onPress,
  selectedCategoryTitle,
}) => {
  const { styles } = useStyles(categoriesStylesheet);
  const flatListRef = useRef<FlatList<EditorialCategory>>(null);

  const handlePressCategory = useCallback(
    ({ item, index }: { item: EditorialCategory; index: number }) =>
      () => {
        onPress(item.title);
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index,
            animated: true,
          });
        }
      },
    [onPress],
  );

  return (
    <FlatList<EditorialCategory>
      ref={flatListRef}
      data={EditorialCategoryData}
      horizontal
      renderItem={({ item, index }) => (
        <CategoryItem
          {...item}
          selected={item.title === selectedCategoryTitle}
          onPress={handlePressCategory({ item, index })}
        />
      )}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.title.toString()}
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      decelerationRate="fast"
    />
  );
};

const categoriesStylesheet = createStyleSheet(theme => ({
  list: {
    paddingHorizontal: theme.spacing.medium,
  },
  contentContainer: {
    paddingRight: theme.spacing.medium * 2,
  },
}));
