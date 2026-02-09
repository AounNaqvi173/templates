# AGENTS.md

## Template Purpose

Comprehensive message list interface with conversation previews, unread indicators, and message management. Use for chat inboxes, conversation lists, or communication hubs.

**IMPORTANT:** Always reference `info.json` for exact dependencies and component structure.

### Core Components Structure

```
MessagingInbox/
├── MessagingInboxScreen.tsx           # Main inbox container
├── ChatItem.tsx                      # Individual chat list item
├── SwipableRow.tsx                   # Swipe gesture wrapper
├── FilterList.tsx                    # Filtering interface (All, Unread, Favorites)
├── MoreBottomSheet.tsx              # Additional actions modal
├── ArchiveBottomSheet.tsx           # Archive confirmation modal
├── data/                            # Mock inbox data, users
└── utils/date.ts                    # Date formatting utilities
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:

- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `Avatar` for participant profiles
- `BottomSheet` for actions and confirmations
- `ListItem` patterns for chat rows
- High-performance `FlatList` with gesture integration

## Data Structure & API Integration

### Mock Data Model

```typescript
type InboxItem = {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  isFavourite: boolean;
  isArchived: boolean;
  isPinned: boolean;
  lastActivity: string;
  chatType: 'direct' | 'group';
};

type Message = {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'voice';
  status: 'sent' | 'delivered' | 'read';
};
```

### API Integration with React Query

Recommended pattern for messaging data:

```typescript
// api/useInboxChats.ts
export const useInboxChats = (filters?: {
  search?: string;
  filter: 'all' | 'unread' | 'favorites';
}) => {
  return useQuery({
    queryKey: ['inboxChats', filters],
    queryFn: () =>
      fetch(`/api/chats?${new URLSearchParams(filters)}`).then(r => r.json()),
    refetchInterval: 30000, // Real-time updates
  });
};

// api/useChatActions.ts
export const useChatActions = () => {
  const queryClient = useQueryClient();

  return {
    archiveChat: useMutation({
      mutationFn: (chatId: string) =>
        fetch(`/api/chats/${chatId}/archive`, { method: 'POST' }),
      onSuccess: () => queryClient.invalidateQueries(['inboxChats']),
    }),

    markAsRead: useMutation({
      mutationFn: (chatId: string) =>
        fetch(`/api/chats/${chatId}/read`, { method: 'POST' }),
      onMutate: async chatId => {
        // Optimistic update for instant UI feedback
        queryClient.setQueryData(['inboxChats'], (old: any) =>
          old?.map((chat: any) =>
            chat.id === chatId ? { ...chat, unreadCount: 0 } : chat,
          ),
        );
      },
    }),
  };
};
```

## Template Customization Patterns

### Swipe Gesture Pattern

Advanced gesture-based interactions:

```typescript
const SwipeableRow = ({ children, onArchive, onMore }) => {
  // Use existing SwipableRow.tsx patterns
  // Follow gesture handler configuration for smooth animations
  // Implement progressive action reveal based on swipe distance
};
```

### Filter System Pattern

Dynamic content filtering:

```typescript
const useInboxFiltering = (
  data: InboxItem[],
  searchText: string,
  filter: string,
) => {
  return useMemo(() => {
    let filteredData = data;

    // Apply search filter
    if (searchText.trim()) {
      filteredData = filteredData.filter(item =>
        item.participants.some(participant =>
          participant.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }

    // Apply status filter
    switch (filter) {
      case 'unread':
        filteredData = filteredData.filter(item => item.unreadCount > 0);
        break;
      case 'favorites':
        filteredData = filteredData.filter(item => item.isFavourite);
        break;
    }

    return filteredData;
  }, [data, searchText, filter]);
};
```

## Template Extension & Reuse Patterns

### Real-time Integration Options

Connect to messaging services:

```typescript
// WebSocket integration for real-time updates
// Push notification support
// Typing indicators
// Message reactions
```

### Template Reuse Examples

This Messaging Inbox template can be adapted for:

1. **Email Client**: Transform for email management with folders and labels
2. **Support Tickets**: Adapt for customer support ticket management
3. **Social Media DMs**: Integrate with social platform messaging
4. **Team Communication**: Add channels and workspace organization
5. **Notification Center**: Transform into notification management system

### Adding New Features

- **Push Notifications**: Real-time message notifications
- **Typing Indicators**: Show when users are typing
- **Message Reactions**: Add emoji reactions to messages
- **Voice Messages**: Support for voice message playback
- **File Attachments**: Handle document and media sharing

### Customization Guidelines

- Follow existing SwipableRow gesture patterns
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui ListItem components for consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain high-performance FlatList optimizations
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve swipe action reveal animations
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep filter state management patterns
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
