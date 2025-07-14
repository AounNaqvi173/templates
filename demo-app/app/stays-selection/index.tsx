import { StaysSelectionScreen } from '@/craftrn-templates/StaysSelectionScreen/StaysSelectionScreen';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

export default function Stays() {
  const router = useRouter();

  const handlePressListing = useCallback(
    (id: string) => () => {
      router.push(`/stays-details/${id}`);
    },
    [router],
  );

  const handlePressSearch = useCallback(() => {
    router.push('/stays-search');
  }, [router]);

  const handlePressFilter = useCallback(() => {
    router.push('/stays-filters');
  }, [router]);

  return (
    <StaysSelectionScreen
      onPressListing={handlePressListing}
      onPressSearch={handlePressSearch}
      onPressFilter={handlePressFilter}
    />
  );
}
