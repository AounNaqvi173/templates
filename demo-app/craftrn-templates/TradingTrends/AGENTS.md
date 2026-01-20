# AGENTS.md

## Trading Trends Template

A market trends screen template featuring search functionality, filterable categories, top gainers/losers lists, and market sentiment visualization.

## Components

- **TradingTrendsScreen**: Main screen component with search, filters, and sections
- **MarketSentiment**: Horizontal bar visualization showing buying vs selling pressure
- **AssetListItem**: List item component for displaying assets
- **ExchangeRate**: Component for displaying exchange rates with trend indicators
- **SectionHeader**: Header component for sections with "See more" action

## Data Structure

- **stocks.tsx**: Contains stock data for top gainers and losers

## Dependencies

- Uses craftrn-ui components: `Button`, `Card`, `InputSearch`, `ListItem`, `Text`, `Avatar`
- Uses tetrisly-icons: `Search`, `TrendUp`, `TrendDown`

## Styling

- Follows the same styling patterns as TradingDashboard template
- Uses theme colors from ThemeContext
- Responsive spacing and layout matching TradingDashboard
