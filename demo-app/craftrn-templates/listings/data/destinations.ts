export type Destination = {
  label: string;
  icon: 'MarkerPin' | 'TimeClock';
};

export const searchDestinations: Destination[] = [
  { icon: 'MarkerPin', label: 'Montreal, Canada' },
  { icon: 'MarkerPin', label: 'Toronto, Canada' },
  { icon: 'MarkerPin', label: 'Vancouver, Canada' },
];

export const recentSearches: Destination[] = [
  { icon: 'TimeClock', label: 'London, United Kingdom' },
  { icon: 'TimeClock', label: 'Paris, France' },
  { icon: 'TimeClock', label: 'Barcelona, Spain' },
];

export const popularDestinations: Destination[] = [
  { icon: 'MarkerPin', label: 'New York, United States' },
  { icon: 'MarkerPin', label: 'Sydney, Australia' },
  { icon: 'MarkerPin', label: 'Tokyo, Japan' },
  { icon: 'MarkerPin', label: 'Rome, Italy' },
];
