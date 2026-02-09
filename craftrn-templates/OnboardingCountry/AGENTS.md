# AGENTS.md

## Template Purpose

Country/region selection interface for onboarding flows with searchable list, country flags, and optimized performance. Use for location selection, region preferences, or geographical onboarding steps.

**IMPORTANT:** Always reference `info.json` for exact dependencies and component structure.

### Core Components Structure

```
OnboardingCountry/
├── OnboardingCountryScreen.tsx        # Main country selection interface
└── data/countryCodes.tsx              # Comprehensive country data
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:

- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `InputText` for search functionality
- `FlatList` with optimizations for smooth scrolling
- Responsive design for various screen sizes

## Data Structure & API Integration

- **Static Data**: Use countryCodes.tsx for comprehensive country information
- **Search Logic**: Case-insensitive filtering by country name
- **Accessibility**: Proper screen reader support for country selection
- **Validation**: Country code format validation and ISO standards

## Data Structure & API Integration

### Mock Data Model

```typescript
type CountryCode = {
  country: string; // "United States"
  code: string; // "+1"
  flag: string; // "🇺🇸"
  iso: string; // "US"
};
```

### API Integration with React Query

Recommended pattern for dynamic country data:

```typescript
// api/useCountries.ts
export const useCountries = (locale = 'en') => {
  return useQuery({
    queryKey: ['countries', locale],
    queryFn: () => fetch(`/api/countries?locale=${locale}`).then(r => r.json()),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours cache
  });
};

// api/useUserLocation.ts
export const useUserLocation = () => {
  return useQuery({
    queryKey: ['userLocation'],
    queryFn: () => fetch('/api/location/detect').then(r => r.json()),
    retry: false, // Don't retry location detection
  });
};
```

## Template Customization Patterns

### Search Filtering Pattern

Optimized search functionality:

```typescript
const useCountrySearch = (countries: CountryCode[], searchText: string) => {
  return useMemo(() => {
    if (!searchText.trim()) return countries;

    const lowerSearchText = searchText.toLowerCase();
    return countries.filter(
      country =>
        country.country.toLowerCase().includes(lowerSearchText) ||
        country.code.includes(searchText),
    );
  }, [countries, searchText]);
};
```

### Country Selection Pattern

Reusable country selection logic:

```typescript
const useCountrySelection = (initialCountry?: string) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | null>(
    null,
  );
  // Follow existing selection patterns from OnboardingCountryScreen.tsx
};
```

## Template Extension & Reuse Patterns

### Location Detection Options

Automatic country detection:

```typescript
// IP-based detection
// Device locale detection
// GPS location services
```

### Template Reuse Examples

This Onboarding Country template can be adapted for:

1. **Shipping Address**: For e-commerce delivery country selection
2. **Tax Settings**: For financial apps requiring tax jurisdiction
3. **Content Localization**: For region-specific content delivery
4. **Currency Selection**: For financial apps with multi-currency support
5. **Language Settings**: For app localization preferences

### Adding New Features

- **Favorite Countries**: Quick access to frequently used countries
- **Recent Selections**: Track recently selected countries
- **Country Grouping**: Organize countries by regions
- **Search Highlighting**: Visual indication of matching terms
- **Offline Support**: Cached country data for offline use

### Customization Guidelines

- Follow existing search filtering patterns
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui FlatList optimizations for performance
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain country data structure consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve virtual scrolling behavior
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep search debouncing for performance
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
