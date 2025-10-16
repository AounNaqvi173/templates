import { TradingDashboardScreen } from '@/craftrn-templates/TradingDashboard/TradingDashboardScreen';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { AssetsItem } from '../../../craftrn-templates/TradingDashboard/data/assets';

export default function TradingDashboard() {
  const router = useRouter();

  const handlePressAsset = useCallback(
    (assetId: AssetsItem['id']) => () => {
      router.push(`/templates/trading-order/${assetId}`);
    },
    [router],
  );

  return <TradingDashboardScreen onPressAsset={handlePressAsset} />;
}
