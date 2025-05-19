import { Avatar } from '@/craftrn-ui/components/Avatar';
import { buttonRoundConfig } from '@/craftrn-ui/components/ButtonRound';
import { Text } from '@/craftrn-ui/components/Text';
import { useHeaderHeight } from '@react-navigation/elements';
import { useLocalSearchParams } from 'expo-router';
import React, { ComponentType, useMemo } from 'react';
import { ImageBackground, Platform, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { publishingPostsData } from '../../data/posts';
import { usersData } from '../../data/users';
import { formatDate } from '../../utils/date';
import { RelatedReading } from './RelatedReading';

const modalCardTopOffset = Platform.select({
  ios: 10, // This value is a constant for all types of iOS devices
  default: 0,
});

const useModalCardHeaderHeight = () => {
  const headerHeight = useHeaderHeight();
  return UnistylesRuntime.insets.top + modalCardTopOffset + headerHeight;
};

const IMAGE_HEIGHT = 400;
const GRADIENT_HEIGHT = 250;

const GradientComponent = () => {
  const { theme } = useStyles();
  return (
    <Svg height={GRADIENT_HEIGHT} width="100%">
      <Defs>
        <LinearGradient id="headerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop
            offset="0%"
            stopColor={theme.colors.backgroundSecondary}
            stopOpacity="0"
          />
          <Stop
            offset="90%"
            stopColor={theme.colors.backgroundSecondary}
            stopOpacity="1"
          />
        </LinearGradient>
      </Defs>
      <Rect
        x="0"
        y="0"
        width="100%"
        height={GRADIENT_HEIGHT}
        fill="url(#headerGradient)"
      />
    </Svg>
  );
};

export const PublishingPostScreen: ComponentType = () => {
  const { styles, theme } = useStyles(stylesheet);
  const { id } = useLocalSearchParams<{ id: string }>();
  const headerHeight = useHeaderHeight();
  const modalHeaderHeight = useModalCardHeaderHeight();
  const scrollPosition = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollPosition.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        scrollPosition.value,
        [0, GRADIENT_HEIGHT, GRADIENT_HEIGHT + 50],
        [0, 0, 1],
      ),
    }),
    [scrollPosition],
  );

  const publishingPost = useMemo(
    () => publishingPostsData.find(item => item.id === id),
    [id],
  );

  const author = useMemo(
    () =>
      publishingPost?.authorId
        ? usersData.find(item => item.id === publishingPost?.authorId)
        : undefined,
    [publishingPost?.authorId],
  );

  if (!publishingPost || !author) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          headerAnimatedStyle,
          {
            marginTop: -headerHeight,
            paddingLeft:
              theme.spacing.large * 2 + buttonRoundConfig.buttonSizeMedium,
            height: headerHeight,
          },
        ]}
      >
        <Text style={styles.headerTitle} numberOfLines={1}>
          {publishingPost.title}
        </Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        style={{ marginTop: -headerHeight }}
        contentContainerStyle={{
          paddingBottom: modalHeaderHeight,
        }}
      >
        <View style={styles.headingSection}>
          <ImageBackground
            style={styles.gradientOverlay}
            source={{ uri: publishingPost.imageURL }}
          >
            <GradientComponent />
            <View style={styles.postMetadata}>
              <Text
                color="contentSecondary"
                variant="body3"
                style={styles.postMetadataText}
              >
                {publishingPost.readingTime} min read •{' '}
                {formatDate(publishingPost.createdAt)}
              </Text>
              <Text variant="heading2">{publishingPost.title}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.contentSection}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{publishingPost.tags[0]}</Text>
          </View>

          <View>
            <Text variant="body2">{publishingPost.body}</Text>
          </View>

          <View style={styles.authorCard}>
            <View style={styles.authorCardTextContainer}>
              <Text variant="body2" style={styles.authorCardName}>
                Written by {author.name}
              </Text>
              <Text color="contentSecondary" variant="body3">
                {author.jobTitle} at {author.companyName}
              </Text>
            </View>
            <Avatar
              fallbackInitials={author.initials}
              fallbackColor={author.avatarColor}
              uri={author.avatarUri}
              size="large"
            />
          </View>
        </View>

        <View style={styles.relatedSection}>
          <View style={styles.relatedHeaderContainer}>
            <Text style={styles.relatedHeaderText}>Keep reading</Text>
          </View>
          <RelatedReading
            onPress={() => {}}
            currentPublishingPostId={publishingPost.id}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  header: {
    paddingRight: theme.spacing.large,
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.backgroundPrimary,
    zIndex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  headingSection: {
    height: IMAGE_HEIGHT,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  postMetadata: {
    position: 'absolute',
    bottom: theme.spacing.large,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.large,
    gap: theme.spacing.medium,
  },
  postMetadataText: {
    fontWeight: 'bold',
  },
  tag: {
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.imperialBlueStrong,
    alignSelf: 'flex-start',
  },
  tagText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  authorCard: {
    paddingLeft: theme.spacing.medium,
    paddingRight: theme.spacing.small,
    paddingVertical: theme.spacing.small,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: theme.colors.borderPrimary,
    backgroundColor: theme.colors.backgroundPrimary,
    flexDirection: 'row',
    gap: theme.spacing.medium,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorCardTextContainer: {
    gap: theme.spacing.xsmall,
  },
  authorCardName: {
    fontWeight: 'bold',
  },
  contentSection: {
    paddingHorizontal: theme.spacing.large,
    gap: theme.spacing.xlarge,
  },
  relatedSection: {
    marginTop: theme.spacing.xxlarge,
    gap: theme.spacing.medium,
  },
  relatedHeaderContainer: {
    paddingHorizontal: theme.spacing.large,
  },
  relatedHeaderText: {
    ...theme.textVariants.heading3,
    color: theme.colors.contentPrimary,
  },
}));
