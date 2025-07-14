export type User = {
  id: string;
  name: string;
  initials: string;
  avatarUri: string;
  avatarColor: 0 | 1 | 2 | 3;
  lastSeen: string;
  isOnline: boolean;
};

export const currentUser: User = {
  id: '73c3b3c1-3d9f-4a5e-aa4c-55a8f7f9d9e3',
  name: 'Alex Lefevre',
  initials: 'AL',
  avatarUri: 'https://xsgames.co/randomusers/assets/avatars/male/38.jpg',
  avatarColor: 0,
  lastSeen: new Date(Date.now() - 2 * (60 * 1000)).toISOString(),
  isOnline: true,
};
export const usersData: User[] = [
  currentUser,
  {
    id: '9c0b2c4a-5e2f-4f97-8b15-45cde9e72b1d',
    name: 'Paul Martin',
    initials: 'PM',
    isOnline: true,
    lastSeen: new Date(Date.now() - 5 * (60 * 1000)).toISOString(),
    avatarColor: 0,
    avatarUri: 'https://xsgames.co/randomusers/assets/avatars/male/18.jpg',
  },
  {
    id: 'ac1e5c70-8b45-4c9a-8f64-2f4c3f2c2fa9',
    name: 'Louise Dupont',
    initials: 'LD',
    isOnline: true,
    lastSeen: new Date(Date.now() - 8 * (60 * 1000)).toISOString(),
    avatarColor: 1,
    avatarUri: 'https://xsgames.co/randomusers/assets/avatars/female/0.jpg',
  },
  {
    id: 'b1f4f3c4-8ad5-4b13-90c6-7de2c5ddc5e5',
    name: 'Charlotte Dubois',
    initials: 'CD',
    isOnline: true,
    lastSeen: new Date(Date.now() - 3 * (60 * 1000)).toISOString(),
    avatarColor: 2,
    avatarUri: 'https://xsgames.co/randomusers/assets/avatars/female/21.jpg',
  },
  {
    id: 'd2c0d2c9-ecb8-4ed8-8b19-16be4d24fba8',
    name: 'Lucas Perrin',
    initials: 'LP',
    isOnline: false,
    lastSeen: new Date(Date.now() - 50 * (60 * 1000)).toISOString(),
    avatarColor: 3,
    avatarUri: 'https://404',
  },
  {
    id: '9eeab4db-4f4b-4dcf-9b69-6cd3a6e9fd0f',
    isOnline: false,
    lastSeen: new Date(Date.now() - 120 * (60 * 1000)).toISOString(),
    name: 'Marie Dumas',
    initials: 'MD',
    avatarColor: 0,
    avatarUri: 'https://xsgames.co/randomusers/assets/avatars/female/22.jpg',
  },
  {
    id: 'f7b6c5a6-6b47-4532-9f49-6f7e7bf3c11d',
    isOnline: false,
    lastSeen: new Date(Date.now() - 30 * (60 * 1000)).toISOString(),
    name: 'Stéphane Petit',
    initials: 'SP',
    avatarColor: 1,
    avatarUri: 'https://xsgames.co/randomusers/assets/avatars/male/4.jpg',
  },
  {
    id: 'e7f42f41-6d4e-4d8c-8b63-5f1bd8b3ea7b',
    isOnline: false,
    lastSeen: new Date(Date.now() - 45 * (60 * 1000)).toISOString(),
    name: 'Pierre Blanc',
    initials: 'PB',
    avatarColor: 2,
    avatarUri: 'https://xsgames.co/randomusers/assets/avatars/male/8.jpg',
  },
  {
    id: '9cfaa6c1-4ba4-4bad-a5c1-3b9a9bf3c2f9',
    isOnline: true,
    lastSeen: new Date(Date.now() - 1 * (60 * 1000)).toISOString(),
    name: 'Isabelle Girard',
    initials: 'IG',
    avatarColor: 3,
    avatarUri: 'https://xsgames.co/randomusers/assets/avatars/female/27.jpg',
  },
  {
    id: 'cfae9dd9-0b2a-4cae-8b6d-0f6f00a8e4f0',
    isOnline: true,
    lastSeen: new Date(Date.now() - 4 * (60 * 1000)).toISOString(),
    name: 'Sophie Garnier',
    initials: 'SG',
    avatarColor: 0,
    avatarUri: 'https://xsgames.co/randomusers/assets/avatars/female/11.jpg',
  },
  {
    id: 'f2c53b44-8b3a-46c9-a6c4-ec0b3ca7c0e1',
    isOnline: true,
    lastSeen: new Date(Date.now() - 5 * (60 * 1000)).toISOString(),
    name: 'Camille Bourgeois',
    initials: 'CB',
    avatarColor: 1,
    avatarUri: 'https://xsgames.co/randomusers/assets/avatars/female/29.jpg',
  },
  {
    id: 'e6c7e6c7-42a7-4b17-8b7c-45c0de9e72b1',
    isOnline: true,
    lastSeen: new Date(Date.now() - 8 * (60 * 1000)).toISOString(),
    name: 'Hugo Leroy',
    initials: 'HL',
    avatarColor: 2,
    avatarUri: 'https://xsgames.co/randomusers/assets/avatars/male/9.jpg',
  },
  {
    id: 'd2c0d2c9-ea2f-41f8-8b19-16be4d24fba8',
    isOnline: false,
    lastSeen: new Date(Date.now() - 80 * (60 * 1000)).toISOString(),
    name: 'Lucie Mouton',
    initials: 'LM',
    avatarColor: 3,
    avatarUri: 'https://xsgames.co/randomusers/assets/avatars/female/32.jpg',
  },
  {
    id: 'abc1d1a67-76de-4d7d-8e1c-de22320b45c',
    isOnline: false,
    lastSeen: new Date(Date.now() - 80 * (60 * 1000)).toISOString(),
    name: 'Alice Perrot',
    initials: 'AP',
    avatarColor: 0,
    avatarUri: 'https://xsgames.co/randomusers/assets/avatars/female/25.jpg',
  },
];
