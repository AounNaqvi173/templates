import { useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { Discussion, discussionsData } from '../../data/discussions';
import { ArchiveBottomSheet } from './ArchiveBottomSheet';
import { DeleteBottomSheet } from './DeleteBottomSheet';
import { DiscussionItem } from './DiscussionItem';

export const DiscussionsMainScreen = () => {
  const [deleteBottomSheetVisible, setDeleteBottomSheetVisible] =
    useState(false);
  const [archiveBottomSheetVisible, setArchiveBottomSheetVisible] =
    useState(false);
  const router = useRouter();
  const { styles, theme } = useStyles(stylesheet);

  useLayoutEffect(() => {
    // Optionally, you can set header options using expo-router's useLocalSearchParams or other hooks if needed
  }, [
    theme.colors.backgroundPrimary,
    theme.colors.backgroundSecondary,
    theme.colors.borderPrimary,
  ]);

  const handlePressItem = (id: string) => () => {
    router.push({ pathname: '/discussions/message/[id]', params: { id } });
  };

  return (
    <>
      <FlatList<Discussion>
        style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
        data={discussionsData}
        renderItem={({ item }) => (
          <DiscussionItem
            onPress={handlePressItem(item.id)}
            onPressDelete={() => setDeleteBottomSheetVisible(true)}
            onPressArchive={() => setArchiveBottomSheetVisible(true)}
            {...item}
          />
        )}
        contentContainerStyle={{
          paddingBottom: UnistylesRuntime.insets.bottom,
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <DeleteBottomSheet
        visible={deleteBottomSheetVisible}
        onRequestClose={() => setDeleteBottomSheetVisible(false)}
        onPressCancel={() => setDeleteBottomSheetVisible(false)}
        onPressConfirm={() => setDeleteBottomSheetVisible(false)}
      />
      <ArchiveBottomSheet
        visible={archiveBottomSheetVisible}
        onRequestClose={() => setArchiveBottomSheetVisible(false)}
        onPressCancel={() => setArchiveBottomSheetVisible(false)}
        onPressConfirm={() => setArchiveBottomSheetVisible(false)}
      />
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderPrimary,
  },
}));
