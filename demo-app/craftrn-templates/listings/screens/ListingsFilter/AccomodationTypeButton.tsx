import { Button } from '@/craftrn-ui/components/Button';
import React from 'react';

type Props = {
  children: string;
  selected: boolean;
  onPress: () => void;
};

export const AccomodationTypeButton: React.FC<Props> = ({
  children,
  selected,
  onPress,
}) => {
  return (
    <Button
      size="small"
      variant={selected ? undefined : 'secondary'}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};
