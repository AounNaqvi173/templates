# AGENTS.md

## Template Purpose

Comprehensive order management interface for financial trading with order placement, validation, and execution. Use for trading apps, investment platforms, or financial transaction interfaces.

**IMPORTANT:** Always reference `info.json` for exact dependencies and component structure.

## Template-Specific Rules

**Order Entry Validation:**

- Validate order quantity and price ranges in real-time
- Implement proper number formatting for financial values
- Check account balance and available funds before order placement
- Show calculated order totals including fees

**Order Types and Controls:**

- Support different order types (market, limit, stop)
- Implement proper UI controls for each order type
- Show relevant fields based on selected order type
- Handle order modification and cancellation flows

**Financial Data Display:**

- Use consistent number formatting for prices and quantities
- Show real-time price updates during order entry
- Implement proper color coding for buy/sell actions
- Display order confirmation with all details before execution

This Trading Order template provides a sophisticated financial transaction interface with advanced order entry functionality, real-time cost calculations, and keyboard-aware layouts. It follows the **colocation** principle with trading-focused modular components.

### Core Components Structure

```
TradingOrder/
├── TradingOrderScreen.tsx        # Main order entry interface
├── AssetListItem.tsx             # Asset display component
├── ExchangeRate.tsx              # Exchange rate display component
├── data/
│   └── assets.tsx                # Asset data and types
└── utils/
    └── numbers.ts                # Number formatting utilities
```

### Design System Usage

Built with **craftrn-ui** components and **Unistyles** theming:

- Reference the unified theme system at `@demo-app/craftrn-ui/themes/` for all styling decisions
- `Button`, `ButtonRound`, `InputText`, `ListItem` for order interface
- `Text` components with financial formatting support
- Advanced keyboard handling with `react-native-keyboard-controller`
- Financial color schemes for order types and calculations

## Data Structure & API Integration

### Mock Data Model

```typescript
interface TradingOrder {
  id?: string;
  assetId: string;
  orderType: 'buy' | 'sell';
  quantity: number;
  orderPrice?: number;
  orderStyle: 'market' | 'limit' | 'stop';
  fees: {
    commission: number;
    platformFee: number;
    regulatory: number;
  };
  estimatedTotal: number;
  status: 'pending' | 'filled' | 'cancelled';
}

interface OrderValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  availableBalance: number;
}
```

### API Integration with React Query

Recommended pattern for order management:

```typescript
// api/useOrderValidation.ts
export const useOrderValidation = (orderData: Partial<TradingOrder>) => {
  return useQuery({
    queryKey: ['order', 'validation', orderData],
    queryFn: () =>
      fetch('/api/orders/validate', {
        method: 'POST',
        body: JSON.stringify(orderData),
      }).then(r => r.json()),
    enabled: !!orderData.assetId && !!orderData.quantity,
    staleTime: 10000, // 10 seconds
  });
};

// api/useSubmitOrder.ts
export const useSubmitOrder = () => {
  return useMutation({
    mutationFn: (orderData: TradingOrder) =>
      fetch('/api/orders/submit', {
        method: 'POST',
        body: JSON.stringify(orderData),
      }),
    onSuccess: data => {
      queryClient.invalidateQueries(['portfolio']);
      showNotification('Order submitted successfully', 'success');
    },
    onError: error => {
      showNotification(`Order failed: ${error.message}`, 'error');
    },
  });
};
```

## Template Customization Patterns

### Order Entry Form Pattern

Real-time order building with validation:

```typescript
const OrderEntryForm = ({ asset, onSubmit }) => {
  const [orderType, setOrderType] = useState('buy');
  const [quantity, setQuantity] = useState('');
  const [orderStyle, setOrderStyle] = useState('market');

  const { data: validation } = useOrderValidation({
    assetId: asset.id,
    orderType,
    quantity: parseFloat(quantity),
  });

  const totalCost = useMemo(() => {
    const cost = parseFloat(quantity) * parseFloat(asset.sellPrice) + FEES;
    return formatCurrency(cost);
  }, [quantity, asset]);

  return (
    <KeyboardStickyView>
      <OrderTypeSelector value={orderType} onChange={setOrderType} />
      <QuantityInput value={quantity} onChange={setQuantity} />
      <OrderSummary totalCost={totalCost} fees={FEES} />
      <Button onPress={onSubmit} disabled={!validation?.isValid}>
        Place Order
      </Button>
    </KeyboardStickyView>
  );
};
```

### Fee Breakdown Pattern

Transparent fee calculation and display:

```typescript
const FeeBreakdown = ({ orderValue }) => {
  const fees = useMemo(() => {
    const commission = orderValue * 0.001; // 0.1%
    const platformFee = 1.15;
    const regulatory = orderValue * 0.0001; // 0.01%

    return {
      commission,
      platformFee,
      regulatory,
      total: commission + platformFee + regulatory,
    };
  }, [orderValue]);

  return (
    <View style={styles.feeContainer}>
      <Text variant="heading4">Fee Breakdown</Text>
      <FeeRow label="Commission" value={fees.commission} />
      <FeeRow label="Platform Fee" value={fees.platformFee} />
      <FeeRow label="Regulatory Fee" value={fees.regulatory} />
      <FeeRow label="Total Fees" value={fees.total} />
    </View>
  );
};
```

## Template Extension & Reuse Patterns

### Financial Transaction Variations

This template can be adapted for different financial transaction types:

1. **Stock Trading**: Equity orders with market and limit options
2. **Cryptocurrency Trading**: Digital asset orders with real-time pricing
3. **Forex Trading**: Currency pair orders with leverage options
4. **Investment Management**: Portfolio rebalancing and allocation orders
5. **Options Trading**: Complex derivatives with strike prices and expiration

### Transaction Flow Adaptations

Different order types require specific implementations:

```typescript
// Cryptocurrency trading adaptation
type CryptoOrder = {
  pair: string;
  side: 'buy' | 'sell';
  amount: number;
  orderType: 'market' | 'limit' | 'stop-limit';
  price?: number;
  stopPrice?: number;
};

// Options trading adaptation
type OptionsOrder = {
  underlying: string;
  strike: number;
  expiration: string;
  optionType: 'call' | 'put';
  contracts: number;
  premium: number;
};
```

### Adding New Features

- **Advanced Order Types**: Stop-loss, bracket orders, and trailing stops
- **Portfolio Impact**: Position sizing and diversification analysis
- **Social Trading**: Copy trading and signal integration
- **Risk Management**: Real-time risk assessment and warnings
- **Order Book**: Live market depth and bid/ask spreads

### Customization Guidelines

- Follow existing real-time calculation patterns for order totals
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Use craftrn-ui components for consistent financial data display
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Maintain KeyboardStickyView patterns for optimal mobile experience
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Preserve fee transparency and breakdown patterns
- Ensure to continue using same file structure with feature based architecture. Meaning colocation of files that are related to be together. Meaning no folders such as `hooks` or `components` unless they are shared across different areas rather than single used
- Keep validation patterns for order safety and compliance
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
