# Stays Filters Template - AI Customization Guide


**NOTE:** Always reference the `info.json` file in this template directory to understand the exact dependencies, components, and file structure before making any recommendations.
## Template Purpose & Architecture

This Stays Filters template provides a comprehensive filtering interface for accommodation search with multi-criteria filtering including accommodation type, price range, guest rating, and amenities. It follows the **colocation** principle with filtering-focused modular components.

### Core Components Structure

```
StaysFilters/
├── StaysFiltersScreen.tsx      # Main screen with filter logic
├── AccomodationTypeButton.tsx  # Toggle button for accommodation types
├── FilterItem.tsx              # Reusable filter row component
└── Shadow.tsx                  # Shadow component for footer
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:
- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `Button`, `Checkbox`, `Counter`, `Radio` for filter controls
- `SliderDual` for range selection
- `Text` components with typography scaling
- Consistent spacing and responsive theming

## Key Patterns for AI Customization

### 1. Multi-Type Selection Pattern

- **Array-based Selection**: Toggle logic for multiple accommodation types
- **Immutable Updates**: State management with functional updates
- **Visual Feedback**: Selected states with clear visual indicators
- **Type Safety**: Enum-based selections with TypeScript constraints

### 2. Range Slider Integration Pattern

- **Dual-handle Sliders**: Price range and rating filters
- **Responsive Width**: Dynamic sizing based on screen dimensions
- **Step Configuration**: Configurable increments for different use cases
- **Real-time Updates**: Immediate visual feedback during interaction

### 3. Form State Management System

- **Centralized State**: Unified filter state management
- **Debounced Updates**: Performance optimization for API calls
- **Persistence**: Filter state preservation across sessions
- **Reset Capabilities**: Clear all filters functionality

## Data Structure & API Integration

### Mock Data Model

```typescript
interface FilterState {
  accommodationTypes: string[];
  priceRange: { min: number; max: number };
  guestRating: number;
  amenities: string[];
  rooms: {
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
}
```

### API Integration with React Query

Recommended pattern for filtered search:

```typescript
// api/useFilteredStays.ts
export const useFilteredStays = (filters: FilterState) => {
  return useQuery({
    queryKey: ['stays', 'filtered', filters],
    queryFn: () => {
      const params = new URLSearchParams({
        types: filters.accommodationTypes.join(','),
        minPrice: filters.priceRange.min.toString(),
        maxPrice: filters.priceRange.max.toString(),
      });
      return fetch(`/api/stays/search?${params}`).then(r => r.json());
    },
    enabled: filters.accommodationTypes.length > 0,
  });
};

// Debounced filter application
const debouncedFilters = useDebounce(filters, 300);
const { data: searchResults } = useFilteredStays(debouncedFilters);
```

## Template Customization Patterns

### Reusable Filter Item Pattern

Consistent filter row component:

```typescript
const FilterItem = ({ label, rightAccessory, onPress }) => (
  <Pressable onPress={onPress}>
    <View style={styles.container}>
      <Text variant="body2">{label}</Text>
      {rightAccessory}
    </View>
  </Pressable>
);
```

### Multi-Selection Toggle Pattern

Array-based toggle logic for multiple selections:

```typescript
const handleToggleType = (type: string) => () => {
  if (types.includes(type)) {
    setTypes(prev => prev.filter(t => t !== type));
  } else {
    setTypes(prev => [...prev, type]);
  }
};
```

## Template Extension & Reuse Patterns

### Filter Interface Variations

This template can be adapted for different search and filtering scenarios:

1. **Car Rental Filters**: Vehicle type, transmission, fuel type, pickup locations
2. **Flat Rental Filters**: Property type, lease duration, furnished status, amenities
3. **Property Sales Filters**: Price range, bedrooms, bathrooms, property features
4. **Job Search Filters**: Location, salary range, experience level, job type
5. **Product Catalog Filters**: Category, price, brand, ratings, availability

### Content Adaptation Examples

Different filter types require specific implementations:

```typescript
// Car rental filter adaptations
type CarFilters = {
  vehicleTypes: string[];
  transmission: 'manual' | 'automatic' | 'both';
  fuelType: string[];
  features: string[];
  priceRange: { min: number; max: number };
};

// Property sales filter adaptations
type PropertyFilters = {
  propertyTypes: string[];
  priceRange: { min: number; max: number };
  bedrooms: number;
  bathrooms: number;
  features: string[];
  yearBuilt: { min: number; max: number };
};
```

### Adding New Filter Types

- **Date Range Filters**: Check-in/check-out date selection
- **Location Filters**: Radius-based location and destination search
- **Advanced Amenities**: Categorical amenity organization
- **Sorting Options**: Price, rating, distance, popularity sorting
- **Map Integration**: Geographic bounds and location-based filtering

### Customization Guidelines

- Follow existing FilterItem component patterns for consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui form components for visual consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain Shadow component for footer elevation
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve debounced update patterns for performance
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep filter state management patterns for reliability
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
