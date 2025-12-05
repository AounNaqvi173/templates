import { Text } from '@/craftrn-ui/components/Text';
import { Eye } from '@/tetrisly-icons/Eye';
import { Share } from '@/tetrisly-icons/Share';
import React, { ComponentType, useMemo } from 'react';
import { Image, Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { EditorialArticleItem } from './data/articles';
import { usersData } from './data/users';
import { formatRelativeDate } from './utils/date';

type IconWithTextProps = {
  text: string;
  icon: 'Eye' | 'Share';
};

const IconWithText: ComponentType<IconWithTextProps> = ({ text, icon }) => {
  const { theme } = useUnistyles();
  const Icon = icon === 'Eye' ? Eye : Share;
  return (
    <View style={iconWithTextStyles.container}>
      <Icon color={theme.colors.contentPrimary} size={14} />
      <Text variant="body3">{text}</Text>
    </View>
  );
};

const iconWithTextStyles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.small,
    alignItems: 'center',
  },
}));

type Props = {
  item: EditorialArticleItem;
  onPress: (id: EditorialArticleItem['id']) => void;
};

export const Card: ComponentType<Props> = ({ item, onPress }) => {
  const author = useMemo(
    () =>
      (item?.authorId
        ? usersData.find(user => user.id === item?.authorId)
        : undefined) ?? { name: 'Unknown' },
    [item?.authorId],
  );

  return (
    <Pressable onPress={() => onPress(item.id)} style={styles.container}>
      <View key={item.id} style={styles.card}>
        <View style={styles.cardImageContainer}>
          {/* Using a library like react-native-fast-image can prevent the image from being refetched */}
          <Image source={{ uri: item.imageURL }} style={styles.cardImage} />
          <View style={styles.cardTitleContainer}>
            <Text variant="heading3">{item.title}</Text>
            <Text variant="body3" color="contentTertiary">
              {author.name} • {formatRelativeDate(item.createdAt)}
            </Text>
          </View>
          <Text
            variant="body2"
            style={styles.cardDescriptionText}
            numberOfLines={5}
          >
            {item.description}
          </Text>
        </View>
        <View style={styles.cardFooter}>
          <IconWithText text={item.views.toLocaleString()} icon="Eye" />
          <IconWithText text={item.shares.toLocaleString()} icon="Share" />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: theme.borderRadius.large,
    borderWidth: 1,
    borderColor: theme.colors.borderNeutral,
    overflow: 'hidden',
    backgroundColor: theme.colors.backgroundElevated,
    padding: theme.spacing.xsmall,
  },
  cardImageContainer: {
    gap: theme.spacing.small,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderRadius: theme.borderRadius.large - theme.spacing.xsmall,
  },
  cardTitleContainer: {
    paddingHorizontal: theme.spacing.small,
  },
  cardDescriptionText: {
    padding: theme.spacing.small,
  },
  cardFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    gap: theme.spacing.large,
    flexDirection: 'row',
  },
}));
