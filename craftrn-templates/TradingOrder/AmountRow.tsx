import { Avatar } from '@/craftrn-ui/components/Avatar';
import { Card } from '@/craftrn-ui/components/Card';
import { Text } from '@/craftrn-ui/components/Text';
import React, { ComponentType } from 'react';
import { ImageSourcePropType, Platform, TextInput, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

type Props = {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  isInput?: boolean;
  avatarSource?: ImageSourcePropType;
  avatarFallbackInitials: string;
  currencyCode: string;
  autoFocus?: boolean;
};

export const AmountRow: ComponentType<Props> = ({
  label,
  value,
  onChangeText,
  isInput = false,
  avatarSource,
  avatarFallbackInitials,
  currencyCode,
  autoFocus = false,
}) => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.amountRow}>
      <View style={styles.amountRowContent}>
        <Text variant="body2" color="contentTertiary" style={styles.label}>
          {label}
        </Text>
        {isInput ? (
          <View style={styles.inputContainer}>
            <TextInput
              value={value}
              onChangeText={onChangeText}
              autoFocus={autoFocus}
              style={styles.input}
              selectionColor={theme.colors.contentAccentSecondary}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor={theme.colors.contentTertiary}
            />
          </View>
        ) : (
          <View style={styles.amountContainer}>
            <Text variant="heading1" style={styles.amount}>
              {value}
            </Text>
          </View>
        )}
      </View>
      <Card style={styles.avatarContainer}>
        <Avatar
          source={avatarSource}
          size="medium"
          fallbackInitials={avatarFallbackInitials}
        />
        <Text variant="body2" style={styles.symbol}>
          {currencyCode}
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.medium,
  },
  amountRowContent: {
    flex: 1,
    gap: theme.spacing.medium,
  },
  label: {
    marginBottom: theme.spacing.xxsmall,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xsmall,
  },
  input: {
    flex: 1,
    ...theme.textVariants.heading1,
    fontWeight: 'bold',
    color: theme.colors.contentPrimary,
    minWidth: 100,
    lineHeight: Platform.OS === 'ios' ? 0 : undefined,
    marginLeft: Platform.OS === 'ios' ? 0 : -theme.spacing.xsmall,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontWeight: 'bold',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
    backgroundColor: theme.colors.backgroundNeutral,
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.xsmall,
    borderRadius: theme.borderRadius.full,
  },
  symbol: {
    fontWeight: 'bold',
  },
}));
