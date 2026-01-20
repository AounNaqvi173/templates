# AGENTS.md

## Template Purpose

Financial dashboard with real-time updates, scroll-driven animations, and asset management. Use for trading apps, portfolio tracking, or financial data visualization.

**IMPORTANT:** Always reference `info.json` for exact dependencies and component structure.

### Core Components Structure

```
TradingDashboard/
├── TradingDashboardScreen.tsx    # Main dashboard interface
├── PortfolioHeader.tsx           # Portfolio value display
├── AssetHighlights.tsx           # Horizontal scrolling asset cards
├── AssetListItem.tsx             # List row for exchange rates
├── AssetGridItem.tsx             # Grid item for crypto assets
├── ExchangeRate.tsx              # Exchange rate display component
├── SectionHeader.tsx             # Section title component
├── data/
│   └── assets.tsx                # Financial data and types
└── utils/
    └── numbers.ts                # Number formatting utilities
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:

- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `ListItem` and `Text` components for data display
- `ChevronDown` and `ChevronUp` icons for trend indicators
- Advanced scroll animations with `react-native-reanimated`
- Financial color schemes for positive/negative values

## Data Structure & API Integration

### Mock Data Model

```typescript
interface AssetsItem {
  id: string;
  type: 'currency' | 'crypto' | 'shares';
  name: string;
  fromTicker: string;
  toTicker: string;
  sellPrice: string;
  fromSymbol: string;
  toSymbol: string;
  change: string;
  imageURL: string;
  marketCap?: number;
  volume24h?: number;
}

interface PortfolioData {
  value: string;
  change: string;
  changePercentage: string;
  isPositive: boolean;
  totalAssets: number;
  totalReturn: string;
}
```

### API Integration with React Query

Recommended pattern for financial data management:

```typescript
// api/useAssetPrices.ts
export const useAssetPrices = (symbols: string[]) => {
  return useQuery({
    queryKey: ['assets', 'prices', symbols],
    queryFn: () =>
      fetch('/api/assets/prices', {
        method: 'POST',
        body: JSON.stringify({ symbols }),
      }).then(r => r.json()),
    refetchInterval: 30000, // Update every 30 seconds
    staleTime: 15000, // Consider fresh for 15 seconds
  });
};

// api/usePortfolioValue.ts
export const usePortfolioValue = (userId: string) => {
  return useQuery({
    queryKey: ['portfolio', 'value', userId],
    queryFn: () => fetch(`/api/portfolio/${userId}/value`).then(r => r.json()),
    refetchInterval: 60000, // Update every minute
  });
};
```

## Template Customization Patterns

### Portfolio Overview Pattern

Dynamic portfolio value display with performance indicators:

```typescript
const PortfolioOverview = ({ portfolioData, isLoading }) => (
  <View style={styles.portfolioContainer}>
    <Text variant="body3">Portfolio value</Text>
    {isLoading ? (
      <SkeletonLoader height={40} width={200} />
    ) : (
      <Text variant="heading1">{portfolioData.value}</Text>
    )}
    <PerformanceIndicator
      change={portfolioData.change}
      isPositive={portfolioData.isPositive}
    />
  </View>
);
```

### Trend Indicator Pattern

Dynamic visual indicators based on data values:

```typescript
const TrendIndicator = ({ change }) => {
  const isNegative = change.substring(0, 1) === '-';

  return (
    <View style={styles.trendContainer}>
      {isNegative ? (
        <ChevronDown size={16} color={theme.colors.negativePrimary} />
      ) : (
        <ChevronUp size={16} color={theme.colors.positivePrimary} />
      )}
      <Text style={styles.changeText(isNegative)}>{change}</Text>
    </View>
  );
};
```

## Template Extension & Reuse Patterns

### Financial Interface Variations

This template can be adapted for different financial and data-driven applications:

1. **Crypto Portfolio**: Focus on cryptocurrency assets with market cap data
2. **Stock Trading**: Equity markets with company fundamentals and news
3. **Forex Dashboard**: Currency pairs with economic indicators
4. **Investment Analytics**: Portfolio performance with risk metrics
5. **Business Metrics**: KPI dashboards with trend analysis and goals

### Data Visualization Adaptations

Different dashboard types require specific visualizations:

```typescript
// Crypto-focused adaptation
type CryptoDashboard = {
  totalValue: number;
  holdings: CryptoAsset[];
  marketOverview: {
    totalMarketCap: number;
    bitcoinDominance: number;
    fearGreedIndex: number;
  };
};

// Business metrics adaptation
type BusinessDashboard = {
  revenue: number;
  kpis: MetricItem[];
  trends: TrendData[];
  goals: GoalProgress[];
};
```

### Adding New Features

- **Advanced Charts**: Line charts, candlestick charts with technical indicators
- **Portfolio Management**: Asset allocation visualization and rebalancing
- **Trading Functionality**: Buy/sell order placement and execution
- **Real-time Updates**: WebSocket connections for live market data
- **Performance Analytics**: Sharpe ratio, volatility, and risk metrics

### Customization Guidelines

- Follow existing asset categorization patterns for data organization
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui components for consistent financial data display
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain scroll animation patterns for smooth user experience
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve trend indicator color schemes for visual consistency
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep real-time update patterns for live data synchronization
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain feature-based file colocation - group related files together rather than separating by type (avoid generic `hooks/`, `components/` folders unless shared across multiple features)

## TypeScript Rules

**STRICT TYPING REQUIREMENTS:**

- NEVER use `any` type - always provide specific types
- NEVER use TypeScript type assertions (`as Type`, `<Type>value`) or casts
- Use proper type definitions and interfaces
- Use type guards and narrowing instead of assertions

## Dependencies & File Structure

Refer to `info.json` in this template directory for:

- `externalDependencies`: Required npm packages
- `craftrnUiComponents`: craftrn-ui components used
- `tetrislyIcons`: Icons from tetrisly icon set
- `fileStructure`: Complete component hierarchy and organization
