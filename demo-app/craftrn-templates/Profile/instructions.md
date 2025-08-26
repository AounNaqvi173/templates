# Profile Template - AI Customization Guide


**NOTE:** Always reference the `info.json` file in this template directory to understand the exact dependencies, components, and file structure before making any recommendations.
## Template Purpose & Architecture

This Profile template provides a user profile management interface with avatar management, accordion-style information sections, and settings toggles. It follows the **colocation** principle with feature-focused modular components.

### Core Components Structure

```
Profile/
├── ProfileScreen.tsx                  # Main profile container
├── ProfileAvatar.tsx                 # Avatar display and editing
├── ProfileStats.tsx                  # User statistics display
├── PersonalInformation.tsx           # Editable personal info
├── ProfileSettings.tsx               # Profile-specific settings
├── AccordionItem.tsx                 # Expandable content sections
└── data/profileData.ts               # Mock data structures
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:
- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `InputText` for editable fields
- `Switch` for setting toggles
- `Card` for content grouping
- `ButtonRound` for avatar actions

## Key Patterns for AI Customization

### 1. Component Composition Pattern

- **Avatar Management**: Photo upload/editing with fallback handling
- **Statistics Display**: Metrics and activity summaries
- **Personal Information**: Editable fields with validation
- **Settings Integration**: Profile-specific toggles

### 2. Accordion Interface Pattern

- **Collapsible Sections**: Space-efficient organization
- **Reanimated Animations**: Smooth expand/collapse transitions
- **Interactive Controls**: Touch-friendly expand/collapse

### 3. Form Management System

- **Field Validation**: Real-time input validation
- **Dirty State Tracking**: Unsaved changes detection
- **Error Handling**: Clear messaging and recovery

## Data Structure & API Integration

### Mock Data Model

```typescript
type UserProfile = {
  id: string;
  avatar?: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  settings: ProfileSettings;
};

type ProfileSettings = {
  isPublic: boolean;
  showEmail: boolean;
  emailNotifications: boolean;
};
```

### API Integration with React Query

Recommended pattern for connecting to backend:

```typescript
// api/useUserProfile.ts
export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => fetch('/api/user/profile').then(r => r.json()),
  });
};

// api/useUpdateProfile.ts
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (data: Partial<UserProfile>) => 
      fetch('/api/user/profile', {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile']);
    },
  });
};
```

## Template Customization Patterns

### Accordion Component Pattern

Expandable sections using Reanimated:

```typescript
const AccordionSection = ({ title, children, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  // Use React Native Reanimated for smooth animations
  // Follow existing animation patterns in the codebase
};
```

### Editable Field Pattern

Inline editing with validation:

```typescript
const EditableField = ({ label, value, onSave, validation }) => {
  const [isEditing, setIsEditing] = useState(false);
  // Toggle between view/edit modes
  // Use craftrn-ui InputText component
};
```

## Template Extension & Reuse Patterns

### Form Management Options

For enhanced form handling, you may add external form libraries:

```typescript
// Option 1: React Hook Form with Zod validation
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

// Option 2: Yup validation
import * as yup from 'yup';
const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
});
```

### Template Reuse Examples

This Profile template can be adapted for:

1. **Company Profiles**: Replace personal fields with company information
2. **Pet Profiles**: Adapt for pet management apps
3. **Property Listings**: Transform for real estate agent profiles
4. **Professional Portfolios**: Add skills and work experience sections

### Adding New Features

- **Social Links**: Add social media profile connections
- **Verification System**: Implement identity verification
- **Activity Feed**: Show user activity timeline
- **Settings Expansion**: Add more privacy/notification controls

### Customization Guidelines

- Follow existing component composition patterns
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui components for consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain Unistyles theming integration
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep accordion animation patterns
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve form validation structure
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
