# Editorial Article Template - AI Customization Guide


**NOTE:** Always reference the `info.json` file in this template directory to understand the exact dependencies, components, and file structure before making any recommendations.
## Template Purpose & Architecture

This Editorial Article template provides a premium reading experience for long-form content with immersive hero images, animated header transitions, and elegant typography. It follows the **colocation** principle with feature-focused modular components.

### Core Components Structure

```
EditorialArticle/
├── EditorialArticleScreen.tsx          # Main article container with scroll handling
├── HeaderTitle.tsx                     # Dynamic navigation header
├── AnimatedHeader.tsx                  # Scroll-triggered header animations
├── Gradient.tsx                        # Hero image overlay component
├── RelatedReading.tsx                  # Content discovery section
├── data/                              # Mock articles, authors, categories
└── utils/date.ts                      # Date formatting utilities
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:
- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `Avatar` for author profiles
- `Text` with semantic variants (heading2, body2, body3)
- `Card` for related content sections
- Scroll-based animations with Reanimated

## Key Patterns for AI Customization

### 1. Animated Header System

- **Parallax Hero Image**: Full-screen background with gradient overlay
- **Progressive Header Reveal**: Navigation appears based on scroll position
- **Threshold Animation**: Uses 200px scroll threshold for smooth transitions
- **Shared Values**: Reanimated scroll tracking for performance

### 2. Content Structure Pattern

- **Hero Section**: Full-width image with title and metadata overlay
- **Typography Focus**: Optimized reading experience with proper hierarchy
- **Author Integration**: Author card with credibility information
- **Related Content**: Intelligent content discovery system

### 3. Scroll Animation Pattern

- **useAnimatedScrollHandler**: Optimized scroll event processing
- **useDerivedValue**: Computed animation states
- **Content Threshold**: Clean animation state management

## Data Structure & API Integration

### Mock Data Model

```typescript
type EditorialArticleItem = {
  id: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  views: number;
  shares: number;
  createdAt: string;
  imageURL: string;
  authorId: string;
  readingTime: number;
  body: string;
};

type User = {
  id: string;
  name: string;
  jobTitle: string;
  companyName: string;
  avatarUri?: string;
  initials: string;
  avatarColor: string;
};
```

### API Integration with React Query

Recommended pattern for editorial content:

```typescript
// api/useArticle.ts
export const useArticle = (articleId: string) => {
  return useQuery({
    queryKey: ['article', articleId],
    queryFn: () => fetch(`/api/articles/${articleId}`).then(r => r.json()),
  });
};

// api/useRelatedArticles.ts
export const useRelatedArticles = (articleId: string, categories: string[]) => {
  return useQuery({
    queryKey: ['relatedArticles', articleId, categories],
    queryFn: () => fetch(`/api/articles/related?id=${articleId}&categories=${categories.join(',')}`).then(r => r.json()),
  });
};
```

## Template Customization Patterns

### Scroll Animation Pattern

Smooth scroll-based header reveal:

```typescript
const useScrollAnimation = (threshold: number) => {
  const scrollPosition = useSharedValue(0);
  const isHeaderVisible = useDerivedValue(() => 
    scrollPosition.value > threshold
  );
  // Use existing animation patterns in AnimatedHeader.tsx
};
```

### Hero Image Pattern

Full-screen hero with gradient overlay:

```typescript
const HeroSection = ({ imageURL, title, author }) => (
  <View style={styles.hero}>
    <Image source={{ uri: imageURL }} style={styles.heroImage} />
    <Gradient style={styles.overlay} />
    // Content overlay with title and metadata
  </View>
);
```

## Template Extension & Reuse Patterns

### CMS Integration Options

Connect to headless CMS platforms:

```typescript
// Contentful, Strapi, Sanity, or Ghost CMS integration
// Follow existing React Query patterns for data fetching
```

### Template Reuse Examples

This Editorial Article template can be adapted for:

1. **News Articles**: Add breaking news indicators and urgency levels
2. **Technical Documentation**: Include code blocks and interactive examples
3. **Blog Posts**: Add comment systems and social sharing
4. **Academic Papers**: Include citations and reference management
5. **Product Reviews**: Add rating systems and comparison features

### Adding New Features

- **Reading Progress**: Visual progress indicators during scroll
- **Social Sharing**: Native sharing integration with platforms
- **Bookmarking**: Save articles for offline reading
- **Comments System**: Reader engagement and discussion
- **Search Highlighting**: Highlight search terms in content

### Customization Guidelines

- Follow existing scroll animation patterns in AnimatedHeader
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui Typography variants for consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain hero image aspect ratios and overlay patterns
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve reading flow and content hierarchy
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep Reanimated performance optimizations
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain feature-based file colocation - group related files together rather than separating by type (avoid generic `hooks/`, `components/` folders unless shared across multiple features)

## TypeScript Rules

**STRICT TYPING REQUIREMENTS:**
- NEVER use `any` type - always provide specific types
- NEVER use TypeScript type assertions (`as Type`, `<Type>value`) or casts
- Use proper type definitions and interfaces
- Use type guards and narrowing instead of assertions


## Dependencies & File Structure

Refer to `info.json` in this template directory for:
- `externalDependencies`: Required npm packages
- `craftrnUiComponents`: craftrn-ui components used
- `tetrislyIcons`: Icons from tetrisly icon set
- `fileStructure`: Complete component hierarchy and organization
