# AGENTS.md

## Template Purpose

Currency and asset conversion interface for financial transactions. Supports bidirectional amount calculation for both currency exchange and stock trading. Use for trading apps, currency exchange platforms, or financial conversion interfaces.

**IMPORTANT:** Always reference `info.json` for exact dependencies and component structure.

## Template-Specific Rules

**Conversion Interface:**

- Bidirectional amount calculation - users can input either "pay" or "receive" amount
- Real-time fee calculation and display (3.52% fee applied)
- Automatic detection of currency vs stock trading based on asset type
- Support for both currency exchange rates and stock prices
- Available balance display for the source currency

**Number Formatting:**

- Format numbers with commas for thousands (e.g., "1,234.56")
- Limit decimal places to 2 digits
- Handle input validation and cleaning
- Parse formatted numbers back to raw values for calculations

**Keyboard Handling:**

- Keyboard-aware scrolling with `KeyboardAwareScrollView`
- Sticky button at bottom using `KeyboardStickyView`
- Auto-focus on first input field
- Numeric keyboard type for amount inputs

This Trading Order template provides a sophisticated conversion interface with real-time bidirectional calculations, fee transparency, and keyboard-aware layouts. It follows the **colocation** principle with trading-focused modular components.

### Core Components Structure

```
TradingOrder/
├── TradingOrderScreen.tsx        # Main conversion interface
├── AmountRow.tsx                 # Amount input/display row component
├── data/
│   └── assets.tsx                # Asset data and types
└── utils/
    └── numbers.ts                # Number formatting utilities
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:

- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `Button`, `Card`, `Divider`, `ListItem`, `Text`, `Avatar` for conversion interface
- `Text` components with financial formatting support
- Advanced keyboard handling with `react-native-keyboard-controller`
- Platform-specific input styling (iOS vs Android)

## Data Structure & API Integration

### Asset Data Model

```typescript
export type AssetsItem = {
  id: string;
  from: {
    ticker: string;      // Currency/stock ticker (e.g., "USD", "BTC", "AAPL")
    symbol: string;      // Display symbol (e.g., "$", "€", "BTC")
    imageURL: string;    // Avatar image URL
  };
  to: {
    ticker: string;
    symbol: string;
    imageURL: string;
  };
  rate: string;          // Exchange rate or stock price
  change: string;        // Percentage change (e.g., "+2.15%", "-0.25%")
};
```

### Conversion Logic

The template automatically detects asset type:

- **Stocks**: When `from.ticker === 'USD'` and `to.ticker` is a known stock ticker
  - Calculation: `receive = (pay * (1 - fee)) / unitPrice`
  - Unit price represents price per share
- **Currencies**: All other asset pairs
  - Calculation: `receive = (pay * (1 - fee)) * exchangeRate`
  - Exchange rate represents how many "to" units per "from" unit

### Fee Structure

- **Fee Percentage**: 3.52% (0.0352)
- **Fee Calculation**: Applied to the "pay" amount before conversion
- **Amount Converted**: `pay * (1 - feePercentage)`
- **Estimated Fee**: `pay * feePercentage`

### API Integration Pattern

For real-time rate updates:

```typescript
// api/useAssetRate.ts
export const useAssetRate = (assetId: string) => {
  return useQuery({
    queryKey: ['asset', 'rate', assetId],
    queryFn: () =>
      fetch(`/api/assets/${assetId}/rate`).then(r => r.json()),
    refetchInterval: 5000, // Update every 5 seconds
  });
};

// Usage in component
const { data: assetRate } = useAssetRate(id);
const unitPrice = assetRate?.rate ?? parseFloat(asset.rate);
```

For balance checking:

```typescript
// api/useAccountBalance.ts
export const useAccountBalance = (currency: string) => {
  return useQuery({
    queryKey: ['account', 'balance', currency],
    queryFn: () =>
      fetch(`/api/account/balance?currency=${currency}`).then(r => r.json()),
  });
};
```

## Template Customization Patterns

### Bidirectional Calculation Pattern

The core pattern for real-time bidirectional conversion:

```typescript
const [payValueRaw, setPayValueRaw] = useState('');
const [receiveValueRaw, setReceiveValueRaw] = useState('');

const calculateReceiveFromPay = (payValue: number): number => {
  if (!asset || payValue <= 0 || unitPrice === 0) return 0;
  const converted = payValue * (1 - FEE_PERCENTAGE);
  return isStock ? converted / unitPrice : converted * unitPrice;
};

const calculatePayFromReceive = (receiveValue: number): number => {
  if (!asset || receiveValue <= 0 || unitPrice === 0) return 0;
  const converted = isStock
    ? receiveValue * unitPrice
    : receiveValue / unitPrice;
  return converted / (1 - FEE_PERCENTAGE);
};

const handlePayChange = (text: string) => {
  const cleaned = parseInputText(text);
  setPayValueRaw(cleaned);

  if (!cleaned) {
    setReceiveValueRaw('');
    return;
  }

  const value = parseFloat(cleaned) || 0;
  const received = calculateReceiveFromPay(value);
  setReceiveValueRaw(roundToTwoDecimals(received));
};
```

### Number Formatting Pattern

Proper handling of formatted numbers with commas:

```typescript
// Display: Format raw value with commas
const displayValue = formatNumberForDisplay(rawValue);
// "1234.56" -> "1,234.56"

// Input: Parse formatted value back to raw
const rawValue = parseFormattedNumber(formattedValue);
// "1,234.56" -> "1234.56"

// Clean: Validate and limit decimals
const cleaned = cleanRawInput(rawValue);
// "1234.567" -> "1234.56"
```

### Asset Type Detection Pattern

Automatic detection of stock vs currency:

```typescript
const isStock = useMemo(() => {
  if (!asset) return false;

  const stockTickers = [
    'AAPL', 'MSFT', 'AMZN', 'TSLA', 'META', 'GOOGL', 'FB',
    'BTC', 'ETH', 'USDT', 'BNB', 'XRP', 'DOGE', 'LTC', 'XLM',
  ];

  return (
    asset.from.ticker === 'USD' &&
    stockTickers.includes(asset.to.ticker)
  );
}, [asset]);
```

### Transaction Recap Pattern

Display conversion details:

```typescript
<Card style={styles.transactionRecap}>
  <ListItem
    text="Unit price"
    itemRight={
      <Text variant="body2">
        {isStock
          ? `1 ${asset.to.ticker} ≈ ${formatCurrency(unitPrice, 4)} ${asset.from.ticker}`
          : `1 ${asset.from.ticker} ≈ ${formatCurrency(unitPrice, 4)} ${asset.to.ticker}`}
      </Text>
    }
    divider
  />
  <ListItem
    text="Amount converted"
    itemRight={
      <Text variant="body2">
        {formatCurrency(payValue * (1 - FEE_PERCENTAGE))} {asset.from.ticker}
      </Text>
    }
    divider
  />
  <ListItem
    text="Estimated fee"
    itemRight={
      <Text variant="body2">
        {formatCurrency(payValue * FEE_PERCENTAGE)} {asset.from.ticker}
      </Text>
    }
    divider
  />
  <ListItem
    text="Provider"
    itemRight={<Text variant="body2">{PROVIDER}</Text>}
  />
</Card>
```

## Template Extension & Reuse Patterns

### Conversion Interface Variations

This template can be adapted for different conversion types:

1. **Currency Exchange**: Foreign exchange with real-time rates
2. **Cryptocurrency Trading**: Digital asset conversion with market rates
3. **Stock Trading**: Equity purchase/sale with share price calculation
4. **Commodity Trading**: Precious metals, oil, etc. with weight/volume conversion
5. **Loyalty Points**: Points to currency conversion

### Adding New Asset Types

To support new asset types:

```typescript
const isStock = useMemo(() => {
  // Add detection logic for new asset types
  return (
    asset.from.ticker === 'USD' &&
    (STOCK_TICKERS.includes(asset.to.ticker) ||
     CRYPTO_TICKERS.includes(asset.to.ticker))
  );
}, [asset]);

// Custom calculation logic
const calculateReceiveFromPay = (payValue: number): number => {
  if (isStock) {
    return (payValue * (1 - FEE_PERCENTAGE)) / unitPrice;
  } else if (isCrypto) {
    // Custom crypto calculation
    return (payValue * (1 - FEE_PERCENTAGE)) * unitPrice;
  } else {
    // Currency exchange
    return (payValue * (1 - FEE_PERCENTAGE)) * unitPrice;
  }
};
```

### Enhanced Features

Potential enhancements:

- **Rate Alerts**: Notify when rates reach target values
- **Conversion History**: Save and display past conversions
- **Multiple Providers**: Compare rates across different providers
- **Scheduled Conversions**: Set up recurring conversions
- **Balance Validation**: Prevent conversion if insufficient balance
- **Rate Charts**: Display historical rate trends
- **Favorite Pairs**: Quick access to frequently used conversions

### Customization Guidelines

- Follow existing bidirectional calculation patterns for real-time updates
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui components for consistent financial data display
- Maintain KeyboardStickyView patterns for optimal mobile experience
- Preserve fee transparency and breakdown patterns
- Keep number formatting utilities for proper input/output handling
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
