import React, { useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';
import { ChatItem, HEIGHT } from './ChatItem';
import { InboxItem, inboxItemData } from './data/inbox';
import { Filter, FilterList } from './FilterList';
import { MoreBottomSheet } from './MoreBottomSheet';

export const ConversationsInboxScreen = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [moreBottomSheetVisible, setMoreBottomSheetVisible] = useState(false);
  const [selectedInboxId, setSelectedInboxId] = useState<string | null>(null);
  const { styles } = useStyles(stylesheet);

  const filteredData = useMemo(() => {
    switch (activeFilter) {
      case 'unread':
        return inboxItemData.filter(item => item.unreadCount > 0);
      case 'favourites':
        return inboxItemData.filter(item => item.isFavourite);
      case 'all':
      default:
        return inboxItemData;
    }
  }, [activeFilter]);

  const handleShowMoreBottomSheet = useCallback((inboxId: string) => {
    setSelectedInboxId(inboxId);
    setMoreBottomSheetVisible(true);
  }, []);

  const handleMoreBottomSheetRequestClose = useCallback(() => {
    setMoreBottomSheetVisible(false);
  }, []);

  const handleMoreBottomSheetClose = useCallback(() => {
    setSelectedInboxId(null);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: InboxItem; index: number }) => (
      <ChatItem
        onPress={() => null}
        divider={index !== filteredData.length - 1}
        onShowMoreBottomSheet={handleShowMoreBottomSheet}
        {...item}
      />
    ),
    [filteredData.length, handleShowMoreBottomSheet],
  );

  const onFilterChange = useCallback((filter: Filter) => {
    setActiveFilter(filter);
  }, []);

  const ListHeaderComponent = useMemo(
    () => (
      <FilterList activeFilter={activeFilter} onFilterChange={onFilterChange} />
    ),
    [activeFilter, onFilterChange],
  );

  return (
    <>
      <FlatList<InboxItem>
        style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={{
          paddingBottom: UnistylesRuntime.insets.bottom,
        }}
        scrollEventThrottle={16}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        getItemLayout={(_, index) => ({
          length: HEIGHT,
          offset: HEIGHT * index,
          index,
        })}
      />
      <MoreBottomSheet
        visible={moreBottomSheetVisible}
        selectedInboxId={selectedInboxId}
        onRequestClose={handleMoreBottomSheetRequestClose}
        onClose={handleMoreBottomSheetClose}
        onPressCancel={handleMoreBottomSheetRequestClose}
        onPressConfirm={handleMoreBottomSheetRequestClose}
      />
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
  },
}));
