import { Button } from '@/craftrn-ui/components/Button';
import { Card } from '@/craftrn-ui/components/Card';
import { Divider } from '@/craftrn-ui/components/Divider';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { Text } from '@/craftrn-ui/components/Text';
import React, { ComponentType, useMemo, useState } from 'react';
import { View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';
import { AmountRow } from './AmountRow';
import { assets } from './data/assets';
import {
  cleanRawInput,
  formatCurrency,
  formatNumberForDisplay,
  parseFormattedNumber,
} from './utils/numbers';

const PROVIDER = 'Market Exchange';
const AVAILABLE_BALANCE = 15395.32;
const FEE_PERCENTAGE = 0.0352; // 3.52%

type Props = {
  id: string;
  onPressInvest: VoidFunction;
};

export const TradingOrderScreen: ComponentType<Props> = ({
  id,
  onPressInvest,
}) => {
  const { theme } = useUnistyles();
  const [investValueRaw, setInvestValueRaw] = useState('');
  const [receiveValueRaw, setReceiveValueRaw] = useState('');

  const asset = useMemo(() => {
    if (!id) {
      return null;
    }
    return assets.find(a => a.id === id);
  }, [id]);

  const unitPrice = useMemo(() => {
    if (!asset) {
      return 0;
    }
    return parseFloat(asset.rate) || 0;
  }, [asset]);

  const isStock = useMemo(() => {
    if (!asset) {
      return false;
    }
    // Stocks have USD as 'from' and stock ticker as 'to'
    // Known stock tickers
    const stockTickers = [
      'AAPL',
      'MSFT',
      'AMZN',
      'TSLA',
      'META',
      'GOOGL',
      'FB',
      'BTC',
      'ETH',
      'USDT',
      'BNB',
      'XRP',
      'DOGE',
      'LTC',
      'XLM',
    ];
    return (
      asset.from.ticker === 'USD' && stockTickers.includes(asset.to.ticker)
    );
  }, [asset]);

  const calculateReceiveFromPay = (payValue: number): number => {
    if (!asset || payValue <= 0 || unitPrice === 0) {
      return 0;
    }
    const converted = payValue * (1 - FEE_PERCENTAGE);
    // For stocks: divide by unit price (price per share)
    // For currencies: multiply by exchange rate
    return isStock ? converted / unitPrice : converted * unitPrice;
  };

  const calculatePayFromReceive = (receiveValue: number): number => {
    if (!asset || receiveValue <= 0 || unitPrice === 0) {
      return 0;
    }
    // For stocks: multiply by unit price to get cost, then add fee
    // For currencies: divide by exchange rate to get base amount, then add fee
    const converted = isStock
      ? receiveValue * unitPrice
      : receiveValue / unitPrice;
    return converted / (1 - FEE_PERCENTAGE);
  };

  const parseInputText = (text: string): string => {
    const rawInput = parseFormattedNumber(text);
    return cleanRawInput(rawInput);
  };

  const roundToTwoDecimals = (value: number): string => {
    return value > 0 ? value.toFixed(2) : '';
  };

  const handlePayChange = (text: string) => {
    const cleaned = parseInputText(text);
    setInvestValueRaw(cleaned);

    if (!cleaned) {
      setReceiveValueRaw('');
      return;
    }

    const value = parseFloat(cleaned) || 0;
    const received = calculateReceiveFromPay(value);
    setReceiveValueRaw(roundToTwoDecimals(received));
  };

  const handleReceiveChange = (text: string) => {
    const cleaned = parseInputText(text);
    setReceiveValueRaw(cleaned);

    if (!cleaned) {
      setInvestValueRaw('');
      return;
    }

    const value = parseFloat(cleaned) || 0;
    const payValue = calculatePayFromReceive(value);
    setInvestValueRaw(roundToTwoDecimals(payValue));
  };

  const investValueDisplay = formatNumberForDisplay(investValueRaw);
  const receiveValueDisplay = formatNumberForDisplay(receiveValueRaw);

  const investValue = useMemo(
    () => (investValueRaw ? parseFloat(investValueRaw) : 0),
    [investValueRaw],
  );

  if (!asset) {
    return null;
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        bottomOffset={UnistylesRuntime.insets.bottom}
        keyboardShouldPersistTaps="never"
      >
        <View style={styles.upperContent}>
          <View>
            <AmountRow
              label="You pay"
              value={investValueDisplay}
              onChangeText={handlePayChange}
              isInput
              autoFocus
              avatarSource={{ uri: asset.from.imageURL }}
              avatarFallbackInitials={asset.from.symbol}
              currencyCode={asset.from.ticker}
            />
            <Text
              variant="body2"
              style={styles.availableText}
              color="contentTertiary"
            >
              Available: {formatCurrency(AVAILABLE_BALANCE)} {asset.from.ticker}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <AmountRow
            label="You receive"
            value={receiveValueDisplay}
            onChangeText={handleReceiveChange}
            isInput
            avatarSource={{ uri: asset.to.imageURL }}
            avatarFallbackInitials={asset.to.symbol}
            currencyCode={asset.to.ticker}
          />

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
              style={styles.listItem}
              divider
            />
            <ListItem
              text="Amount converted"
              itemRight={
                <Text variant="body2">
                  {formatCurrency(investValue * (1 - FEE_PERCENTAGE))}{' '}
                  {asset.from.ticker}
                </Text>
              }
              style={styles.listItem}
              divider
            />
            <ListItem
              text="Estimated fee"
              itemRight={
                <Text variant="body2">
                  {formatCurrency(investValue * FEE_PERCENTAGE)}{' '}
                  {asset.from.ticker}
                </Text>
              }
              style={styles.listItem}
              divider
            />
            <ListItem
              text="Provider"
              itemRight={<Text variant="body2">{PROVIDER}</Text>}
              style={styles.listItem}
            />
          </Card>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardStickyView
        offset={{
          opened: -theme.spacing.large,
          closed: -UnistylesRuntime.insets.bottom,
        }}
      >
        <View style={styles.buttonContainer}>
          <Button onPress={onPressInvest}>Convert</Button>
        </View>
      </KeyboardStickyView>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: theme.spacing.small,
    paddingHorizontal: theme.spacing.large,
    paddingTop: theme.spacing.large,
    paddingBottom: theme.spacing.large,
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.large,
  },
  upperContent: {
    gap: theme.spacing.large,
  },
  divider: {
    marginVertical: theme.spacing.small,
  },
  listItem: {
    padding: theme.spacing.small,
  },
  transactionRecap: {
    backgroundColor: theme.colors.backgroundNeutral,
    marginTop: theme.spacing.medium,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.xsmall,
  },
  availableText: {
    marginTop: theme.spacing.xsmall,
  },
}));
