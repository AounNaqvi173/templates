import { HeaderRight } from '@/craftrn-templates/TradingDashboard/HeaderRight';
import { HeaderTitle } from '@/craftrn-templates/TradingDashboard/HeaderTitle';
import { AssetsItem } from '@/craftrn-templates/TradingDashboard/data/assets';
import { TradingDashboardScreen } from '@/craftrn-templates/TradingDashboard/TradingDashboardScreen';
import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';

export default function TradingDashboard() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderTitle />,
      headerRight: () => (
        <HeaderRight onPress={() => console.log('Search pressed')} />
      ),
    });
  }, [navigation]);

  const handlePressAsset = useCallback(
    (assetId: AssetsItem['id']) => () => {
      router.push(`/templates/trading-order/${assetId}`);
    },
    [router],
  );

  return <TradingDashboardScreen onPressAsset={handlePressAsset} />;
}
