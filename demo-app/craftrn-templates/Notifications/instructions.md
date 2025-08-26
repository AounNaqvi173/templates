# Notifications Template - AI Customization Guide


**NOTE:** Always reference the `info.json` file in this template directory to understand the exact dependencies, components, and file structure before making any recommendations.
## Template Purpose & Architecture

This Notifications template provides a comprehensive notification center with tabbed categorization, various notification types, and interactive elements. It follows the **colocation** principle with notification-type organization for modern notification management.

### Core Components Structure

```
Notifications/
├── NotificationsScreen.tsx            # Main notifications container
├── Tabs.tsx                          # Category filtering tabs
├── NotificationItem/                 # Notification type components
│   ├── NotificationItem.tsx         # Base notification wrapper
│   ├── Message.tsx                  # Message/chat notifications
│   ├── AccessRequest.tsx            # Permission/access notifications
│   └── FileAttachment.tsx           # File sharing notifications
├── MoreOptionsBottomSheet.tsx       # Additional actions modal
├── data/                           # Mock notifications, tabs, users
└── utils/date.ts                   # Date formatting utilities
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:
- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `Avatar` for sender identification
- `Switch` components for notification toggles
- `BottomSheet` for additional options
- Tab-based navigation with smooth transitions

## Key Patterns for AI Customization

### 1. Tabbed Categorization System

- **Dynamic Filtering**: Category-based notification filtering
- **Tab State Management**: Persistent tab selection
- **Badge Counts**: Unread notification counters per category
- **Smooth Transitions**: Animated tab switching

### 2. Multiple Notification Types

- **Polymorphic Design**: Type-safe notification components
- **Component Composition**: Different notification layouts per type
- **Action Handling**: Type-specific interaction patterns
- **Visual Hierarchy**: Clear notification importance

### 3. Interactive Elements

- **Swipe Actions**: Quick notification management
- **Batch Operations**: Multi-select for bulk actions
- **Real-time Updates**: Live notification status changes
- **Context Menus**: Additional options per notification

## Data Structure & API Integration

### Mock Data Model

```typescript
type NotificationBase = {
  id: string;
  from: User;
  date: string;
  isRead: boolean;
  isArchived: boolean;
};

type MessageNotification = NotificationBase & {
  type: 'message';
  content: string;
  messageCount?: number;
};

type AccessRequestNotification = NotificationBase & {
  type: 'access';
  requestType: 'document' | 'folder' | 'project';
  resourceName: string;
};

type FileAttachmentNotification = NotificationBase & {
  type: 'file';
  fileName: string;
  fileSize: string;
  attachmentCount?: number;
};
```

### API Integration with React Query

Recommended pattern for notification data:

```typescript
// api/useNotifications.ts
export const useNotifications = (category?: string) => {
  return useQuery({
    queryKey: ['notifications', category],
    queryFn: () => fetch(`/api/notifications?category=${category || 'all'}`).then(r => r.json()),
    refetchInterval: 30000, // Real-time updates
  });
};

// api/useNotificationActions.ts
export const useNotificationActions = () => {
  const queryClient = useQueryClient();
  
  return {
    markAsRead: useMutation({
      mutationFn: (notificationId: string) => 
        fetch(`/api/notifications/${notificationId}/read`, { method: 'POST' }),
      onMutate: async (notificationId) => {
        // Optimistic update
        queryClient.setQueryData(['notifications'], (old: any) =>
          old?.map((notification: any) =>
            notification.id === notificationId 
              ? { ...notification, isRead: true }
              : notification
          )
        );
      },
      onSuccess: () => queryClient.invalidateQueries(['notifications']),
    }),
    
    archiveNotification: useMutation({
      mutationFn: (notificationId: string) =>
        fetch(`/api/notifications/${notificationId}/archive`, { method: 'POST' }),
      onSuccess: () => queryClient.invalidateQueries(['notifications']),
    }),
  };
};
```

## Template Customization Patterns

### Tab Filtering Pattern

Category-based notification filtering:

```typescript
const useNotificationFiltering = (notifications: Notification[], selectedTab: number) => {
  return useMemo(() => {
    return notifications.filter(notification => {
      switch (selectedTab) {
        case 1: // Social
          return ['access', 'comment', 'mention'].includes(notification.type);
        case 2: // Files
          return notification.type === 'file';
        default: // All
          return true;
      }
    });
  }, [notifications, selectedTab]);
};
```

### Notification Type Pattern

Polymorphic notification rendering:

```typescript
const NotificationRenderer = ({ notification }) => {
  // Use existing NotificationItem/ component patterns
  // Follow type-specific layouts and interactions
  // Implement proper action handling per type
};
```

## Template Extension & Reuse Patterns

### Real-time Integration Options

Connect to notification services:

```typescript
// Push notifications
// WebSocket for real-time updates
// Background sync
// Badge count management
```

### Template Reuse Examples

This Notifications template can be adapted for:

1. **Activity Feed**: Transform for social media activity streams
2. **System Alerts**: Adapt for application system notifications
3. **News Feed**: Convert for news and updates management
4. **Task Management**: Use for task assignments and updates
5. **E-commerce Updates**: Adapt for order and shipping notifications

### Adding New Features

- **Rich Notifications**: Add images and interactive content
- **Smart Grouping**: Group related notifications automatically
- **Snooze Functionality**: Defer notifications to later
- **Custom Categories**: User-defined notification categories
- **Notification Scheduling**: Scheduled notification delivery

### Customization Guidelines

- Follow existing tab-based filtering patterns
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui components for consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain notification type component structure
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve real-time update mechanisms
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep swipe action patterns for quick management
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
