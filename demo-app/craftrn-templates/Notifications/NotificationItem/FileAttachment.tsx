import { Text } from '@/craftrn-ui/components/Text';
import { Download } from '@/tetrisly-icons/Download';
import { File } from '@/tetrisly-icons/File';
import React from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

const ICON_CONTAINER_SIZE = 40;

export const FileAttachment = ({
  fileName,
  fileSize,
  onPressDownload,
}: {
  fileName: string;
  fileSize: string;
  onPressDownload: () => void;
}) => {
  const { theme } = useUnistyles();

  return (
    <Pressable onPress={onPressDownload}>
      {({ pressed }) => (
        <View style={[styles.container, pressed && styles.pressed]}>
          <View style={styles.infoContainer}>
            <View style={styles.iconContainer}>
              <File color={theme.colors.contentSecondary} />
            </View>
            <View style={styles.textContainer}>
              <Text variant="body3">{fileName}</Text>
              <Text variant="body3" color="contentTertiary">
                {fileSize}
              </Text>
            </View>
          </View>
          <View style={styles.downloadContainer}>
            <Download color={theme.colors.contentSecondary} />
          </View>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.colors.borderPrimary,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.small,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: theme.colors.backgroundSecondary,
  },
  pressed: {
    backgroundColor: theme.colors.backgroundTertiary,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: theme.spacing.small,
    alignItems: 'center',
  },
  iconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    gap: theme.spacing.xxsmall,
  },
  downloadContainer: {
    paddingHorizontal: theme.spacing.small,
  },
}));
