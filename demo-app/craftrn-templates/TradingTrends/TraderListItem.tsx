import React, { ComponentType } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Avatar } from '@/craftrn-ui/components/Avatar';
import { Button } from '@/craftrn-ui/components/Button';
import { Divider } from '@/craftrn-ui/components/Divider';
import { Text } from '@/craftrn-ui/components/Text';

type Props = {
  divider?: boolean;
  nickname: string;
  profitPercentage: string;
  avatarURL: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
};

export const TraderListItem: ComponentType<Props> = ({
  divider = true,
  nickname,
  profitPercentage,
  avatarURL,
  onPress,
  style,
}) => {
  const isPositive = profitPercentage.startsWith('+');

  return (
    <>
      <Pressable onPress={onPress} role={onPress ? 'button' : 'listitem'}>
        {({ pressed }) => (
          <View
            style={[
              styles.itemContainer,
              onPress && pressed && styles.itemContainerPressed,
              StyleSheet.flatten(style),
            ]}
          >
            <View style={styles.itemLeft}>
              <Avatar
                source={{
                  uri: avatarURL,
                }}
              />
            </View>
            <View style={styles.itemContent}>
              <Text variant="body2" style={styles.nickname}>
                {nickname}
              </Text>
              <Text variant="body3" style={styles.profitPercentage(isPositive)}>
                {profitPercentage}
              </Text>
            </View>
            <View style={styles.itemRight}>
              <Button size="small" variant="secondary" onPress={() => { }}>
                Follow
              </Button>
            </View>
          </View>
        )}
      </Pressable>
      {divider && <Divider />}
    </>
  );
};

const styles = StyleSheet.create(theme => ({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.small,
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
  },
  itemContainerPressed: {
    backgroundColor: theme.colors.interactiveNeutralPress,
  },
  itemLeft: {
    marginRight: theme.spacing.medium,
  },
  itemContent: {
    flex: 1,
    flexShrink: 1,
    minWidth: 100,
    gap: theme.spacing.xxsmall,
  },
  nickname: {
    fontWeight: '500',
    color: theme.colors.contentPrimary,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  profitPercentage: (isPositive: boolean) => ({
    color: isPositive
      ? theme.colors.sentimentPositive
      : theme.colors.sentimentNegative,
    fontWeight: '500',
  }),
}));
