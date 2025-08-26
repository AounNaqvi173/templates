# Messaging Thread Template - AI Customization Guide


**NOTE:** Always reference the `info.json` file in this template directory to understand the exact dependencies, components, and file structure before making any recommendations.
## Template Purpose & Architecture

This Messaging Thread template provides a comprehensive chat conversation interface with real-time messaging, keyboard handling, and advanced message features. It follows the **colocation** principle with message-centric organization for immersive messaging experiences.

### Core Components Structure

```
MessagingThread/
├── MessagingThreadScreen.tsx          # Main conversation container
├── HeaderTitle.tsx                   # Dynamic conversation header
├── MessagesList.tsx                  # Message rendering and scrolling
├── MessageComposer.tsx              # Input and send functionality
├── BackToBottomButton.tsx           # Auto-scroll to latest messages
├── MoreBottomSheet.tsx              # Additional conversation actions
├── data/                           # Mock discussions, users
└── utils/date.ts                   # Date formatting utilities
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:
- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `Avatar` for participant identification
- `ButtonRound` for action buttons
- `BottomSheet` for additional options
- Advanced keyboard handling with `react-native-keyboard-controller`

## Key Patterns for AI Customization

### 1. Advanced Keyboard Management

- **Platform-Specific Handling**: Different behavior for iOS/Android
- **Header Height Compensation**: Accounts for navigation header
- **Safe Area Integration**: Respects device insets and notches
- **Smooth Transitions**: Natural keyboard show/hide animations

### 2. Message State Management

- **Real-time Updates**: Live message synchronization
- **Message Status**: Sent, delivered, read indicators
- **Optimistic Updates**: Immediate UI feedback for sent messages
- **Message Reactions**: Emoji reactions and interaction tracking

### 3. Dynamic Header System

- **Participant Information**: Shows conversation participant details
- **Online Status**: Real-time presence indicators
- **Typing Indicators**: Shows when other participants are typing
- **Action Integration**: Quick access to conversation actions

### 4. Auto-Scroll Pattern

- **New Message Detection**: Auto-scroll to bottom on new messages
- **Manual Override**: Allows users to browse message history
- **Back-to-Bottom Button**: Quick navigation to latest messages
- **Smooth Animations**: Natural scrolling transitions

## Data Structure & API Integration

### Mock Data Model

```typescript
type Discussion = {
  id: string;
  participants: User[];
  lastMessage: Message;
  messages: Message[];
};

type Message = {
  id: string;
  date: string;
  content: string[];
  senderId: string;
  reactions: string[];
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'image' | 'file' | 'voice';
  replyTo?: string;
};

type User = {
  id: string;
  name: string;
  avatarUri?: string;
  isOnline: boolean;
  lastSeen?: string;
};
```

### API Integration with React Query

Recommended pattern for messaging data:

```typescript
// api/useConversationMessages.ts
export const useConversationMessages = (conversationId: string) => {
  return useInfiniteQuery({
    queryKey: ['messages', conversationId],
    queryFn: ({ pageParam = null }) => 
      fetch(`/api/conversations/${conversationId}/messages?cursor=${pageParam}`).then(r => r.json()),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchInterval: 30000, // Real-time updates
  });
};

// api/useSendMessage.ts
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ conversationId, content, type = 'text' }: {
      conversationId: string;
      content: string;
      type?: 'text' | 'image' | 'file' | 'voice';
    }) => fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ conversationId, content, type }),
    }),
    
    onMutate: async ({ conversationId, content }) => {
      // Optimistic update for immediate UI feedback
      const optimisticMessage = {
        id: `temp-${Date.now()}`,
        content: [content],
        senderId: 'current-user',
        date: new Date().toISOString(),
        status: 'sending' as const,
        reactions: [],
      };
      
      queryClient.setQueryData(['messages', conversationId], (old: any) => ({
        ...old,
        pages: [
          { ...old.pages[0], messages: [optimisticMessage, ...old.pages[0].messages] },
          ...old.pages.slice(1),
        ],
      }));
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries(['messages']);
    },
  });
};
```

## Template Customization Patterns

### Keyboard Handling Pattern

Advanced keyboard management:

```typescript
const MessagingThread = () => {
  // Use existing keyboard-controller patterns from MessagingThreadScreen.tsx
  // Follow platform-specific offset calculations
  // Maintain smooth keyboard animations
};
```

### Message Composer Pattern

Input handling with auto-resize:

```typescript
const MessageComposer = ({ onSend }) => {
  // Use existing MessageComposer.tsx patterns
  // Follow auto-resize text input behavior
  // Implement send button state management
};
```

## Template Extension & Reuse Patterns

### Real-time Integration Options

Connect to messaging services:

```typescript
// WebSocket integration for real-time messaging
// Typing indicators
// Message reactions
// Read receipts
```

### Template Reuse Examples

This Messaging Thread template can be adapted for:

1. **Customer Support Chat**: Add support agent features and ticket management
2. **Group Chat**: Extend for multi-participant conversations
3. **Live Comments**: Transform for real-time comment threads
4. **Social Media Chat**: Integrate with social platform messaging
5. **Gaming Chat**: Add game-specific features and integrations

### Adding New Features

- **Message Reactions**: Add emoji reactions to messages
- **Voice Messages**: Support for voice message recording and playback
- **File Attachments**: Handle document and media sharing
- **Message Threading**: Add reply-to-message functionality
- **Message Search**: Implement conversation search

### Customization Guidelines

- Follow existing keyboard handling patterns in MessagingThreadScreen
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui components for consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain auto-scroll behavior for new messages
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve message composer auto-resize functionality
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep real-time update patterns
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
