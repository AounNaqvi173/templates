import { EditorialArticleScreen } from '@/craftrn-templates/EditorialArticle/EditorialArticleScreen';
import { useLocalSearchParams } from 'expo-router';

export default function DiscussionsMain() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <EditorialArticleScreen id={id} />;
}
