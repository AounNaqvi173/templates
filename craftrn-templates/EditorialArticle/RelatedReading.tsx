import { Text } from '@/craftrn-ui/components/Text';
import React, { ComponentType, useCallback, useMemo } from 'react';
import { FlatList, Image, Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { EditorialArticleItem, editorialArticlesData } from './data/articles';

const CARD_WIDTH = 220;
const CARD_HEIGHT = 160;

type CardProps = EditorialArticleItem & {
  onPress: () => void;
};

export const RelatedReadingCard: ComponentType<CardProps> = ({
  imageURL,
  title,
  description,
  onPress,
}: CardProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={cardStyles.cardContainer}>
        <View style={cardStyles.card}>
          <Image source={{ uri: imageURL }} style={cardStyles.cardImage} />
        </View>
        <View style={cardStyles.cardContent}>
          <Text
            style={cardStyles.cardTitleText}
            variant="body2"
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text
            style={cardStyles.cardDescriptionText}
            variant="body3"
            numberOfLines={2}
          >
            {description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const cardStyles = StyleSheet.create(theme => ({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    gap: theme.spacing.small,
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
  },
  cardContainer: {
    width: CARD_WIDTH,
    gap: theme.spacing.xsmall,
  },
  cardImage: {
    flex: 1,
    borderRadius: theme.borderRadius.medium,
    resizeMode: 'cover',
  },
  cardContent: {
    gap: theme.spacing.xsmall,
  },
  cardTitleText: {
    fontWeight: 'bold',
  },
  cardDescriptionText: {
    paddingRight: theme.spacing.small,
  },
}));

type Props = {
  currentEditorialArticleId: string;
  onPress: (id: string) => void;
};

export const RelatedReading: ComponentType<Props> = ({
  currentEditorialArticleId,
  onPress,
}) => {
  const { theme } = useUnistyles();
  const EditorialArticles = useMemo(
    () =>
      editorialArticlesData
        .filter(item => item.id !== currentEditorialArticleId)
        .slice(0, 5),
    [currentEditorialArticleId],
  );

  const handlePress = useCallback(
    (id: string) => () => {
      onPress(id);
    },
    [onPress],
  );

  return (
    <FlatList<EditorialArticleItem>
      data={EditorialArticles}
      horizontal
      renderItem={({ item }) => (
        <RelatedReadingCard onPress={handlePress(item.id)} {...item} />
      )}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.title.toString()}
      style={styles.flatList}
      contentContainerStyle={styles.contentContainer}
      snapToInterval={CARD_WIDTH + theme.spacing.medium}
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create(theme => ({
  flatList: {
    paddingHorizontal: theme.spacing.large,
  },
  contentContainer: {
    paddingRight: theme.spacing.large * 2,
    gap: theme.spacing.medium,
  },
}));
