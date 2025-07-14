import { TradingOrderScreen } from '@/craftrn-templates/TradingOrder/TradingOrderScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function TradingOrder() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  return <TradingOrderScreen id={id} onPressInvest={router.back} />;
}
