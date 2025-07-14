import React, {
  ComponentType,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { Card } from './Card';
import { CATEGORY_ITEM_HEIGHT } from './Categories';
import { EditorialArticleItem, editorialArticlesData } from './data/articles';
import { EditorialCategory, EditorialCategoryData } from './data/categories';
import { Header, HEADER_HEIGHT } from './Header';
import { VerticalCarousel, VerticalCarouselHandle } from './VerticalCarousel';

type Props = {
  onPressArticle: (id: string) => () => void;
};

export const EditorialFeedScreen: ComponentType<Props> = ({
  onPressArticle,
}) => {
  const { styles } = useStyles(stylesheet);
  const scrollY = useSharedValue(0);
  const carouselRef = useRef<VerticalCarouselHandle>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    EditorialCategory['title']
  >(EditorialCategoryData[0].title);

  const filteredPostsData = useMemo(
    () =>
      editorialArticlesData.filter(item =>
        item.categories.includes(selectedCategory),
      ),
    [selectedCategory],
  );

  const handlePressCategory = useCallback(
    (categoryTitle: EditorialCategory['title']) => {
      carouselRef.current?.scrollToTop();
      setSelectedCategory(categoryTitle);
    },
    [],
  );

  const handleScroll = (sharedValue: SharedValue<number>) => {
    'worklet';
    scrollY.value = sharedValue.value;
  };

  const renderCardItem = useCallback(
    ({ item }: ListRenderItemInfo<EditorialArticleItem>) => (
      <Card item={item} onPress={onPressArticle(item.id)} />
    ),
    [onPressArticle],
  );

  return (
    <View style={styles.container}>
      <Header scrollY={scrollY} onCategoryChanged={handlePressCategory} />
      <View style={styles.carouselContainer}>
        <VerticalCarousel<EditorialArticleItem>
          ref={carouselRef}
          offsetTop={
            HEADER_HEIGHT +
            CATEGORY_ITEM_HEIGHT +
            10 +
            UnistylesRuntime.insets.top
          }
          data={filteredPostsData}
          renderItem={renderCardItem}
          onScroll={handleScroll}
        />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  carouselContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.large,
  },
}));
