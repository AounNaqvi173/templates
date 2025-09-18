# AGENTS.md

## Template Purpose

AI chat interface with typewriter animations, voice recording, and real-time messaging. Use this template for conversational AI, customer support, or interactive chat experiences.

**IMPORTANT:** Always reference `info.json` for exact dependencies and component structure.

### Core Components Structure

```
AiConversation/
├── AiConversationScreen.tsx          # Main container with message flow
├── HeaderTitle.tsx                   # Conversation header component
├── MessageComposer/                  # Input and message sending
│   ├── ActionButtons.tsx            # Attachment & voice controls
│   ├── InputField.tsx              # Text input with auto-resize
│   └── VoiceRecordingBottomSheet/   # Voice recording interface
├── MessagesList/                    # Message display system
│   ├── AssistantMessage/           # AI response components
│   │   ├── FormattedText.tsx      # Markdown/rich text rendering
│   │   ├── ThinkingIndicator.tsx   # Typing/loading animation
│   │   └── TypewriterText.tsx     # Animated text reveal
│   └── UserMessage.tsx            # User message display
└── data/                          # Mock conversation data
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:

- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `BottomSheet` for modal interfaces
- `Text` components with typography scaling
- `Card` for message bubbles
- Keyboard-aware scrolling with `react-native-keyboard-controller`

## Data Structure & API Integration

### Mock Data Model

```typescript
type Message = {
  id: string;
  date: string;
  content: string;
  role: 'user' | 'assistant';
};

type AiAssistant = {
  id: string;
  name: string;
  model: string;
  description: string;
  avatarUri?: string;
};
```

### API Integration with React Query

Recommended pattern for AI service integration:

```typescript
// api/useConversation.ts
export const useConversation = (conversationId: string) => {
  return useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () =>
      fetch(`/api/conversations/${conversationId}`).then(r => r.json()),
  });
};

// api/useSendMessage.ts
export const useSendMessage = () => {
  return useMutation({
    mutationFn: (data: { message: string; conversationId: string }) =>
      fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['conversation']);
    },
  });
};
```

## Template Customization Patterns

### Typewriter Animation Pattern

Character-by-character text reveal:

```typescript
const TypewriterText = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');
  // Use Reanimated for smooth character animations
  // Follow existing animation patterns in MessagesList/
};
```

### Message Formatting Pattern

Rich text with custom renderers:

```typescript
const FormattedText = ({ content, renderCode }) => {
  // Markdown parsing and custom component rendering
  // Supports code blocks, links, and formatted text
};
```

## Integration & Extension Patterns

### AI Service Integration Options

Connect to different AI providers:

```typescript
// OpenAI integration
import OpenAI from 'openai';

// Anthropic Claude integration
import { Anthropic } from '@anthropic-ai/sdk';

// Google Gemini integration
import { GoogleGenerativeAI } from '@google/generative-ai';
```

### Template Reuse Examples

This AI Conversation template can be adapted for:

1. **Customer Support Chat**: Replace AI with support agent responses
2. **Educational Tutoring**: Adapt for learning assistance applications
3. **Code Review Chat**: Add syntax highlighting and code execution
4. **Medical Consultation**: Implement structured medical Q&A flows
5. **Legal Advisory**: Transform for legal consultation interfaces

### Adding New Features

- **Message Reactions**: Add emoji reactions to messages
- **File Attachments**: Extend composer for document uploads
- **Code Execution**: Add code block execution capabilities
- **Message Search**: Implement conversation search functionality
- **Message Threading**: Add reply-to-message functionality

## Code Style & TypeScript Rules

**STRICT TYPING REQUIREMENTS:**

- NEVER use `any` type - always provide specific types
- NEVER use TypeScript type assertions (`as Type`, `<Type>value`) or casts
- Use proper type definitions and interfaces
- Use type guards and narrowing instead of assertions

**COMPONENT PATTERNS:**

- Follow existing component composition patterns
- Use craftrn-ui components for consistency
- Maintain Reanimated animation patterns
- Preserve keyboard handling behavior
- Keep message flow and scrolling mechanics
- Maintain feature-based file colocation - group related files together rather than separating by type (avoid generic `hooks/`, `components/` folders unless shared across multiple features)

## Dependencies & File Structure

Refer to `info.json` in this template directory for:

- `externalDependencies`: Required npm packages
- `craftrnUiComponents`: craftrn-ui components used
- `tetrislyIcons`: Icons from tetrisly icon set
- `fileStructure`: Complete component hierarchy and organization
