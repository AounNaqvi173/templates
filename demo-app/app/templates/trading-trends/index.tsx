import { TradingTrendsScreen } from '@/craftrn-templates/TradingTrends/TradingTrendsScreen';
import { AssetsItem } from '@/craftrn-templates/TradingTrends/data/assets';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

export default function TradingTrends() {
  const router = useRouter();

  const handlePressAsset = useCallback(
    (assetId: AssetsItem['id']) => () => {
      router.push(`/templates/trading-order/${assetId}`);
    },
    [router],
  );

  return <TradingTrendsScreen onPressAsset={handlePressAsset} />;
}
