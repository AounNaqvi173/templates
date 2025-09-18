# AGENTS.md

## Template Purpose

Sophisticated search interface for accommodations with filtering, location search, and results display. Use for property search, location-based discovery, or filtered content browsing.

**IMPORTANT:** Always reference `info.json` for exact dependencies and component structure.

This Stays Search template provides a sophisticated destination search interface with real-time filtering, sectioned results display, and intelligent keyboard handling. It follows the **colocation** principle with search-focused modular components.

### Core Components Structure

```
StaysSearch/
├── StaysSearchScreen.tsx     # Main search interface
├── DestinationItem.tsx       # Individual destination row component
└── data/
    └── destinations.ts       # Search data and types
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:

- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `InputSearch` for search input with accessories
- `Text` components with typography scaling
- Advanced keyboard handling with `react-native-keyboard-controller`
- Platform-specific keyboard offset calculations

## Data Structure & API Integration

### Mock Data Model

```typescript
interface Destination {
  id: string;
  label: string;
  icon: 'MarkerPin' | 'TimeClock';
  category: 'recent' | 'popular' | 'suggested';
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  metadata?: {
    country: string;
    region: string;
  };
}
```

### API Integration with React Query

Recommended pattern for destination search:

```typescript
// api/useDestinationSearch.ts
export const useDestinationSearch = (query: string) => {
  const debouncedQuery = useDebounce(query, 300);

  return useQuery({
    queryKey: ['destinations', 'search', debouncedQuery],
    queryFn: () => {
      if (!debouncedQuery.trim()) return null;
      return fetch(
        `/api/destinations/search?q=${encodeURIComponent(debouncedQuery)}`,
      ).then(r => r.json());
    },
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Recent searches management
export const useRecentSearches = () => {
  return useMutation({
    mutationFn: (destination: Destination) =>
      fetch('/api/user/recent-searches', {
        method: 'POST',
        body: JSON.stringify({ destination }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['recent-searches']);
    },
  });
};
```

## Template Customization Patterns

### Search Input with Accessories Pattern

Enhanced search input with contextual controls:

```typescript
const SearchHeader = ({ value, onChangeText, onFocus }) => (
  <InputSearch
    placeholder="Destination or hotel name"
    leftAccessory={<Search color={theme.colors.contentTertiary} />}
    rightAccessory={value ? <ClearButton onPress={() => onChangeText('')} /> : null}
    value={value}
    onChangeText={onChangeText}
    autoFocus
    returnKeyType="search"
  />
);
```

### Sectioned Results Pattern

Dynamic section switching based on search state:

```typescript
const sections = useMemo(
  () =>
    search !== ''
      ? [{ title: 'Search Results', data: filteredDestinations }]
      : [
          { title: 'Recent searches', data: recentSearches },
          { title: 'Popular destinations', data: popularDestinations },
        ],
  [search, filteredDestinations, recentSearches, popularDestinations],
);
```

## Template Extension & Reuse Patterns

### Search Interface Variations

This template can be adapted for different search scenarios:

1. **Car Rental Search**: Vehicle models, pickup locations, rental companies
2. **Flat Rental Search**: Neighborhoods, property types, apartment features
3. **Property Sales Search**: Cities, property types, price ranges, features
4. **Job Search**: Job titles, companies, locations, skill requirements
5. **Product Search**: Products, categories, brands, specifications

### Search Context Adaptations

Different search types require specific implementations:

```typescript
// Car rental search adaptation
type CarSearchResult = {
  make: string;
  model: string;
  location: string;
  availability: boolean;
  pricePerDay: number;
};

// Job search adaptation
type JobSearchResult = {
  title: string;
  company: string;
  location: string;
  salaryRange: { min: number; max: number };
  remote: boolean;
};
```

### Adding New Features

- **Location Services**: GPS-based nearby search suggestions
- **Voice Search**: Speech recognition for hands-free search input
- **Search Filters**: Advanced filtering with categories and price ranges
- **Infinite Scroll**: Load more results as user scrolls
- **Search Highlights**: Highlight matching text in search results

### Customization Guidelines

- Follow existing DestinationItem component patterns for consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui InputSearch for visual and functional consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain keyboard handling patterns for optimal user experience
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve sectioned list structure for organized result presentation
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep debounced search patterns for performance optimization
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
