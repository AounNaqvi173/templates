export type StaysItem = {
  id: string;
  title: string;
  hostType: string;
  pricePerNight: string;
  rating: number;
  location: string;
  description: string;
  photos: { id: string; uri: string }[];
  amenities: string[];
  checkInPolicy: string;
  checkOutPolicy: string;
  cancellationPolicy: string;
  petPolicy: string;
};

export type StaysData = StaysItem[];
export const staysData: StaysData = [
  {
    id: 'f7a97e34-1b6f-4f5c-ae16-d7c28f1de169',
    title: 'Relaxing 5-star stays in Ao Nang, Krabi with private pool',
    hostType: 'Stays',
    pricePerNight: '$120',
    rating: 4.8,
    location: 'Ao Nang, Krabi, Thailand',
    description:
      'Indulge in world-class dining with a variety of on-site restaurants serving both authentic Thai cuisine and international favorites, all crafted with fresh, locally sourced ingredients. For those seeking adventure, the stays offers guided excursions to nearby islands, snorkeling trips, and jungle treks, ensuring an unforgettable experience amidst Krabi’s natural beauty.\n\nUnwind in elegantly designed rooms that blend modern comfort with traditional Thai accents, each featuring private balconies or terraces to soak in breathtaking sunsets. With exceptional service, state-of-the-art fitness facilities, and personalized concierge assistance, every moment at this luxurious retreat is designed to provide the perfect balance of relaxation and exploration.',
    photos: [
      {
        id: 'c1d2e3f4-a5b6-7c8d-9e0f-a1b2c3d4eaf6',
        uri: 'https://plus.unsplash.com/premium_photo-1675745329634-4dc1f4247e48?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGhhaWxhbmQlMjByZXNvcnR8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: 'bc1d1a67-76de-4d7d-8e2c-cf22380b45b3',
        uri: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhaWxhbmR8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: 'a26e45d7-cba0-4873-8ff6-1e59d0fc8e14',
        uri: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: '3eb8fd79-3ef5-4b9a-b6ee-1cc1e85b771b',
        uri: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=3478&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    amenities: [
      'Private pool',
      'Fitness center',
      'Spa',
      'Free parking',
      'Free Wi-Fi',
      'Restaurant',
      'Bar',
      'Room service',
      'Concierge',
      'Airport shuttle',
    ],
    checkInPolicy: 'After 3 PM',
    checkOutPolicy: 'By 11 AM',
    cancellationPolicy: 'Free cancellation up to 48 hours before arrival',
    petPolicy: 'Pets not allowed',
  },
  {
    id: '27d482ba-9d4e-4f7c-81c8-9c9a97b1d7e9',
    title: 'Explore Tokyo: 3 bedroom traditional Japanese apartment',
    hostType: 'Private host',
    pricePerNight: '$235',
    rating: 4.6,
    location: 'Tokyo, Japan',
    description:
      'Experience the vibrant city of Tokyo from the comfort of this spacious 3-bedroom apartment. This apartment offers stunning views of the Tokyo Tower and is just a short walk from the famous Shibuya Crossing. Enjoy the convenience of a private lift and the tranquility of a quiet neighborhood.',
    photos: [
      {
        id: '81e35b2e-9d22-4d55-80be-bf25f1ea6a35',
        uri: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2hpYnV5YXxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        id: '3e59803d-6d0d-4c0e-bbff-bf02033f8da5',
        uri: 'https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: '31863f9a-fb35-445d-bf42-d946f0d0c88e',
        uri: 'https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 'e33e6f4f-66f5-4c4f-8f67-7a1f2a8c7bdc',
        uri: 'https://images.unsplash.com/photo-1503640538573-148065ba4904?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    amenities: [
      'Private lift',
      'Fitness equipment (in building)',
      'Free parking (on-site or nearby)',
      'Free Wi-Fi',
      'Fully equipped kitchen',
      'Coffee maker',
      'Balcony or terrace',
      'In-unit washer and dryer',
    ],
    checkInPolicy: 'after 4 PM',
    checkOutPolicy: 'By 10 AM',
    cancellationPolicy: 'Free cancellation up to 7 days before arrival',
    petPolicy: 'Pets allowed with prior approval',
  },
  {
    id: 'a687d4ea-512f-4321-b981-e6b545a90a5e',
    title: 'Love in Paris: Romantic 2 bedroom apartment with Eiffel Tower view',
    hostType: 'Private host',
    pricePerNight: '$230',
    rating: 4.9,
    location: 'Paris, France',
    description:
      'Experience the romance of Paris from the comfort of this charming 2-bedroom apartment. Located in the heart of the city, this apartment offers stunning views of the Eiffel Tower and is just a short walk from the famous Champs-Elysées. Enjoy the convenience of a fully-equipped kitchen and the tranquility of a quiet neighborhood.',
    photos: [
      {
        id: 'c1d2e3f4-a5b6-7c8d-9e0f-a1b2c3d4e5f6',
        uri: 'https://images.unsplash.com/photo-1613411339899-c3be680cf5f0?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: '4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f90',
        uri: 'https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=3020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 'c6f17a5a-0f1d-4d5d-b05a-948765432101',
        uri: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: '6547a901-0f1d-4b5d-b05a-948765432101',
        uri: 'https://images.unsplash.com/photo-1541264161754-445bbdd7de52?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: '6ba7b810-9dad-11db-83b0-0800200c9a66',
        uri: 'https://images.unsplash.com/photo-1507666664345-c49223375e33?q=80&w=3548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
    amenities: [
      'Lift',
      'Self check-in',
      'Air conditioning and heating',
      'Free Wi-Fi',
      'Fully equipped kitchen',
      'Balcony or terrace',
      'In-unit washer and dryer',
      'Essentials (towels, bed linens, toiletries)',
      'Local guidebook or recommendations',
    ],
    checkInPolicy: 'after 3 PM',
    checkOutPolicy: 'By 11 AM',
    cancellationPolicy: 'No cancellation possible',
    petPolicy: 'Pets allowed with prior approval',
  },
  {
    id: 'f2a1b3c4-d5e6-7f8g-9h0i-j1k2l3m4n5o6',
    title: 'Explore London: The Heart of British Heritage',
    hostType: 'Stays',
    pricePerNight: '$350',
    rating: 4.7,
    location: 'London, UK',
    description:
      'Discover the rich history and vibrant culture of London, home to iconic landmarks and diverse neighborhoods.',
    photos: [
      {
        id: '1a2b3c4d-5e6f-7081-92a3-b4c5d6e7f809',
        uri: 'https://plus.unsplash.com/premium_photo-1661877049198-e81833f96f6d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fExvbmRvbiUyMGhvdGVsJTIwZmFuY3l8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: '9f8e7d6c-5b4a-3c2d-1e0f-9a8b7c6d5e4f',
        uri: 'https://plus.unsplash.com/premium_photo-1683769252575-43c3c4d8d3b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fExvbmRvbiUyMGhvdGVsJTIwZmFuY3l8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: '2b3c4d5e-6f7a-8091-92b3-c4d5e6f7a8b9',
        uri: 'https://images.unsplash.com/photo-1470608756445-2c9906b0680f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fExvbmRvbiUyMGhvdGVsJTIwZmFuY3l8ZW58MHx8MHx8fDA%3D',
      },
    ],
    amenities: [
      'Free Wi-Fi',
      'Breakfast included',
      'Gym',
      'Pool',
      'Spa',
      'Restaurant',
      'Bar',
      'Room service',
      'Concierge',
      'Airport shuttle',
    ],
    checkInPolicy: 'After 3 PM',
    checkOutPolicy: 'By 11 AM',
    cancellationPolicy: 'Free cancellation up to 48 hours before arrival',
    petPolicy: 'Pets allowed with prior approval',
  },
  {
    id: 'g3h4i5j6-k7l8-9m0n-o1p2-q3r4s5t6u7v8',
    title: "Experience Yosemite National Park: Nature's Masterpiece",
    hostType: 'Cabin',
    pricePerNight: '$252',
    rating: 4.9,
    location: 'Yosemite National Park, USA',
    description:
      'Immerse yourself in the breathtaking landscapes and outdoor adventures that Yosemite National Park has to offer.',
    photos: [
      {
        id: '7e6d5c4b-3a2f-1e0d-9c8b-7a6f5e4d3c2b',
        uri: 'https://plus.unsplash.com/premium_photo-1686090450574-214118216bdc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8eW9zZW1pdGUlMjBjYWJpbnxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        id: '3f50a8e2-9c4e-4d2b-8b5a-1d2c3e4f5a6b',
        uri: 'https://plus.unsplash.com/premium_photo-1686090449200-57266c6623a6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGxvZGdlJTIwaW5kb29yJTIwY2FiaW58ZW58MHx8MHx8fDA%3D',
      },
      {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        uri: 'https://plus.unsplash.com/premium_photo-1664304414632-f23e7cc5aa81?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8eW9zZW1pdGV8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: 'f0e1d2c3-b4a5-6789-0abc-def123456789',
        uri: 'https://images.unsplash.com/photo-1628699948318-2d9d692c6e9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fHlvc2VtaXRlfGVufDB8fDB8fHww',
      },
      {
        id: '4a5b6c7d-8e9f-0abc-def1-234567890ab',
        uri: 'https://images.unsplash.com/photo-1548113534-4ce247b1b0a2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fHlvc2VtaXRlfGVufDB8fDB8fHww',
      },
    ],
    amenities: [
      'Hiking trails',
      'Free parking',
      'Fireplace',
      'Kitchen',
      'Free Wi-Fi',
      'Outdoor grill',
      'Hot tub',
      'Laundry facilities',
      'Fishing',
      'Pet-friendly',
    ],
    checkInPolicy: 'After 2 PM',
    checkOutPolicy: 'By 10 AM',
    cancellationPolicy: 'Free cancellation up to 72 hours before arrival',
    petPolicy: 'Pets allowed with prior approval',
  },
];
