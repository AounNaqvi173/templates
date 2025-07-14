export interface ProfileData {
  name: string;
  email: string;
  memberSince: string;
  totalOrders: number;
  completedOrders: number;
  rating: number;
}

export const profileData: ProfileData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  memberSince: 'January 2023',
  totalOrders: 24,
  completedOrders: 18,
  rating: 4.8,
};
