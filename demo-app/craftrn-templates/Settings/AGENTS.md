# AGENTS.md

## Template Purpose

Comprehensive settings interface with security, notifications, privacy, and user preferences. Use for app configuration screens with hierarchical organization.

**IMPORTANT:** Always reference `info.json` for exact dependencies and component structure.

### Core Components Structure

```
Settings/
├── SettingsScreen.tsx                # Main settings container
├── ProfileSection.tsx               # User profile summary
├── SecuritySection.tsx              # Security settings group
├── SecurityPrivacySection.tsx       # Security & privacy combined
├── PrivacySection.tsx              # Privacy-specific settings
├── PushNotificationsSection.tsx     # Notification preferences
├── NotificationsFrequency.tsx       # Notification timing controls
├── PasscodeBottomSheet.tsx         # Passcode management modal
├── SignOutBottomSheet.tsx          # Sign out confirmation modal
├── MarketingBanner.tsx             # Promotional content
├── SettingsItem.tsx                # Individual setting component
├── SettingsSection.tsx             # Setting group wrapper
└── SectionHeader.tsx               # Section title component
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:

- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `Switch` components for boolean settings
- `ListItem` for navigational settings
- `BottomSheet` for confirmation flows
- `PasscodeEntry` for security settings

## Data Structure & API Integration

### Mock Data Model

```typescript
type AppSettings = {
  profile: {
    name: string;
    email: string;
    avatar?: string;
  };
  security: {
    passcodeEnabled: boolean;
    biometricEnabled: boolean;
    twoFactorEnabled: boolean;
  };
  notifications: {
    pushEnabled: boolean;
    emailEnabled: boolean;
    frequency: 'immediate' | 'hourly' | 'daily';
  };
  privacy: {
    analyticsEnabled: boolean;
    dataSharing: 'none' | 'anonymized' | 'full';
  };
};
```

### API Integration with React Query

Recommended pattern for settings management:

```typescript
// api/useSettings.ts
export const useSettings = () => {
  return useQuery({
    queryKey: ['appSettings'],
    queryFn: () => fetch('/api/user/settings').then(r => r.json()),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// api/useUpdateSettings.ts
export const useUpdateSettings = () => {
  return useMutation({
    mutationFn: ({ section, settings }: SettingsUpdate) =>
      fetch(`/api/user/settings/${section}`, {
        method: 'PATCH',
        body: JSON.stringify(settings),
      }),
    onMutate: async variables => {
      // Optimistic update
      queryClient.setQueryData(['appSettings'], (old: any) => ({
        ...old,
        [variables.section]: {
          ...old[variables.section],
          ...variables.settings,
        },
      }));
    },
  });
};
```

## Template Customization Patterns

### Settings Section Pattern

Reusable settings group component:

```typescript
const SettingsSection = ({ title, icon, children, description }) => (
  <SettingsSectionContainer>
    <SectionHeader>
      {icon}
      <SectionTitle>{title}</SectionTitle>
    </SectionHeader>
    {description && <SectionDescription>{description}</SectionDescription>}
    <SettingsGroup>{children}</SettingsGroup>
  </SettingsSectionContainer>
);
```

### Settings Item Pattern

Flexible individual setting component:

```typescript
const SettingsItem = ({ title, type, value, onChange, onPress }) => {
  // Support toggle, navigation, selection, action types
  // Follow existing craftrn-ui ListItem patterns
  // Include proper accessibility and state management
};
```

## Template Extension & Reuse Patterns

### Configuration Interface Variations

This Settings template adapts to different application types:

1. **Business Applications**: Team settings, role management, integrations
2. **Social Platforms**: Privacy controls, content preferences, blocking
3. **Financial Apps**: Security settings, transaction preferences, alerts
4. **Health Apps**: Data sharing, reminder settings, privacy controls
5. **Educational Apps**: Learning preferences, notification schedules, progress

### Security Integration Options

Connect to different security providers:

```typescript
// Biometric authentication
import * as LocalAuthentication from 'expo-local-authentication';

// Passcode management
import { PasscodeManager } from 'react-native-passcode';

// Two-factor authentication
import { TwoFactorAuth } from 'react-native-2fa';
```

### Adding New Features

- **Theme Customization**: Dark/light mode and color preferences
- **Data Management**: Export data, delete account, usage analytics
- **Integration Settings**: Connect third-party services and APIs
- **Advanced Security**: Session management, device tracking, audit logs
- **Accessibility Options**: Font size, contrast, screen reader settings

### Customization Guidelines

- Follow existing SettingsSection and SettingsItem patterns
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui components for visual consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain modal-based detail view patterns
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve security authentication flows
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep optimistic update behavior
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
