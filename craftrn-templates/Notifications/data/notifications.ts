import { User, usersData } from './users';

type NotificationBase = {
  id: string;
  from: User;
  date: string;
  unread: boolean;
  where?: string;
};

type NotificationDetails =
  | { type: 'file'; details: { fileName: string; fileSize: string } }
  | { type: 'message' | 'mention' | 'comment'; details: { message: string } }
  | { type: 'access'; details: object };

export type Notification = NotificationBase & NotificationDetails;

export const notificationsData: Notification[] = [
  {
    id: '3c7f7f11-72c4-40e5-81e7-54c3eeb6b6a4',
    type: 'message',
    from: usersData[0],
    details: {
      message: 'It can be a good idea to use a custom theme for your app',
    },
    date: new Date(Date.now() - 1 * (60 * 60 * 1000)).toISOString(),
    unread: true,
  },
  {
    id: 'd6c7f7f11-72c4-40e5-81e7-54c3eeb6b6a4',
    type: 'access',
    from: usersData[1],
    details: {},
    where: '#Design',
    date: new Date(Date.now() - 3 * (60 * 60 * 1000)).toISOString(),
    unread: true,
  },
  {
    id: '4c7f7f11-72c4-40e5-81e7-54c3eeb6b6a4',
    type: 'file',
    from: usersData[2],
    details: {
      fileName: 'design.fig',
      fileSize: '1.2MB',
    },
    date: new Date(Date.now() - 10 * (60 * 60 * 1000)).toISOString(),
    unread: false,
  },
  {
    id: 'd7c7f7f11-72c4-40e5-81e7-54c3eeb6b6a4',
    type: 'comment',
    from: usersData[3],
    where: 'UX-123 - Improve the landing page',
    details: {
      message:
        'It really looks fantastic! I love what you did with the landing page.',
    },
    date: new Date(Date.now() - 18 * (60 * 60 * 1000)).toISOString(),
    unread: false,
  },
  {
    id: '3dc7f7f11-72c4-40e5-81e7-54c3eeb6b6a4',
    type: 'mention',
    from: usersData[4],
    details: {
      message:
        'Hey Alex I need your help. Can you review this design for me please? I think it needs some work.',
    },
    where: '#Design',
    date: new Date(Date.now() - 30 * (60 * 60 * 1000)).toISOString(),
    unread: false,
  },
  {
    id: 'e7c7f7f11-72c4-40e5-81e7-54c3eeb6b6a4',
    type: 'comment',
    from: usersData[5],
    details: {
      message: 'Do you think we should use React for this new landing page?',
    },
    where: 'ENG-345 - Implement the new design',
    date: new Date(Date.now() - 60 * (60 * 60 * 1000)).toISOString(),
    unread: false,
  },
];
