# AGENTS.md

## Template Purpose

**IMPORTANT:** Always reference `info.json` for exact dependencies and component structure.

This Onboarding One Time Code template provides a secure OTP verification interface for phone number or email verification during user registration. It follows the **colocation** principle with focus on verification patterns and user experience.

### Core Components Structure

```
OnboardingOneTimeCode/
└── OnboardingOneTimeCodeScreen.tsx  # Main OTP verification interface
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:

- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- Custom `InputOTP` component for secure code entry
- Countdown timer for resend functionality
- Error states and success feedback

## Data Structure & API Integration

### Mock Data Model

```typescript
type OTPVerificationData = {
  code: string;
  phoneNumber?: string;
  email?: string;
  deliveryMethod: 'sms' | 'email' | 'voice';
  expiresAt: string;
  attemptsRemaining: number;
};

type VerificationResponse = {
  isValid: boolean;
  isExpired: boolean;
  attemptsRemaining: number;
  nextResendAvailableAt?: string;
};
```

### API Integration with React Query

Recommended pattern for OTP verification:

```typescript
// api/useVerifyOTP.ts
export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: async ({
      code,
      phoneNumber,
    }: {
      code: string;
      phoneNumber: string;
    }) => {
      return fetch('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ code, phoneNumber }),
      }).then(r => r.json());
    },
    onSuccess: data => {
      if (data.isValid) {
        // Navigate to next step or complete onboarding
      }
    },
  });
};

// api/useResendOTP.ts
export const useResendOTP = () => {
  return useMutation({
    mutationFn: async ({
      phoneNumber,
      deliveryMethod,
    }: {
      phoneNumber: string;
      deliveryMethod: 'sms' | 'voice';
    }) => {
      return fetch('/api/auth/resend-otp', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber, deliveryMethod }),
      }).then(r => r.json());
    },
  });
};
```

## Template Customization Patterns

### OTP Input Pattern

Multi-digit code input:

```typescript
const OTPInput = ({ length = 6, onComplete }) => {
  const [code, setCode] = useState(Array(length).fill(''));
  // Use existing InputOTP component patterns
  // Handle auto-focus and paste functionality
};
```

### Timer Pattern

Countdown for resend functionality:

```typescript
const useResendTimer = (initialTime = 60) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  // Implement countdown logic
  // Handle resend availability
};
```

## Template Extension & Reuse Patterns

### Delivery Method Options

Support multiple OTP delivery methods:

```typescript
// SMS delivery
// Email delivery
// Voice call delivery
// WhatsApp delivery
```

### Template Reuse Examples

This template can be adapted for:

1. **Two-Factor Authentication**: For app security verification
2. **Password Reset**: For secure password recovery flows
3. **Transaction Verification**: For financial transaction confirmation
4. **Identity Verification**: For account verification processes
5. **Device Registration**: For new device authorization

### Adding New Features

- **Biometric Fallback**: Alternative verification methods
- **QR Code Verification**: Visual code scanning
- **Time-based Codes**: TOTP/HOTP integration
- **Backup Codes**: Emergency access codes
- **Multi-channel Delivery**: Send to multiple methods simultaneously

### Customization Guidelines

- Follow platform accessibility guidelines
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Implement proper error handling
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use secure storage for temporary codes
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain clear user feedback
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Handle network failures gracefully
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
