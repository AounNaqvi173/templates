# Paywall Subscription Template - AI Customization Guide


**NOTE:** Always reference the `info.json` file in this template directory to understand the exact dependencies, components, and file structure before making any recommendations.
## Template Purpose & Architecture

This Paywall Subscription template provides a complete subscription monetization interface with multiple pricing tiers, feature highlights, and seamless payment flow. It follows the **colocation** principle with subscription-focused modular components.

### Core Components Structure

```
PaywallSubscription/
├── PaywallSubscriptionScreen.tsx      # Main subscription interface
├── ButtonSelection.tsx               # Subscription plan selector
├── PaymentSuccessBottomSheet.tsx     # Payment confirmation modal
└── data/                             # Mock subscription data
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:
- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `Button` component for primary call-to-action
- `Text` components with typography scaling
- `BottomSheet` for payment success confirmation
- Custom selection components for pricing tiers

## Key Patterns for AI Customization

### 1. Subscription Plan Selection Pattern

- **Visual Plan Comparison**: Clear pricing tier presentation with savings display
- **Popular Plan Highlighting**: Recommended option emphasis with visual badges
- **Flexible Selection**: Easy switching between subscription plans
- **Value Communication**: Savings percentage and benefit calculations

### 2. Payment Flow Pattern

- **Multi-step Process**: Plan selection → Payment → Confirmation
- **Success Animation**: Celebratory confirmation experience
- **Error Handling**: Graceful payment failure recovery
- **Receipt Integration**: Automated payment confirmation

### 3. Conversion Optimization System

- **Trust Signals**: Security badges and testimonials
- **Risk Reduction**: Free trial and cancellation messaging
- **Social Proof**: User count and review integration
- **Urgency Elements**: Limited-time offer presentations

## Data Structure & API Integration

### Mock Data Model

```typescript
type SubscriptionPlan = {
  id: string;
  name: string;
  duration: string;
  price: number;
  interval: 'month' | 'year';
  savings?: string;
  popular?: boolean;
  features: string[];
};

type PaymentState = {
  selectedPlan: string;
  paymentMethod?: string;
  couponCode?: string;
};
```

### API Integration with React Query

Recommended pattern for subscription management:

```typescript
// api/useSubscription.ts
export const useSubscription = () => {
  return useMutation({
    mutationFn: ({ planId, paymentMethodId }: SubscriptionData) =>
      fetch('/api/subscription/create', {
        method: 'POST',
        body: JSON.stringify({ planId, paymentMethodId }),
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['userProfile']);
    },
  });
};

// api/usePaymentMethods.ts
export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ['paymentMethods'],
    queryFn: () => fetch('/api/payment/methods').then(r => r.json()),
  });
};
```

## Template Customization Patterns

### Subscription Plan Selector Pattern

Flexible plan selection with visual feedback:

```typescript
const SubscriptionPlanSelector = ({ plans, selectedPlan, onPlanSelect }) => (
  <PlanContainer>
    {plans.map(plan => (
      <ButtonSelection
        key={plan.id}
        isSelected={selectedPlan === plan.id}
        isPopular={plan.popular}
        onPress={() => onPlanSelect(plan.id)}
        // Follow existing ButtonSelection pattern
      />
    ))}
  </PlanContainer>
);
```

### Payment Success Animation Pattern

Celebration flow with next steps:

```typescript
const PaymentSuccessFlow = ({ subscription }) => {
  // Use Reanimated for success celebration
  // Follow existing BottomSheet patterns
  // Include onboarding transition
};
```

## Template Extension & Reuse Patterns

### Subscription Model Variations

This template adapts to different subscription types:

1. **SaaS Applications**: Software feature tiers with usage limits
2. **Content Platforms**: Media access with premium content
3. **Educational Apps**: Course access with certification options
4. **Fitness Apps**: Workout plans with personal coaching
5. **Business Tools**: Team collaboration with advanced features

### Payment Integration Options

Connect to different payment providers:

```typescript
// Stripe integration
import { useStripe } from '@stripe/stripe-react-native';

// Apple/Google in-app purchases
import { requestPurchase } from 'react-native-iap';

// PayPal integration
import { PayPalPayments } from 'react-native-paypal';
```

### Adding New Features

- **Coupon System**: Add discount code validation
- **Gift Subscriptions**: Implement subscription gifting
- **Family Plans**: Add multi-user subscription options
- **Enterprise Billing**: Custom invoicing and procurement
- **Usage Tracking**: Monitor subscription feature usage

### Customization Guidelines

- Follow existing ButtonSelection component patterns
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui components for consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain payment flow and success animations
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve pricing calculation logic
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep conversion optimization elements
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
