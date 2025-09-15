import { Button } from '@/craftrn-ui/components/Button';
import { Text } from '@/craftrn-ui/components/Text';
import { CheckLarge } from '@/tetrisly-icons/CheckLarge';
import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
import { ButtonSelection } from './ButtonSelection';
import { PaymentSuccessBottomSheet } from './PaymentSuccessBottomSheet';

const BulletPoint = ({ children }: { children: string }) => {
  const { theme } = useUnistyles();
  return (
    <View style={styles.bulletPoint}>
      <CheckLarge color={theme.colors.contentAccent} />
      <Text variant="body1" style={styles.bulletPointText}>
        {children}
      </Text>
    </View>
  );
};

export const PaywallSubscriptionScreen = () => {
  
  const [planSelected, setPlanSelected] = useState(2);
  const [isSubscriptionSuccess, setIsSubscriptionSuccess] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.headingSection}>
            <Text variant="heading1" style={styles.headingTitle}>
              Unlock the{'\n'}full experience
            </Text>
            <View style={styles.bulletPointsContainer}>
              <BulletPoint>
                Unlimited access to all the features and tools
              </BulletPoint>
              <BulletPoint>Boost creativity with 30+ AI tools</BulletPoint>
              <BulletPoint>1TB of cloud storage for your projects</BulletPoint>
              <BulletPoint>Priority online customer support</BulletPoint>
            </View>
          </View>
          <View style={styles.plansContainer}>
            <ButtonSelection
              onPress={() => setPlanSelected(0)}
              isSelected={planSelected === 0}
              leftElement={<Text variant="heading3">1 month</Text>}
              rightElement={
                <View style={styles.priceContainer}>
                  <Text variant="heading3">$9.99</Text>
                  <Text variant="body3" color="contentTertiary">
                    per month
                  </Text>
                </View>
              }
            />
            <ButtonSelection
              onPress={() => setPlanSelected(1)}
              isSelected={planSelected === 1}
              leftElement={
                <>
                  <Text variant="heading3">6 months</Text>
                  <Text variant="body2" color="contentTertiary">
                    Save 25%
                  </Text>
                </>
              }
              rightElement={
                <View style={styles.priceContainer}>
                  <Text variant="heading3">$7.49</Text>
                  <Text variant="body3" color="contentTertiary">
                    per month
                  </Text>
                </View>
              }
            />
            <ButtonSelection
              onPress={() => setPlanSelected(2)}
              isSelected={planSelected === 2}
              isPopular
              leftElement={
                <>
                  <Text variant="heading3">1 year</Text>
                  <Text variant="body2" color="contentTertiary">
                    Save 50%
                  </Text>
                </>
              }
              rightElement={
                <View style={styles.priceContainer}>
                  <Text variant="heading3">$59.95</Text>
                  <Text variant="body3" color="contentTertiary">
                    per year
                  </Text>
                </View>
              }
            />
          </View>
          <View style={styles.footerContainer}>
            <Button onPress={() => setIsSubscriptionSuccess(true)}>
              Try for free and subscribe
            </Button>
            <Text
              variant="body3"
              color="contentSecondary"
              style={styles.termsText}
            >
              7 days trial, cancel anytime.{' '}
              <Text
                variant="body3"
                color="contentAccent"
                style={styles.termsLink}
                onPress={() => {}}
              >
                Terms and conditions apply.
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <PaymentSuccessBottomSheet
        visible={isSubscriptionSuccess}
        onRequestClose={() => setIsSubscriptionSuccess(false)}
        onPressContinue={() => setIsSubscriptionSuccess(false)}
      />
    </>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
    paddingTop: UnistylesRuntime.insets.top,
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
  contentContainer: {
    padding: theme.spacing.large,
    flex: 1,
    gap: theme.spacing.large,
  },
  headingSection: {
    flex: 1,
    marginTop: theme.spacing.xlarge,
    gap: theme.spacing.xlarge,
  },
  headingTitle: {
    textAlign: 'center',
  },
  bulletPointsContainer: {
    gap: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
  },
  bulletPoint: {
    flexDirection: 'row',
    gap: theme.spacing.small,
  },
  bulletPointText: {
    flexShrink: 1,
    color: theme.colors.contentSecondary,
  },
  plansContainer: {
    gap: theme.spacing.medium,
    marginBottom: theme.spacing.large,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  footerContainer: {
    gap: theme.spacing.medium,
  },
  termsText: {
    textAlign: 'center',
  },
  termsLink: {
    textDecorationLine: 'underline',
  },
}));
