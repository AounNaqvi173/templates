import { useRouter } from 'expo-router';
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
import {
  PublishingCategory,
  publishingCategoryData,
} from '../../data/categories';
import { PublishingPostItem, publishingPostsData } from '../../data/posts';
import { Card } from './Card';
import { CATEGORY_ITEM_HEIGHT } from './Categories';
import { Header, HEADER_HEIGHT } from './Header';
import { VerticalCarousel, VerticalCarouselHandle } from './VerticalCarousel';

export const PublishingMainScreen: ComponentType = () => {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const scrollY = useSharedValue(0);
  const carouselRef = useRef<VerticalCarouselHandle>(null);
  const [selectedCategory, setSelectedCategory] = useState<
    PublishingCategory['title']
  >(publishingCategoryData[0].title);

  const filteredPostsData = useMemo(
    () =>
      publishingPostsData.filter(item =>
        item.categories.includes(selectedCategory),
      ),
    [selectedCategory],
  );

  const handlePressCategory = useCallback(
    (categoryTitle: PublishingCategory['title']) => {
      carouselRef.current?.scrollToTop();
      setSelectedCategory(categoryTitle);
    },
    [],
  );

  const handleScroll = (sharedValue: SharedValue<number>) => {
    'worklet';
    scrollY.value = sharedValue.value;
  };

  const handlePressItem = useCallback(
    (id: string) => () => {
      router.push({ pathname: '/publishing/post/[id]', params: { id } });
    },
    [router],
  );

  const renderPublishingItem = useCallback(
    ({ item }: ListRenderItemInfo<PublishingPostItem>) => (
      <Card item={item} onPress={handlePressItem(item.id)} />
    ),
    [handlePressItem],
  );

  return (
    <View style={styles.container}>
      <Header scrollY={scrollY} onCategoryChanged={handlePressCategory} />
      <View style={styles.carouselContainer}>
        <VerticalCarousel<PublishingPostItem>
          ref={carouselRef}
          offsetTop={
            HEADER_HEIGHT +
            CATEGORY_ITEM_HEIGHT +
            10 +
            UnistylesRuntime.insets.top
          }
          data={filteredPostsData}
          renderItem={renderPublishingItem}
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
