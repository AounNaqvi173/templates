export type Tab = {
  label: string;
  icon: 'Notification' | 'LayerTwo' | 'File';
  notifications: number;
};

export const tabsData: Tab[] = [
  {
    label: 'All',
    icon: 'Notification',
    notifications: 2,
  },
  {
    label: 'Activities',
    icon: 'LayerTwo',
    notifications: 1,
  },
  {
    label: 'Files',
    icon: 'File',
    notifications: 0,
  },
];
