import { Avatar } from '@/craftrn-ui/components/Avatar';
import { Text } from '@/craftrn-ui/components/Text';
import { useHeaderHeight } from '@react-navigation/elements';
import React, { ComponentType, useMemo } from 'react';
import { ImageBackground, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { AnimatedHeader } from './AnimatedHeader';
import { editorialArticlesData } from './data/articles';
import { usersData } from './data/users';
import { Gradient } from './Gradient';
import { RelatedReading } from './RelatedReading';
import { formatDate } from './utils/date';

// Define the threshold for when the header should start appearing
const HEADER_ANIMATION_THRESHOLD = 200;
const GRADIENT_HEIGHT = 250;
const IMAGE_HEIGHT = 400;

type Props = {
  id: string;
};

export const EditorialArticleScreen: ComponentType<Props> = ({ id }) => {
  const { styles } = useStyles(stylesheet);
  const headerHeight = useHeaderHeight();
  // Initialize with 0 and ensure it's properly updated on scroll
  const scrollPosition = useSharedValue(0);
  // Create a scroll handler that updates the shared value
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      // Update the scroll position value with the current y offset
      scrollPosition.value = event.contentOffset.y;
    },
  });

  const article = useMemo(
    () => editorialArticlesData.find(item => item.id === id),
    [id],
  );

  const author = useMemo(
    () =>
      article?.authorId
        ? usersData.find(item => item.id === article?.authorId)
        : undefined,
    [article?.authorId],
  );

  if (!article || !author) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AnimatedHeader
        scrollPosition={scrollPosition}
        title={article.title}
        threshold={HEADER_ANIMATION_THRESHOLD}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16} // Ensure smooth animation by processing scroll events frequently
        style={styles.scrollView(0)}
        contentContainerStyle={{
          paddingBottom: UnistylesRuntime.insets.bottom,
        }}
      >
        <View style={styles.headingSection}>
          <ImageBackground
            style={styles.gradientOverlay}
            source={{ uri: article.imageURL }}
          >
            <Gradient height={GRADIENT_HEIGHT} />
            <View style={styles.postMetadata}>
              <Text
                color="contentSecondary"
                variant="body3"
                style={styles.postMetadataText}
              >
                {article.readingTime} min read • {formatDate(article.createdAt)}
              </Text>
              <Text variant="heading2">{article.title}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.contentSection}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{article.tags[0]}</Text>
          </View>

          <View>
            <Text variant="body2">{article.body}</Text>
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
              source={{ uri: author.avatarUri }}
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
            currentEditorialArticleId={article.id}
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
  headingSection: {
    height: IMAGE_HEIGHT,
  },
  scrollView: (headerHeight: number) => ({
    // Remove negative marginTop to prevent interference with AnimatedHeader
    marginTop: 0,
  }),
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
