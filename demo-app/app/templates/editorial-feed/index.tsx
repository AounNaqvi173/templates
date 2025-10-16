import { EditorialFeedScreen } from '@/craftrn-templates/EditorialFeed/EditorialFeedScreen';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

export default function DiscussionsMain() {
  const router = useRouter();

  const handlePressArticle = useCallback(
    (id: string) => () => {
      router.push(`/templates/editorial-article/${id}`);
    },
    [router],
  );

  return <EditorialFeedScreen onPressArticle={handlePressArticle} />;
}
