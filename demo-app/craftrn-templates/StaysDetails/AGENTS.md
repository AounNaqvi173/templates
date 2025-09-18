# AGENTS.md

## Template Purpose

Detailed accommodation view with image galleries, amenities, reviews, and booking functionality. Use for property details, hotel information, or comprehensive item showcase.

**IMPORTANT:** Always reference `info.json` for exact dependencies and component structure.

This Stays Details template provides a comprehensive accommodation viewing interface with immersive photo galleries, detailed property information, and booking functionality. It follows the **colocation** principle with accommodation-focused modular components.

### Core Components Structure

```
StaysDetails/
├── StaysDetailsScreen.tsx            # Main details container
├── AnimatedHeader.tsx               # Scroll-aware header with actions
├── Shadow.tsx                       # Visual shadow effects
└── data/
    └── stays.ts                    # Accommodation data
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:

- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `PhotoCarousel` component for image galleries
- `Button` component for booking actions
- `Avatar` and `ButtonRound` for user interactions
- Advanced scroll animations with Reanimated

## Data Structure & API Integration

### Mock Data Model

```typescript
type Stay = {
  id: string;
  title: string;
  description: string;
  photos: string[];
  rating: number;
  reviewCount: number;
  pricePerNight: string;
  location: {
    city: string;
    country: string;
    coordinates: [number, number];
  };
  amenities: string[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
  };
  host: {
    name: string;
    avatar?: string;
    verified: boolean;
  };
};
```

### API Integration with React Query

Recommended pattern for accommodation management:

```typescript
// api/useStayDetails.ts
export const useStayDetails = (stayId: string) => {
  return useQuery({
    queryKey: ['stayDetails', stayId],
    queryFn: () => fetch(`/api/stays/${stayId}`).then(r => r.json()),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// api/useBookingFlow.ts
export const useBookingFlow = () => {
  return useMutation({
    mutationFn: (bookingData: BookingRequest) =>
      fetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      }),
    onSuccess: booking => {
      analytics.track('Booking Created', {
        stayId: booking.stayId,
        totalPrice: booking.totalPrice,
      });
    },
  });
};
```

## Template Customization Patterns

### Animated Header Pattern

Scroll-aware header with dynamic opacity:

```typescript
const AnimatedHeader = ({ scrollPosition, carouselHeight, stayTitle }) => {
  const headerOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollPosition.value,
      [0, carouselHeight - 100],
      [0, 1],
    ),
  }));

  // Follow existing AnimatedHeader component patterns
  // Use Reanimated for smooth scroll-based animations
};
```

### Photo Carousel Pattern

Interactive image gallery with pull-to-zoom:

```typescript
const PhotoCarousel = ({ photos, onImagePress }) => {
  const carouselScale = useAnimatedStyle(() => {
    const scale =
      scrollPosition.value < 0
        ? interpolate(scrollPosition.value, [-100, 0], [1.4, 1])
        : 1;
    return { transform: [{ scale }] };
  });

  // Follow existing carousel patterns with Reanimated
};
```

## Template Extension & Reuse Patterns

### Accommodation Type Variations

This template can be reused for different accommodation and rental types:

1. **Car Rental Details**: Vehicle specifications, rental terms, pickup locations
2. **Flat Rental Details**: Apartment features, lease terms, neighborhood info
3. **Property Sales Details**: Home features, pricing history, market analysis
4. **Hotel Details**: Room types, amenities, guest services, booking rates
5. **Vacation Rentals**: Seasonal pricing, activity recommendations, local guides

### Content Management Adaptations

Different property types require specific content structures:

```typescript
// Car rental adaptation
type CarRental = {
  make: string;
  model: string;
  year: number;
  features: string[];
  pickupLocations: Location[];
  rentalTerms: RentalTerms;
};

// Property sales adaptation
type PropertySale = {
  propertyType: 'house' | 'apartment' | 'condo';
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  priceHistory: PricePoint[];
  marketAnalysis: MarketData;
};
```

### Adding New Features

- **Virtual Tours**: 360° photo integration and AR preview
- **Interactive Maps**: Location context and nearby attractions
- **Review System**: Guest reviews, ratings, and host responses
- **Dynamic Pricing**: Date-based pricing and availability calendar
- **Comparison Tools**: Side-by-side property comparisons

### Customization Guidelines

- Follow existing AnimatedHeader scroll animation patterns
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui PhotoCarousel for image galleries
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain Shadow component for visual depth
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve scroll-based animation performance
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep booking flow and conversion optimization elements
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
