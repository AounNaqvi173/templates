# AGENTS.md

## Template Purpose

Sophisticated accommodation booking interface with filtering, map integration, and location-based features. Use for property listings, hotel booking, or location-based search results.

**IMPORTANT:** Always reference `info.json` for exact dependencies and component structure.

This Stays Selection template provides a sophisticated accommodation browsing interface with card-based layouts, gesture handling, photo carousels, and interactive favorite functionality. It follows the **colocation** principle with listing-focused modular components.

### Core Components Structure

```
StaysSelection/
├── StaysSelectionScreen.tsx    # Main listing browser interface
├── ListingCard.tsx             # Individual accommodation card
├── HeartButton.tsx             # Favorite toggle component
└── data/
    └── stays.ts                # Accommodation data and types
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:

- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `ButtonRound`, `InputSearch`, `PhotoCarousel` for card components
- `Text` components with typography scaling
- Advanced touch interactions with `react-native-gesture-handler`
- Smooth transitions with `react-native-reanimated`

## Data Structure & API Integration

### Mock Data Model

```typescript
interface StaysItem {
  id: string;
  title: string;
  hostType: string;
  pricePerNight: string;
  rating: number;
  photos: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  amenities: string[];
  availability: {
    checkin: string;
    checkout: string;
  };
}
```

### API Integration with React Query

Recommended pattern for infinite listings:

```typescript
// api/useStaysListing.ts
export const useStaysListing = (filters?: StaysFilters) => {
  return useInfiniteQuery({
    queryKey: ['stays', 'list', filters],
    queryFn: ({ pageParam = 0 }) => {
      const params = new URLSearchParams({
        page: pageParam.toString(),
        limit: '20',
        ...(filters && {
          destination: filters.destination || '',
          minPrice: filters.priceRange?.min.toString() || '',
        }),
      });
      return fetch(`/api/stays?${params}`).then(r => r.json());
    },
    getNextPageParam: lastPage => {
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// api/useFavoriteStays.ts
export const useFavoriteStays = () => {
  return useMutation({
    mutationFn: ({ stayId, liked }: { stayId: string; liked: boolean }) =>
      fetch(`/api/stays/${stayId}/favorite`, {
        method: liked ? 'POST' : 'DELETE',
      }),
    onMutate: async ({ stayId, liked }) => {
      // Optimistically update UI immediately
      queryClient.setQueriesData({ queryKey: ['stays'] }, (oldData: any) => {
        // Update cached data with new favorite status
      });
    },
  });
};
```

## Template Customization Patterns

### Card-Based Layout Pattern

Interactive listing cards with embedded actions:

```typescript
const ListingCard = ({ item, onPress, onFavorite }) => (
  <View style={styles.card}>
    <PhotoCarousel
      photos={item.photos}
      carouselHeight={PHOTO_HEIGHT}
    />
    <HeartButton
      liked={item.isFavorited}
      onPress={(liked) => onFavorite(item.id, liked)}
      style={styles.favoriteButton}
    />
    <View style={styles.contentSection}>
      <Text variant="body2">{item.title}</Text>
      <Text variant="body3">{item.hostType}</Text>
      <PriceDisplay price={item.pricePerNight} />
    </View>
  </View>
);
```

### Gesture Integration Pattern

Advanced gesture handling for card interactions:

```typescript
const cardPress = Gesture.Tap().onStart(() => runOnJS(onPress)());

const favoritePress = Gesture.Tap().onStart(() => runOnJS(onFavorite)());

// Ensure favorite button takes priority over card press
const compositeGesture = Gesture.Simultaneous(
  cardPress.requireExternalGestureToFail(favoritePress),
  favoritePress,
);
```

## Template Extension & Reuse Patterns

### Listing Interface Variations

This template can be adapted for different listing and selection scenarios:

1. **Car Rental Selection**: Vehicle cards with features, pricing, availability
2. **Flat Rental Selection**: Property cards with room details, lease terms
3. **Property Sales Selection**: Home cards with specs, pricing, market data
4. **Job Listings**: Job cards with company info, salary, requirements
5. **Product Catalog**: Product cards with images, reviews, pricing

### Content Adaptation Examples

Different listing types require specific card structures:

```typescript
// Car rental selection adaptation
type CarListing = {
  make: string;
  model: string;
  year: number;
  features: string[];
  pricePerDay: number;
  availability: boolean;
  images: string[];
};

// Job listing selection adaptation
type JobListing = {
  title: string;
  company: string;
  location: string;
  salary: { min: number; max: number };
  requirements: string[];
  postedDate: string;
};
```

### Adding New Features

- **Map Integration**: Toggle between list view and map view with markers
- **Advanced Filtering**: Dynamic filter categories and smart suggestions
- **Personalization**: Recommendation engine and recently viewed tracking
- **Infinite Scroll**: Progressive loading with virtualization
- **Gesture Navigation**: Swipe actions for quick favoriting or booking

### Customization Guidelines

- Follow existing ListingCard component patterns for consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui PhotoCarousel for image galleries
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain HeartButton interaction patterns for favorite functionality
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve gesture handling patterns for optimal touch experience
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep infinite scroll and performance optimization patterns
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
