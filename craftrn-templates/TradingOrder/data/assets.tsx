export type AssetsItem = {
  id: string;
  from: {
    ticker: string;
    symbol: string;
    imageURL: string;
  };
  to: {
    ticker: string;
    symbol: string;
    imageURL: string;
  };
  rate: string;
  change: string;
};

type AssetsData = readonly AssetsItem[];

export const assets: AssetsData = [
  {
    id: '3e458e61-677c-4d55-b908-507a490a4853',
    from: {
      ticker: 'EUR',
      symbol: '€',
      imageURL:
        'https://media.istockphoto.com/id/530234499/photo/european-union-flag.jpg?s=612x612&w=0&k=20&c=jUKgc6dGz74FWIvnyKJwEU-Cq82TQWgRgPlTyf0qPD8=',
    },
    to: {
      ticker: 'GBP',
      symbol: '£',
      imageURL:
        'https://media.istockphoto.com/id/497118178/vector/flag-of-great-britain.jpg?s=612x612&w=0&k=20&c=yAuSdTVvmou5r5_gEj7NHdGdYmJfQPorq_9UFz2iEWk=',
    },
    rate: '0.8564',
    change: '-0.25%',
  },
  {
    id: '353234ee-982f-4765-937b-2759ca65a759',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'GBP',
      symbol: '£',
      imageURL:
        'https://media.istockphoto.com/id/497118178/vector/flag-of-great-britain.jpg?s=612x612&w=0&k=20&c=yAuSdTVvmou5r5_gEj7NHdGdYmJfQPorq_9UFz2iEWk=',
    },
    rate: '0.7543',
    change: '0.13%',
  },
  {
    id: '9d95e10c-959d-4784-9259-595542054599',
    from: {
      ticker: 'GBP',
      symbol: '£',
      imageURL:
        'https://media.istockphoto.com/id/497118178/vector/flag-of-great-britain.jpg?s=612x612&w=0&k=20&c=yAuSdTVvmou5r5_gEj7NHdGdYmJfQPorq_9UFz2iEWk=',
    },
    to: {
      ticker: 'JPY',
      symbol: '¥',
      imageURL:
        'https://media.istockphoto.com/id/537287287/vector/flag-of-japan.jpg?s=612x612&w=0&k=20&c=ib29xXdb3_UtWw0S0Md0Mvbzz1DmsAA6Q5FP1X_4WZQ=',
    },
    rate: '161.83',
    change: '0.63%',
  },
  {
    id: '13919513-9c18-467c-be95-b3249585370e',
    from: {
      ticker: 'CNY',
      symbol: '¥',
      imageURL:
        'https://media.istockphoto.com/id/537287169/vector/flag-of-china.jpg?s=612x612&w=0&k=20&c=PZMieLTEfmwDg7hcnXR3uPfMEld5MOtZRBoVQqi9dZI=',
    },
    to: {
      ticker: 'GBP',
      symbol: '£',
      imageURL:
        'https://media.istockphoto.com/id/497118178/vector/flag-of-great-britain.jpg?s=612x612&w=0&k=20&c=yAuSdTVvmou5r5_gEj7NHdGdYmJfQPorq_9UFz2iEWk=',
    },
    rate: '0.1136',
    change: '-0.11%',
  },
  {
    id: '7e458e61-677c-4d55-b908-507a490a4854',
    from: {
      ticker: 'CAD',
      symbol: 'C$',
      imageURL:
        'https://media.istockphoto.com/id/934017954/vector/canada-flag.jpg?s=612x612&w=0&k=20&c=QYOJlgWtujlAPzncX5H4UFPDpySMhoh2iPc_zi2t_zQ=',
    },
    to: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    rate: '0.7325',
    change: '0.18%',
  },
  {
    id: '555f9345-9201-4025-838e-08852353b001',
    from: {
      ticker: 'JPY',
      symbol: '¥',
      imageURL:
        'https://media.istockphoto.com/id/537287287/vector/flag-of-japan.jpg?s=612x612&w=0&k=20&c=ib29xXdb3_UtWw0S0Md0Mvbzz1DmsAA6Q5FP1X_4WZQ=',
    },
    to: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    rate: '0.0093',
    change: '-0.42%',
  },
  {
    id: '3e458e61-677c-4d55-b909-507a490a4853',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'BTC',
      symbol: 'BTC',
      imageURL:
        'https://logos-world.net/wp-content/uploads/2020/08/Bitcoin-Logo.png',
    },
    rate: '38805.81',
    change: '-2.15%',
  },
  {
    id: '2b6f0cc7-84d5-45ec-834b-22edd519e6e5',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'ETH',
      symbol: 'ETH',
      imageURL:
        'https://www.citypng.com/public/uploads/preview/ethereum-eth-round-logo-icon-png-701751694969815akblwl2552.png',
    },
    rate: '2960.76',
    change: '0.17%',
  },
  {
    id: '9c4f4a8e-1c6e-4ba4-9ce6-5a6f2fcd6f9c',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'USDT',
      symbol: 'USDT',
      imageURL:
        'https://w7.pngwing.com/pngs/520/303/png-transparent-tether-united-states-dollar-cryptocurrency-fiat-money-market-capitalization-bitcoin-logo-bitcoin-trade.png',
    },
    rate: '1.00',
    change: '0.00%',
  },
  {
    id: 'ed38f2c2-cb2f-4f4e-8d8a-6c9e9b25a6a5',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'BNB',
      symbol: 'BNB',
      imageURL:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe9rjRtIJJM5o6xP2LqfQFFcWejwFgRA1rag&s',
    },
    rate: '309.56',
    change: '-0.64%',
  },
  {
    id: 'd9c5e6a1-9f5d-4c2a-8f4c-9b7c9a61fe3c',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'XRP',
      symbol: 'XRP',
      imageURL:
        'https://www.iconarchive.com/download/i109650/cjdowner/cryptocurrency-flat/Ripple-XRP.1024.png',
    },
    rate: '0.25801',
    change: '-1.51%',
  },
  {
    id: 'c3a20c9e-3f1c-4b4e-8a24-2edc8f2b3ecf',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'DOGE',
      symbol: 'DOGE',
      imageURL:
        'https://static.wikia.nocookie.net/businessempire/images/c/c7/Crypto_dogecoin.png/revision/latest/thumbnail/width/360/height/450?cb=20230223081450',
    },
    rate: '147.02',
    change: '-2.78%',
  },
  {
    id: 'f4f3f5a7-8eb7-4a9b-8c8b-2ab1c3b4fba3',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'LTC',
      symbol: 'LTC',
      imageURL:
        'https://upload.wikimedia.org/wikipedia/commons/e/e3/Litecoin_Logo.jpg',
    },
    rate: '169.16',
    change: '-0.87%',
  },
  {
    id: '95c3a8c4-8d46-4a4b-8f4c-2f1a7a4f1f0f',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL: 'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'XLM',
      symbol: 'XLM',
      imageURL:
        'https://s2.coinmarketcap.com/static/img/coins/200x200/512.png',
    },
    rate: '0.00000000647',
    change: '-0.36%',
  },
  {
    id: '5503557c-3726-400b-8001-35c5858860e3',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'GOOGL',
      symbol: 'GOOGL',
      imageURL:
        'https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-512.png',
    },
    rate: '167.18',
    change: '-1.85%',
  },
  {
    id: '5503557c-3726-400b-8001-35c5858860c3',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'FB',
      symbol: 'FB',
      imageURL:
        'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-512.png',
    },
    rate: '526.73',
    change: '-0.47%',
  },
  {
    id: '5503557c-3726-400b-8001-35c5858860f3',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'AMZN',
      symbol: 'AMZN',
      imageURL:
        'https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png',
    },
    rate: '178.88',
    change: '+1.42%',
  },
  {
    id: '5503557c-3726-400b-8001-35c5858860a3',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'AAPL',
      symbol: 'AAPL',
      imageURL:
        'https://cdn2.iconfinder.com/data/icons/social-icons-grey/512/APPLE-512.png',
    },
    rate: '226.51',
    change: '+2.15%',
  },
  {
    id: '5503557c-3726-400b-8001-35c5858860b3',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'MSFT',
      symbol: 'MSFT',
      imageURL:
        'https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/78-microsoft-512.png',
    },
    rate: '424.80',
    change: '+1.87%',
  },
  {
    id: 'a7f3b2c1-8e4d-4f5a-9b6c-2d3e4f5a6b7c',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'TSLA',
      symbol: 'TSLA',
      imageURL:
        'https://i.pinimg.com/736x/9b/97/b0/9b97b033ff5aa3ca3295dad59763541c.jpg',
    },
    rate: '248.50',
    change: '-3.25%',
  },
  {
    id: 'b8e4c3d2-9f5e-4a6b-0c7d-3e4f5a6b7c8d',
    from: {
      ticker: 'USD',
      symbol: '$',
      imageURL:
        'https://media.istockphoto.com/id/487485528/vector/american-flag.jpg?s=612x612&w=0&k=20&c=6bypKWbj_cY14h00yDllWUpuhrQK2Dn5ilyzOLBnamQ=',
    },
    to: {
      ticker: 'META',
      symbol: 'META',
      imageURL:
        'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-512.png',
    },
    rate: '526.73',
    change: '-2.47%',
  },
];
