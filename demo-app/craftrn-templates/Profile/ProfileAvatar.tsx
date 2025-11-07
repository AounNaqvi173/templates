import { ButtonRound } from '@/craftrn-ui/components/ButtonRound';
import { Text } from '@/craftrn-ui/components/Text';
import { UserEdit } from '@/tetrisly-icons/UserEdit';
import React, { ComponentType } from 'react';
import { Image, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { profileData } from './data/profileData';

const config = {
  avatarSize: 120,
};

export const ProfileAvatar: ComponentType = () => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.avatarSection}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarImageContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            }}
            style={styles.avatarImage}
            accessibilityLabel="Profile picture"
          />
        </View>
        <View style={styles.editIconContainer}>
          <ButtonRound
            onPress={() => {}}
            size="medium"
            variant="neutral-secondary"
            accessibilityLabel="Edit profile picture"
            renderContent={({ iconSize }) => (
              <UserEdit color={theme.colors.contentPrimary} size={iconSize} />
            )}
          />
        </View>
      </View>
      <Text style={styles.userName}>{profileData.name}</Text>
      <Text style={styles.userEmail}>{profileData.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  avatarSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.large,
    paddingHorizontal: theme.spacing.large,
  },
  avatarContainer: {
    position: 'relative',
    width: config.avatarSize,
    height: config.avatarSize,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.large,
  },
  avatarImageContainer: {
    width: config.avatarSize,
    height: config.avatarSize,
    borderRadius: theme.borderRadius.full,
    shadowColor: theme.colors.contentPrimary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  avatarImage: {
    width: config.avatarSize,
    height: config.avatarSize,
    borderRadius: theme.borderRadius.full,
    borderWidth: 4,
    borderColor: theme.colors.white,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    borderRadius: theme.borderRadius.full,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.contentPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  userName: {
    ...theme.textVariants.heading2,
    color: theme.colors.contentPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.xsmall,
  },
  userEmail: {
    ...theme.textVariants.body1,
    color: theme.colors.contentSecondary,
    textAlign: 'center',
  },
}));
