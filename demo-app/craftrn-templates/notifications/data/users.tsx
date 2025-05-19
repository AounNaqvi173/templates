export type AvatarColor = 0 | 1 | 2 | 3;

export type User = {
  id: string;
  name: string;
  initials: string;
  avatar: string;
  avatarColor: AvatarColor;
};

export const usersData: User[] = [
  {
    id: '9c0b2c4a-5e2f-4f97-8b15-45cde9e72b1d',
    name: 'Paul Martin',
    initials: 'PM',
    avatarColor: 0,
    avatar: 'https://xsgames.co/randomusers/assets/avatars/male/18.jpg',
  },
  {
    id: 'ac1e5c70-8b45-4c9a-8f64-2f4c3f2c2fa9',
    name: 'Louise Dupont',
    initials: 'LD',
    avatarColor: 1,
    avatar: 'https://xsgames.co/randomusers/assets/avatars/female/0.jpg',
  },
  {
    id: 'b1f4f3c4-8ad5-4b13-90c6-7de2c5ddc5e5',
    name: 'Charlotte Dubois',
    initials: 'CD',
    avatarColor: 2,
    avatar: 'https://xsgames.co/randomusers/assets/avatars/female/21.jpg',
  },
  {
    id: 'd2c0d2c9-ecb8-4ed8-8b19-16be4d24fba8',
    name: 'Lucas Perrin',
    initials: 'LP',
    avatarColor: 3,
    avatar: '',
  },
  {
    id: '9eeab4db-4f4b-4dcf-9b69-6cd3a6e9fd0f',
    name: 'Marie Dumas',
    initials: 'MD',
    avatarColor: 0,
    avatar: 'https://xsgames.co/randomusers/assets/avatars/female/22.jpg',
  },
  {
    id: 'f7b6c5a6-6b47-4532-9f49-6f7e7bf3c11d',
    name: 'Stéphane Petit',
    initials: 'SP',
    avatarColor: 1,
    avatar: 'https://xsgames.co/randomusers/assets/avatars/male/4.jpg',
  },
  {
    id: 'e7f42f41-6d4e-4d8c-8b63-5f1bd8b3ea7b',
    name: 'Pierre Blanc',
    initials: 'PB',
    avatarColor: 2,
    avatar: 'https://xsgames.co/randomusers/assets/avatars/male/8.jpg',
  },
];
