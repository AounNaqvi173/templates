import { Text } from '@/craftrn-ui/components/Text/Text';
import { ChevronDown } from '@/tetrisly-icons/ChevronDown';
import { ChevronUp } from '@/tetrisly-icons/ChevronUp';
import React from 'react';
import { FlatList, Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { AssetsItem } from '../../data/assets';
const CARD_WIDTH = 190;
const CARD_HEIGHT = 120;

type CardProps = AssetsItem & {
  onPress: () => void;
};

export const AssetHighlightsCard = ({
  imageURL,
  name,
  toSymbol,
  fromSymbol,
  sellPrice,
  change,
}: CardProps) => {
  const { styles, theme } = useStyles(cardStylesheet);
  const isNegative = change.substring(0, 1) === '-';

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: imageURL }}
          resizeMode="cover"
          style={styles.image}
        />
        <View>
          <Text variant="body1" style={styles.symbolText}>
            {fromSymbol}
          </Text>
          <Text variant="body3" color="contentSecondary">
            {name}
          </Text>
        </View>
      </View>
      <View>
        <Text variant="heading3" style={styles.priceText}>
          {toSymbol}
          {sellPrice}
        </Text>
      </View>
      <View style={styles.changeContainer(isNegative)}>
        {isNegative ? (
          <ChevronDown size={16} color={theme.colors.negativePrimary} />
        ) : (
          <ChevronUp size={16} color={theme.colors.positivePrimary} />
        )}
        <Text variant="body2" style={styles.changeText(isNegative)}>
          {change}
        </Text>
      </View>
    </View>
  );
};

const cardStylesheet = createStyleSheet(theme => ({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    gap: theme.spacing.xsmall,
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.borderRadius.large,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.small,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
  },
  image: {
    width: 36,
    height: 36,
  },
  symbolText: {
    fontWeight: 'bold',
  },
  priceText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  changeContainer: (isNegative: boolean) => ({
    paddingVertical: theme.spacing.xsmall,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: isNegative
      ? theme.colors.negativePrimary
      : theme.colors.positivePrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  changeText: (isNegative: boolean) => ({
    color: isNegative
      ? theme.colors.negativePrimary
      : theme.colors.positivePrimary,
    fontWeight: 'bold',
    textAlign: 'center',
  }),
}));

const ItemSeparator = () => {
  const { styles } = useStyles(listStylesheet);
  return <View style={styles.separator} />;
};

type Props = {
  data: readonly AssetsItem[];
};

export const AssetHighlights = ({ data }: Props) => {
  const { styles } = useStyles(listStylesheet);

  return (
    <FlatList<AssetsItem>
      data={data}
      horizontal
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <AssetHighlightsCard {...item} onPress={() => {}} />
      )}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.fromSymbol.toString()}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      snapToInterval={CARD_WIDTH + 8}
      decelerationRate="fast"
    />
  );
};

const listStylesheet = createStyleSheet(theme => ({
  separator: {
    width: 8,
  },
  list: {
    paddingHorizontal: theme.spacing.large,
  },
  listContent: {
    paddingRight: theme.spacing.large * 2,
  },
}));
