import { Button } from '@/craftrn-ui/components/Button';
import { ButtonRound } from '@/craftrn-ui/components/ButtonRound';
import { PhotoCarousel } from '@/craftrn-ui/components/PhotoCarousel';
import { Text } from '@/craftrn-ui/components/Text';
import { StarFilled } from '@/tetrisly-icons/StarFilled';
import { Upload } from '@/tetrisly-icons/Upload';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import React, { ComponentType, useLayoutEffect, useMemo } from 'react';
import { Share, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { Shadow } from '../../components/Shadow';
import { listingsData } from '../../data/listings';

const CAROUSEL_HEIGHT = 300;

export const ListingsDetailsScreen: ComponentType = () => {
  const navigation = useNavigation();
  const { styles, theme } = useStyles(stylesheet);
  const headerHeight = useHeaderHeight();
  const { id } = useLocalSearchParams<{ id: string }>();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollPosition = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollPosition.value = event.contentOffset.y;
  });

  const carouselAnimatedStyle = useAnimatedStyle(() => {
    // Only apply scaling when scroll position is negative (pull down)
    const scale =
      scrollPosition.value < 0
        ? interpolate(scrollPosition.value, [-100, 0], [1.7, 1], 'clamp')
        : 1;

    return {
      transform: [{ scale }],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        scrollPosition.value,
        [0, CAROUSEL_HEIGHT - 100, CAROUSEL_HEIGHT - 50],
        [0, 0, 1],
      ),
    }),
    [scrollPosition],
  );

  const listingItem = useMemo(
    () => listingsData.find(item => item.id === id),
    [id],
  );

  const handleShare = async () => {
    await Share.share({
      message: listingItem?.title ?? '',
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <ButtonRound
            renderContent={({ iconSize }) => (
              <Upload color={theme.colors.contentPrimary} size={iconSize} />
            )}
            onPress={handleShare}
          />
        </View>
      ),
    });
  }, [navigation, styles.headerRight, theme.colors.contentPrimary]);

  if (!listingItem) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.header({ headerHeight }), headerAnimatedStyle]}
      />
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={scrollHandler}
        style={{ marginTop: -headerHeight }}
      >
        <Animated.View
          style={[styles.carouselContainer, carouselAnimatedStyle]}
        >
          <PhotoCarousel
            photos={listingItem.photos}
            carouselHeight={CAROUSEL_HEIGHT}
            dotsStyle={{
              bottom: theme.spacing.medium + theme.borderRadius.xlarge,
            }}
          />
        </Animated.View>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text variant="heading3">{listingItem.title}</Text>
          </View>
          <View style={styles.metaContainer}>
            <StarFilled color={theme.colors.contentPrimary} size={12} />
            <Text variant="body3">
              {listingItem.rating} · Great ·{' '}
              <Text
                variant="body3"
                color="contentAccent"
                style={styles.reviewLink}
                onPress={() => {}}
              >
                210 reviews
              </Text>
            </Text>
          </View>
          <View style={styles.contentSection}>
            <View style={styles.sectionContainer}>
              <Text variant="heading3">About this place</Text>
              <Text variant="body2">{listingItem.description}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text variant="heading3">Popular amenities</Text>
              <View style={styles.amenitiesList}>
                {listingItem.amenities.map(amenity => (
                  <Text key={amenity} variant="body2">
                    • {amenity}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text variant="heading3">Policies</Text>
              <View style={styles.amenitiesList}>
                <Text variant="body2">
                  <Text variant="body2" style={styles.boldText}>
                    Check-in:
                  </Text>{' '}
                  {listingItem.checkInPolicy}
                </Text>
                <Text variant="body2">
                  <Text variant="body2" style={styles.boldText}>
                    Check-out:
                  </Text>{' '}
                  {listingItem.checkOutPolicy}
                </Text>
                <Text variant="body2">
                  <Text variant="body2" style={styles.boldText}>
                    Cancellation:
                  </Text>{' '}
                  {listingItem.cancellationPolicy}
                </Text>
                <Text variant="body2">
                  <Text variant="body2" style={styles.boldText}>
                    Pet:
                  </Text>{' '}
                  {listingItem.petPolicy}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerShadow}>
          <Shadow />
        </View>
        <View
          style={[
            styles.footerContent,
            { paddingBottom: UnistylesRuntime.insets.bottom },
          ]}
        >
          <View>
            <Text variant="body3">From</Text>
            <Text variant="body1">
              <Text variant="heading3">{listingItem.pricePerNight}</Text> per
              night
            </Text>
          </View>
          <Button onPress={() => {}}>Check availability</Button>
        </View>
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  headerRight: {
    marginTop: theme.spacing.xxsmall,
  },
  header: ({ headerHeight }: { headerHeight: number }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundPrimary,
    zIndex: 1,
    marginTop: -headerHeight,
    height: headerHeight,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderPrimary,
  }),
  carouselContainer: {
    backgroundColor: theme.colors.backgroundTertiary,
  },
  contentContainer: {
    flex: 1,
    borderRadius: theme.borderRadius.large,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingHorizontal: theme.spacing.large,
    transform: [{ translateY: -theme.borderRadius.xlarge }],
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.medium,
    paddingBottom: theme.spacing.xxsmall,
  },
  metaContainer: {
    gap: theme.spacing.xsmall,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentSection: {
    paddingTop: theme.spacing.xlarge,
    gap: theme.spacing.xlarge,
  },
  sectionContainer: {
    gap: theme.spacing.small,
  },
  amenitiesList: {
    gap: theme.spacing.small,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSecondary,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    position: 'relative',
  },
  footerShadow: {
    position: 'absolute',
    top: -10,
    left: 0,
    right: 0,
    height: 10,
    opacity: 0.07,
  },
  footerContent: {
    flexDirection: 'row',
    gap: theme.spacing.small,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  reviewLink: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
}));
