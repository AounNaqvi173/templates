import { staysData } from '@/craftrn-templates/StaysDetails/data/stays';
import { StaysDetailsScreen } from '@/craftrn-templates/StaysDetails/StaysDetailsScreen';
import { ButtonRound } from '@/craftrn-ui/components/ButtonRound';
import { Upload } from '@/tetrisly-icons/Upload';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useLayoutEffect } from 'react';
import { Share } from 'react-native';
import { useStyles } from 'react-native-unistyles';

export default function StaysDetails() {
  const navigation = useNavigation();
  const { theme } = useStyles();
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleShare = useCallback(async () => {
    const listingItem = staysData.find(item => item.id === id);
    await Share.share({
      message: listingItem?.title ?? '',
    });
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ButtonRound
          renderContent={({ iconSize }) => (
            <Upload color={theme.colors.contentPrimary} size={iconSize} />
          )}
          onPress={handleShare}
          intent="secondary"
        />
      ),
    });
  }, [handleShare, navigation, theme.colors.contentPrimary]);

  return <StaysDetailsScreen id={id} />;
}
