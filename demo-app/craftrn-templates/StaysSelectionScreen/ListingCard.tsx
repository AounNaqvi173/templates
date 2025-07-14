import { PhotoCarousel } from '@/craftrn-ui/components/PhotoCarousel';
import { Text } from '@/craftrn-ui/components/Text';
import { StarFilled } from '@/tetrisly-icons/StarFilled';
import { ComponentType, default as React } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { StaysItem } from './data/stays';
import { HeartButton } from './HeartButton';

type ListingCardProps = {
  item: StaysItem;
  onPress: () => void;
};

const PHOTO_ITEM_HEIGHT = 250;

export const ListingCard: ComponentType<ListingCardProps> = ({
  item,
  onPress,
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const pressHeart = Gesture.Tap();
  const handlePress = Gesture.Tap()
    .onStart(() => {
      runOnJS(onPress)();
    })
    .requireExternalGestureToFail(pressHeart);

  return (
    <GestureDetector gesture={handlePress}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.carouselContainer}>
            <PhotoCarousel
              photos={item.photos}
              carouselHeight={PHOTO_ITEM_HEIGHT}
            />
          </View>
          <View style={styles.heartButtonContainer}>
            <GestureDetector gesture={pressHeart}>
              <HeartButton />
            </GestureDetector>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text variant="body2" style={styles.title}>
              {item.title}
            </Text>
            <Text variant="body3" color="contentSecondary">
              {item.hostType}
            </Text>
            <Text variant="body3" color="contentSecondary">
              <Text variant="body2" style={styles.pricePerNight}>
                {item.pricePerNight}
              </Text>
              {' per night'}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <StarFilled color={theme.colors.contentPrimary} size={12} />
            <Text variant="body3">{item.rating}</Text>
          </View>
        </View>
      </View>
    </GestureDetector>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    gap: theme.spacing.small,
  },
  imageContainer: {
    position: 'relative',
  },
  carouselContainer: {
    borderRadius: theme.borderRadius.large,
    overflow: 'hidden',
    backgroundColor: theme.colors.backgroundTertiary,
  },
  heartButtonContainer: {
    position: 'absolute',
    right: 36,
    top: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexShrink: 1,
    gap: theme.spacing.xsmall,
  },
  title: {
    fontWeight: 'bold',
  },
  pricePerNight: {
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: theme.spacing.xsmall,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: theme.spacing.xsmall,
    marginLeft: theme.spacing.medium,
  },
}));
