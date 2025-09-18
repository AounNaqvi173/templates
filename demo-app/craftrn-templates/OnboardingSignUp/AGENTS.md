# AGENTS.md

## Template Purpose

Comprehensive user registration interface with form validation, terms acceptance, and smooth onboarding flow. Use for user registration, account creation, or signup processes.

**IMPORTANT:** Always reference `info.json` for exact dependencies and component structure.

This Onboarding Sign Up template provides a comprehensive user registration interface with multiple authentication options including phone number registration and social login (Google, Apple). It follows the **colocation** principle with modular social authentication components.

### Core Components Structure

```
OnboardingSignUp/
├── OnboardingSignUpScreen.tsx         # Main registration interface
├── ButtonApple/                      # Apple Sign-In component
│   ├── ButtonApple.tsx              # Apple authentication button
│   └── AppleIcon.tsx                # Apple logo component
├── ButtonGoogle/                     # Google Sign-In component
│   ├── ButtonGoogle.tsx             # Google authentication button
│   └── GoogleIcon.tsx               # Google logo component
├── assets/background.png             # Hero background image
├── data/countryCodes.tsx            # Country selection data
└── utils/colors.ts                  # Color utilities
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:

- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `InputText` for form fields
- `Button` for primary actions
- Custom social authentication components
- SVG gradient overlays for visual appeal

## Data Structure & API Integration

### Mock Data Model

```typescript
type CountryCode = {
  country: string;
  code: string;
  flag: string;
};

type SignUpData = {
  phoneNumber: string;
  countryCode: string;
  agreeToTerms: boolean;
};
```

### API Integration with React Query

Recommended pattern for authentication:

```typescript
// api/useSignUp.ts
export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: { phoneNumber: string; countryCode: string }) =>
      fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: data => {
      // Navigate to OTP verification
    },
  });
};

// api/useSocialLogin.ts
export const useSocialLogin = () => {
  return useMutation({
    mutationFn: (provider: 'google' | 'apple', token: string) =>
      fetch('/api/auth/social', {
        method: 'POST',
        body: JSON.stringify({ provider, token }),
      }),
    onSuccess: data => {
      // Store auth tokens and navigate to app
    },
  });
};
```

## Template Customization Patterns

### Social Login Pattern

Modular social authentication:

```typescript
const SocialLoginButton = ({ provider, onPress }) => {
  // Use existing ButtonApple/ButtonGoogle patterns
  // Follow brand guidelines for each provider
  // Implement proper error handling
};
```

### Form Validation Pattern

Real-time input validation:

```typescript
const PhoneNumberInput = ({ value, onChangeText, countryCode }) => {
  // Use existing form validation patterns
  // Implement phone number format validation
  // Handle country code selection
};
```

## Template Extension & Reuse Patterns

### Authentication Provider Options

Support for various providers:

```typescript
// Google Sign-In
// Apple Sign-In
// Facebook Login
// Twitter OAuth
// Email/Password registration
```

### Template Reuse Examples

This Onboarding Sign Up template can be adapted for:

1. **B2B Applications**: Add company registration fields
2. **Social Platforms**: Include profile creation steps
3. **E-commerce Apps**: Add shipping address collection
4. **Educational Apps**: Include role selection (student/teacher)
5. **Healthcare Apps**: Add privacy consent and medical info

### Adding New Features

- **Email Registration**: Alternative to phone registration
- **Profile Picture Upload**: Avatar selection during sign-up
- **Age Verification**: Date of birth collection
- **Marketing Preferences**: Opt-in/out for communications
- **Referral Codes**: Friend invitation system

### Customization Guidelines

- Follow existing social login component patterns
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui form components for consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain background design composition
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve authentication flow structure
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep country code selection functionality
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
