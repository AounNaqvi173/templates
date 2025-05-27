import { Button } from '@/craftrn-ui/components/Button';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { Text } from '@/craftrn-ui/components/Text';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { ComponentType, useMemo, useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { AnimatedKeyboardView } from '../../components/AnimatedKeyboardView';
import { AssetListItem } from '../../components/AssetListItem';
import { ExchangeRate } from '../../components/ExchangeRate';
import { assets } from '../../data/assets';
import { formatCurrency } from '../../utils/numbers';

const INVEST_FEES = 1.15;

export const TradingInvestScreen: ComponentType = () => {
  const { styles, theme } = useStyles(stylesheet);
  const [investValue, setInvestValue] = useState('');
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const asset = useMemo(() => {
    if (!id) {
      return null;
    }
    return assets.find(a => a.id === id);
  }, [id]);

  const totalCost = useMemo(
    () =>
      formatCurrency(
        parseFloat(investValue) * parseFloat(asset?.sellPrice ?? '') +
          INVEST_FEES,
      ),
    [investValue, asset],
  );

  if (!asset) {
    return null;
  }

  return (
    <AnimatedKeyboardView
      style={[
        styles.container,
        { paddingBottom: UnistylesRuntime.insets.bottom },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.upperContent}>
          <Text variant="heading3">How much would you like to buy?</Text>
          <View style={styles.inputContainer}>
            <Text variant="heading3" style={styles.symbolText}>
              {asset.fromSymbol}
            </Text>
            <TextInput
              value={investValue}
              onChangeText={text => setInvestValue(text)}
              autoFocus
              style={styles.input}
              selectionColor={theme.colors.accentPrimary}
              keyboardType="numeric"
            />
          </View>
          <Text variant="body3" style={styles.fees}>
            ${INVEST_FEES} investment fees
          </Text>
        </View>
        <View style={styles.bottomContent}>
          <AssetListItem
            text={asset.name}
            textBelow={asset.pairing}
            imageURL={asset.imageURL}
            itemRight={
              <ExchangeRate
                value={asset.sellPrice}
                symbol={asset.toSymbol}
                change={asset.change}
              />
            }
            divider
          />
          <ListItem
            text="Total purchase cost"
            textBelow="Including fees"
            itemRight={
              <Text variant="body1" style={styles.totalCost}>
                {`${asset.toSymbol}${totalCost}`}
              </Text>
            }
            style={styles.totalCostItem}
          />
        </View>
        <Button onPress={router.back}>Invest</Button>
      </View>
    </AnimatedKeyboardView>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
  },
  content: {
    gap: theme.spacing.small,
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.large,
    flex: 1,
  },
  upperContent: {
    flexGrow: 1,
    gap: theme.spacing.medium,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.xsmall,
  },
  symbolText: {
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    alignSelf: 'center',
    ...theme.textVariants.heading1,
    lineHeight: Platform.OS === 'ios' ? 0 : 25,
    fontWeight: 'bold',
    color: theme.colors.contentPrimary,
  },
  fees: {
    textAlign: 'center',
  },
  bottomContent: {
    marginBottom: theme.spacing.large,
  },
  totalCostItem: {
    paddingVertical: theme.spacing.small,
  },
  totalCost: {
    fontWeight: 'bold',
  },
}));
