import { Heart } from '@/tetrisly-icons/Heart';
import { HeartFilled } from '@/tetrisly-icons/HeartFilled';
import React, { ComponentType, useState } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const colorWithOpacity = (color: string, opacity: number) => {
  const hex = color.replace('#', '');
  return `#${hex}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')}`;
};

type HeartButtonProps = {
  onPress?: (liked: boolean) => void;
  liked?: boolean;
};

export const HeartButton: ComponentType<HeartButtonProps> = ({
  onPress,
  liked,
}) => {
  const [likeValue, setLikeValue] = useState(liked);
  const { theme } = useUnistyles();

  const handlePressLike = () => {
    const newLikeValue = !likeValue;
    setLikeValue(newLikeValue);
    onPress?.(newLikeValue);
  };

  return (
    <Pressable hitSlop={4} onPress={handlePressLike}>
      <View style={styles.container}>
        <HeartFilled
          color={
            likeValue
              ? theme.colors.negativePrimary
              : colorWithOpacity(theme.colors.black, 0.3)
          }
        />
      </View>
      <View style={styles.container}>
        <Heart color={theme.colors.white} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create(() => ({
  container: {
    position: 'absolute',
  },
}));
