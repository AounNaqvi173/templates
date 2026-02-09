export type AiAssistant = {
  id: string;
  name: string;
  avatarUri?: string;
  model: string;
  description: string;
};

export type Message = {
  id: string;
  date: string;
  content: string;
  role: 'user' | 'assistant';
};

export type Conversation = {
  id: string;
  title: string;
  aiAssistant: AiAssistant;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
};

export const aiAssistants: AiAssistant[] = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    name: 'Claude',
    model: 'Claude 4 Sonnet',
    description: 'A helpful, harmless, and honest AI assistant',
    avatarUri: undefined,
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    name: 'GPT-4',
    model: 'GPT-4 Turbo',
    description: 'Advanced language model by OpenAI',
    avatarUri: undefined,
  },
];

export const conversationsData: Conversation[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    title: 'Creative Writing Help',
    aiAssistant: aiAssistants[0],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        content:
          'I need help writing a short story about time travel. Can you help me brainstorm some ideas?',
        role: 'user',
      },
      {
        id: 'c3d4e5f6-a7b8-9012-cdef-345678901234',
        date: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000 + 30000,
        ).toISOString(),
        content:
          "I'd love to help you brainstorm! Time travel stories offer so many fascinating possibilities. Here are some unique angles to consider:\n\n1. **The Butterfly Effect**: A character makes tiny changes in the past that create massive, unexpected consequences in the present.\n\n2. **Time Loop Mystery**: Someone is stuck reliving the same day, but each loop reveals new clues about why it's happening.\n\n3. **Future Archaeologist**: A person from the future studies our present time like we study ancient civilizations.\n\n4. **Memory Time Travel**: Instead of physical travel, someone can access and experience memories from different time periods.\n\n5. **Time Travel Tourism**: A story set in a world where time travel is commercialized and regulated.\n\nWhat kind of tone are you going for? Adventure, mystery, romance, or something else?",
        role: 'assistant',
      },
      {
        id: 'd4e5f6a7-b8c9-0123-defa-456789012345',
        date: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000 + 300000,
        ).toISOString(),
        content:
          "I love the memory time travel idea! I want to write something mysterious and emotional. What if someone could experience their ancestors' memories?",
        role: 'user',
      },
      {
        id: 'e5f6a7b8-c9d0-1234-efab-567890123456',
        date: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000 + 330000,
        ).toISOString(),
        content:
          "That's a brilliant concept! The ancestral memory angle adds such rich emotional depth. Here are some story elements to explore:\n\n**The Discovery**: Maybe your protagonist inherits an old family heirloom that triggers these memory experiences when touched.\n\n**The Mystery**: They could uncover a family secret that was deliberately hidden - perhaps a lost love, a betrayal, or a sacrifice that shaped their family's destiny.\n\n**Emotional Stakes**: Each memory could reveal more about why certain family traits, fears, or patterns exist. The protagonist might discover they're reliving their great-grandmother's choices.\n\n**The Conflict**: What if experiencing these memories starts to blur the line between past and present? Or what if they learn something that changes how they see their living family members?\n\nYou could start with a simple scene - maybe sorting through a recently deceased relative's belongings and finding something unexpected.",
        role: 'assistant',
      },
      {
        id: 'f6a7b8c9-d0e1-2345-fabc-678901234567',
        date: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        content:
          "This is perfect! I think I'll start with someone finding their grandmother's locket. Thank you for all the inspiration!",
        role: 'user',
      },
    ],
  },
  {
    id: 'a7b8c9d0-e1f2-3456-abcd-789012345678',
    title: 'Recipe Modifications',
    aiAssistant: aiAssistants[0],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 'b8c9d0e1-f2a3-4567-bcde-890123456789',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        content:
          'I have a classic chocolate chip cookie recipe, but I want to make it healthier without losing the taste. Any suggestions?',
        role: 'user',
      },
      {
        id: 'c9d0e1f2-a3b4-5678-cdef-901234567890',
        date: new Date(
          Date.now() - 5 * 24 * 60 * 60 * 1000 + 45000,
        ).toISOString(),
        content:
          'Absolutely! Here are some healthy swaps that will keep your cookies delicious:\n\n**Flour Alternatives:**\n- Replace half the all-purpose flour with almond flour or oat flour for added protein and fiber\n- Try whole wheat pastry flour for a nuttier flavor\n\n**Sugar Reductions:**\n- Replace half the sugar with mashed banana or unsweetened applesauce\n- Use coconut sugar or maple syrup (reduce liquid ingredients slightly)\n- Try stevia or monk fruit sweetener (use conversion charts)\n\n**Fat Improvements:**\n- Substitute half the butter with Greek yogurt or mashed avocado\n- Use coconut oil instead of butter for a subtle tropical note\n\n**Add-ins for Nutrition:**\n- Mix in chopped nuts, seeds, or dried fruit\n- Add a tablespoon of ground flaxseed or chia seeds\n- Include dark chocolate chips (70% cacao or higher)\n\nStart by changing just one or two ingredients at a time to see how you like the results!',
        role: 'assistant',
      },
      {
        id: 'd0e1f2a3-b4c5-6789-defa-012345678901',
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        content:
          'Great ideas! I tried the almond flour and Greek yogurt substitutions and they turned out amazing. Do you have any tips for storing healthier cookies?',
        role: 'user',
      },
      {
        id: 'e1f2a3b4-c5d6-7890-efab-123456789012',
        date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        content:
          "Excellent! Here are storage tips for healthier cookies:\n\n**Storage Methods:**\n- Store in an *airtight container* at room temperature for up to `5-7 days`\n- For longer storage, freeze them for up to `3 months`\n- ~~Don't store in the fridge~~ - this can make them stale\n\n*Pro tip:* Place a slice of bread in the container to keep cookies soft!\n\n**Special Considerations:**\n- Cookies with Greek yogurt may have shorter shelf life\n- Those with fresh fruit should be eaten quickly, usually within `2-3 days`\n- **Label containers** with the date and ingredients for easy reference",
        role: 'assistant',
      },
    ],
  },
  {
    id: 'a2b3c4d5-e6f7-8901-abcd-234567890123',
    title: 'Travel Planning',
    aiAssistant: aiAssistants[1],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 'b3c4d5e6-f7a8-9012-bcde-345678901234',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        content:
          "I'm planning a 10-day trip to Japan in spring. It's my first time there. What should I prioritize?",
        role: 'user',
      },
      {
        id: 'c4d5e6f7-a8b9-0123-cdef-456789012345',
        date: new Date(
          Date.now() - 7 * 24 * 60 * 60 * 1000 + 60000,
        ).toISOString(),
        content:
          "Japan in spring is magical! Here's a balanced itinerary focusing on must-see experiences:\n\n**Tokyo (4-5 days):**\n- Shibuya Crossing and Harajuku for modern culture\n- Senso-ji Temple in Asakusa for traditional architecture\n- Tsukiji Outer Market for incredible food\n- Day trip to Nikko for nature and UNESCO sites\n\n**Kyoto (3-4 days):**\n- Fushimi Inari Shrine (famous torii gates)\n- Arashiyama Bamboo Grove\n- Traditional neighborhoods like Gion\n- Kiyomizu-dera Temple for city views\n\n**Day trip options:**\n- Mount Fuji and Hakone for hot springs\n- Nara for deer park and giant Buddha\n\n**Spring specifics:**\n- Cherry blossoms typically peak in late March/early April\n- Weather is mild but pack layers\n- Book accommodations early - it's peak season!\n\nJR Pass is essential for train travel between cities. What interests you most - culture, food, nature, or modern attractions?",
        role: 'assistant',
      },
      {
        id: 'd5e6f7a8-b9c0-1234-defa-567890123456',
        date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        content:
          "This is so helpful! I'm most interested in food and traditional culture. Should I book any specific restaurants in advance?",
        role: 'user',
      },
    ],
  },
];
