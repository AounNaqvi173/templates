import { ButtonRound } from '@/craftrn-ui/components/ButtonRound';
import { Search } from '@/tetrisly-icons/Search';
import React from 'react';
import { useUnistyles } from 'react-native-unistyles';

type Props = {
  onPress?: () => void;
};

export const HeaderRight = ({ onPress }: Props) => {
  const { theme } = useUnistyles();

  return (
    <ButtonRound
      renderContent={({ iconSize }) => (
        <Search color={theme.colors.contentPrimary} size={iconSize} />
      )}
      onPress={onPress}
      variant="neutral-secondary"
    />
  );
};
