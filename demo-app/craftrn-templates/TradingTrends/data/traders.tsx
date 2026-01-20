export type TraderItem = {
  id: string;
  nickname: string;
  profitPercentage: string;
  avatarURL: string;
  type: 'shares' | 'crypto' | 'currency';
};

type TradersData = readonly TraderItem[];

const allTraders: TradersData = [
  {
    id: 'trader-1',
    nickname: 'CryptoKing',
    profitPercentage: '+45.2%',
    avatarURL:
      'https://mockmind-api.uifaces.co/content/human/80.jpg',
    type: 'crypto',
  },
  {
    id: 'trader-2',
    nickname: 'StockMaster',
    profitPercentage: '+38.7%',
    avatarURL:
      'https://mockmind-api.uifaces.co/content/human/219.jpg',
    type: 'shares',
  },
  {
    id: 'trader-3',
    nickname: 'TradingPro',
    profitPercentage: '+32.1%',
    avatarURL:
      'https://mockmind-api.uifaces.co/content/human/222.jpg',
    type: 'currency',
  },
  {
    id: 'trader-4',
    nickname: 'BitcoinBull',
    profitPercentage: '+42.8%',
    avatarURL:
      'https://mockmind-api.uifaces.co/content/human/125.jpg',
    type: 'crypto',
  },
  {
    id: 'trader-5',
    nickname: 'EthereumElite',
    profitPercentage: '+39.5%',
    avatarURL:
      'https://mockmind-api.uifaces.co/content/human/92.jpg',
    type: 'crypto',
  },
  {
    id: 'trader-6',
    nickname: 'TechTrader',
    profitPercentage: '+36.3%',
    avatarURL:
      'https://mockmind-api.uifaces.co/content/human/128.jpg',
    type: 'shares',
  },
  {
    id: 'trader-7',
    nickname: 'ForexPro',
    profitPercentage: '+34.9%',
    avatarURL:
      'https://mockmind-api.uifaces.co/content/human/220.jpg',
    type: 'currency',
  },
  {
    id: 'trader-8',
    nickname: 'MarketMaven',
    profitPercentage: '+33.2%',
    avatarURL:
      'https://mockmind-api.uifaces.co/content/human/218.jpg',
    type: 'shares',
  },
  {
    id: 'trader-9',
    nickname: 'CurrencyCzar',
    profitPercentage: '+31.8%',
    avatarURL:
      'https://mockmind-api.uifaces.co/content/human/18.jpg',
    type: 'currency',
  },
];

export const topTraders: TradersData = allTraders;
