import { User, usersData } from './users';

export type InboxItem = {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  isFavourite: boolean;
};

export type Message = {
  id: string;
  date: string;
  content: string[];
  senderId: string;
};

export const inboxItemData: InboxItem[] = [
  {
    id: '7d3463b7-9acd-4ee3-8d0e-3c28fab32945',
    participants: [usersData[0], usersData[3]],
    lastMessage: {
      id: 'e4b71542-89c8-4be3-9cd5-a11d4c863817',
      date: new Date(Date.now() - 60 * 60 * 1000 * 4.2).toISOString(),
      content: [
        'I think we’re done with the design, let’s start implementing it. And we should also add a lot of testimonials from happy customers.',
      ],
      senderId: usersData[3].id,
    },
    unreadCount: 2,
    isFavourite: false,
  },
  {
    id: '9c12c247-d7a8-4ae2-9d5f-8c1f9c9b1d58',
    participants: [usersData[0], usersData[7]],
    lastMessage: {
      id: 'b4fd6716-9fd0-4ae4-b40a-900c70f1fdbf',
      date: new Date(Date.now() - 60 * 60 * 1000 * 12).toISOString(),
      content: ['Great! I’ll draft some tooltips and the tutorial script.'],
      senderId: usersData[7].id,
    },
    unreadCount: 1,
    isFavourite: true,
  },
  {
    id: 'f5b6d8a2-e3c7-4b1f-9d8e-4a5b6c7d8e9f',
    participants: [usersData[0], usersData[9]],
    lastMessage: {
      id: '550e8400-e29b-41d4-a716-446655440004',
      date: new Date(Date.now() - 3 * (60 * 60 * 1000 * 24)).toISOString(),
      content: [
        'Absolutely, I will work on that. I think adding some dynamic color schemes based on data values will also make the charts more interactive. Let’s aim for a design review by the end of the week.',
      ],
      senderId: usersData[9].id,
    },
    unreadCount: 0,
    isFavourite: false,
  },
  {
    id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    participants: [usersData[0], usersData[2]],
    lastMessage: {
      id: 'a8b013aa-b7be-4534-aa4d-6b593b5dfe10',
      date: new Date(Date.now() - 5 * (60 * 60 * 1000 * 24)).toISOString(),
      content: [
        'Sounds good. Let’s start setting up the project structure. We can create separate folders for frontend and backend, establish coding conventions, and define our initial project milestones.',
      ],
      senderId: usersData[2].id,
    },
    unreadCount: 0,
    isFavourite: false,
  },
  {
    id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    participants: [usersData[0], usersData[4]],
    lastMessage: {
      id: '5b73e68a-9e6f-4b57-aa70-670c63d60a5b',
      date: new Date(Date.now() - 8 * (60 * 60 * 1000 * 24)).toISOString(),
      content: ['Let’s simplify the checkout flow and run another test.'],
      senderId: usersData[4].id,
    },
    unreadCount: 0,
    isFavourite: true,
  },
  {
    id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
    participants: [usersData[0], usersData[6]],
    lastMessage: {
      id: 'e4915e8d-e89c-4a3c-9a8d-3546a0a6e1f7',
      date: new Date(Date.now() - 14 * (60 * 60 * 1000 * 24)).toISOString(),
      content: [
        'I will schedule a meeting to discuss the performance optimization tasks and allocate resources accordingly.',
      ],
      senderId: usersData[0].id,
    },
    unreadCount: 0,
    isFavourite: true,
  },
  {
    id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
    participants: [usersData[0], usersData[10]],
    lastMessage: {
      id: '59a3505a-6a89-4c6b-a572-baf582b4b8d2',
      date: new Date(Date.now() - 21 * (60 * 60 * 1000 * 24)).toISOString(),
      content: ['I will start the integration this afternoon.'],
      senderId: usersData[10].id,
    },
    unreadCount: 0,
    isFavourite: true,
  },
  {
    id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
    participants: [usersData[0], usersData[11]],
    lastMessage: {
      id: '73f9e3b6-05ce-4707-a43b-6c4e24b6996b',
      date: new Date(Date.now() - 24 * (60 * 60 * 1000 * 24)).toISOString(),
      content: ['I will schedule the deployment for tomorrow.'],
      senderId: usersData[11].id,
    },
    unreadCount: 0,
    isFavourite: false,
  },
  {
    id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
    participants: [usersData[0], usersData[1]],
    lastMessage: {
      id: '85df3c6e-7a2c-4e0b-9c19-c0b4c6c2e4d9',
      date: new Date(Date.now() - 24 * (60 * 60 * 1000 * 24)).toISOString(),
      content: ['The final design for the app dashboard is ready for review.'],
      senderId: usersData[11].id,
    },
    unreadCount: 0,
    isFavourite: false,
  },
  {
    id: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
    participants: [usersData[0], usersData[12]],
    lastMessage: {
      id: '9b73f0c8-d31c-4a78-b5d3-4d8f1a4fc4c2',
      date: new Date(Date.now() - 27 * (60 * 60 * 1000 * 24)).toISOString(),
      content: ["Perfect! I'll update the documentation with these changes."],
      senderId: usersData[12].id,
    },
    unreadCount: 0,
    isFavourite: false,
  },
  {
    id: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e',
    participants: [usersData[0], usersData[13]],
    lastMessage: {
      id: 'f6c9d824-3e51-47d2-b8a1-2b4e9a7d5c3f',
      date: new Date(Date.now() - 30 * (60 * 60 * 1000 * 24)).toISOString(),
      content: ["I'll prepare the presentation for next week's demo then."],
      senderId: usersData[13].id,
    },
    unreadCount: 0,
    isFavourite: true,
  },
];
