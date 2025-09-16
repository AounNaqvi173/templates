import React, { ComponentType, useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { StyleSheet, UnistylesRuntime, useUnistyles } from 'react-native-unistyles';
import { ChatItem, HEIGHT } from './ChatItem';
import { InboxItem, inboxItemData } from './data/inbox';
import { Filter, FilterList } from './FilterList';
import { MoreBottomSheet } from './MoreBottomSheet';

type Props = {
  searchText: string;
  onPressItem: (id: string) => () => void;
};

export const MessagingInboxScreen: ComponentType<Props> = ({
  searchText,
  onPressItem,
}) => {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [moreBottomSheetVisible, setMoreBottomSheetVisible] = useState(false);
  const [selectedInboxId, setSelectedInboxId] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    let data = inboxItemData;

    switch (activeFilter) {
      case 'unread':
        data = data.filter(item => item.unreadCount > 0);
        break;
      case 'favourites':
        data = data.filter(item => item.isFavourite);
        break;
      case 'all':
      default:
        break;
    }

    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase().trim();
      data = data.filter(item =>
        item.participants.some(participant =>
          participant.name.toLowerCase().includes(searchLower),
        ),
      );
    }

    return data;
  }, [activeFilter, searchText]);

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
        onPress={onPressItem(item.id)}
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
        contentContainerStyle={styles.contentContainer}
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
      />
    </>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
}));
