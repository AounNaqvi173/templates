# Onboarding Create Passcode Template - AI Customization Guide


**NOTE:** Always reference the `info.json` file in this template directory to understand the exact dependencies, components, and file structure before making any recommendations.
## Template Purpose & Architecture

This Onboarding Create Passcode template provides a secure passcode creation interface for user authentication setup. It follows the **colocation** principle with focus on security patterns and user experience.

### Core Components Structure

```
OnboardingCreatePasscode/
└── OnboardingCreatePasscodeScreen.tsx  # Main passcode creation interface
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:
- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- Custom `PasscodeEntry` component for secure input
- Visual feedback for input states
- Security-focused design patterns

## Key Patterns for AI Customization

### 1. Secure Input Pattern

- **Visual Masking**: Dots/circles to hide passcode digits
- **Real-time Validation**: Immediate feedback on input strength
- **Error Handling**: Clear error states and recovery
- **Progress Indication**: Visual progress through passcode creation

### 2. Security Features

- **Biometric Integration**: Face ID/Touch ID support preparation
- **Passcode Strength**: Validation for secure combinations
- **Confirmation Flow**: Require passcode re-entry for verification
- **Security Guidelines**: User education on passcode best practices

### 3. Accessibility Pattern

- **VoiceOver Support**: Screen reader accessibility
- **Large Touch Targets**: Easy interaction for all users
- **Clear Instructions**: Step-by-step guidance
- **Error Announcements**: Accessible error messaging

## Data Structure & API Integration

### Mock Data Model

```typescript
type PasscodeCreationData = {
  passcode: string;
  confirmationPasscode?: string;
  biometricEnabled: boolean;
  createdAt: string;
};

type SecuritySettings = {
  passcodeLength: number;
  requireBiometric: boolean;
  lockAfterAttempts: number;
  autoLockTimeout: number;
};
```

### API Integration with React Query

Recommended pattern for secure passcode management:

```typescript
// api/usePasscodeCreation.ts
export const usePasscodeCreation = () => {
  return useMutation({
    mutationFn: async ({ passcode, biometricEnabled }: {
      passcode: string;
      biometricEnabled: boolean;
    }) => {
      // Hash passcode client-side before sending
      const hashedPasscode = await hashPasscode(passcode);
      
      return fetch('/api/auth/passcode', {
        method: 'POST',
        body: JSON.stringify({ hashedPasscode, biometricEnabled }),
      });
    },
    
    onSuccess: async (data, variables) => {
      // Store passcode securely in device keychain/keystore
      await storePasscodeSecurely(variables.passcode);
      // Clear passcode from memory
      variables.passcode = '';
    },
  });
};

// api/usePasscodeValidation.ts
export const usePasscodeValidation = () => {
  return useMutation({
    mutationFn: async (passcode: string) => {
      // Validate passcode strength
      const validation = {
        length: passcode.length >= 6,
        noSequential: !hasSequentialDigits(passcode),
        noRepeating: !hasRepeatingDigits(passcode),
        notCommon: !isCommonPasscode(passcode),
      };
      
      const isValid = Object.values(validation).every(Boolean);
      return { isValid, validation };
    },
  });
};
```

## Template Customization Patterns

### Passcode Input Pattern

Secure digit input handling:

```typescript
const PasscodeInput = ({ length = 6, onComplete }) => {
  const [passcode, setPasscode] = useState('');
  // Use secure input patterns with visual masking
  // Follow existing PasscodeEntry component patterns
};
```

### Validation Pattern

Passcode strength validation:

```typescript
const usePasscodeValidation = (passcode: string) => {
  // Implement strength validation
  // Check for common patterns to avoid
  // Provide user feedback on security
};
```

## Template Extension & Reuse Patterns

### Biometric Integration Options

```typescript
// Touch ID/Face ID integration
// Fingerprint authentication
// Voice recognition
```

### Template Reuse Examples

This template can be adapted for:

1. **App Lock Screen**: For app-level security
2. **Payment Authorization**: For financial transaction security
3. **Parental Controls**: For child safety features
4. **Private Mode**: For secure app sections
5. **Backup Authentication**: As fallback for biometric auth

### Adding New Features

- **Biometric Setup**: Integrate Touch ID/Face ID
- **Pattern Lock**: Alternative to numeric passcode
- **Auto-lock Timer**: Automatic security timeout
- **Multiple Attempts**: Lockout after failed attempts
- **Passcode Recovery**: Secure recovery options

### Customization Guidelines

- Follow platform security guidelines (iOS/Android)
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use secure storage for passcode data
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Implement proper encryption
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain accessibility standards
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Provide clear user feedback
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
