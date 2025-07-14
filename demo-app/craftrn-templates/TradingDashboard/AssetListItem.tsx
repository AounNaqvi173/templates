import { ListItem } from '@/craftrn-ui/components/ListItem';
import React, { ComponentProps, ComponentType } from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const IMAGE_SIZE = 40;

type Props = Pick<
  ComponentProps<typeof ListItem>,
  'onPress' | 'text' | 'textBelow' | 'itemRight'
> & {
  divider?: boolean;
  imageURL: string;
  style?: ViewStyle | ViewStyle[];
};

export const AssetListItem: ComponentType<Props> = ({
  divider = true,
  imageURL,
  ...listItemProps
}) => {
  const { styles } = useStyles(stylesheet);
  return (
    <>
      <ListItem
        {...listItemProps}
        style={[styles.listItem, StyleSheet.flatten(listItemProps?.style)]}
        itemLeft={
          <View style={styles.itemLeft}>
            <Image
              source={{
                uri: imageURL,
              }}
              style={styles.image}
            />
          </View>
        }
        divider={divider}
      />
    </>
  );
};

const stylesheet = createStyleSheet(theme => ({
  image: {
    borderRadius: theme.borderRadius.medium,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  listItem: {
    marginVertical: theme.spacing.xsmall,
    paddingVertical: theme.spacing.xsmall,
    borderRadius: theme.borderRadius.large,
  },
  itemLeft: {
    marginRight: theme.spacing.medium,
  },
}));
