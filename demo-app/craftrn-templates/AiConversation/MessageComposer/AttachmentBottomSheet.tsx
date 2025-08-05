import { BottomSheet } from '@/craftrn-ui/components/BottomSheet';
import { Card } from '@/craftrn-ui/components/Card';
import { ListItem } from '@/craftrn-ui/components/ListItem';
import { Camera } from '@/tetrisly-icons/Camera';
import { File } from '@/tetrisly-icons/File';
import { Image } from '@/tetrisly-icons/Image';
import React, { ComponentProps, ComponentType } from 'react';
import { View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

type Props = Pick<
  ComponentProps<typeof BottomSheet>,
  'onRequestClose' | 'onClose' | 'visible'
>;

export const AttachmentBottomSheet: ComponentType<Props> = ({
  visible,
  onRequestClose,
  onClose,
}) => {
  const { styles, theme } = useStyles(stylesheet);

  const iconProps = {
    color: theme.colors.contentPrimary,
  };

  const handleAttachFile = () => {
    console.log('Attach file pressed');
    onRequestClose();
  };

  const handleAttachImage = () => {
    console.log('Attach image pressed');
    onRequestClose();
  };

  const handleAttachDocument = () => {
    console.log('Attach document pressed');
    onRequestClose();
  };

  return (
    <BottomSheet
      enableOverlayTapToClose
      enableSwipeToClose
      onRequestClose={onRequestClose}
      onClose={onClose}
      visible={visible}
      variant="secondary"
      showHandleBar
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Card>
            <ListItem
              text="Take a photo"
              onPress={handleAttachFile}
              itemRight={
                <View style={styles.icon}>
                  <Camera {...iconProps} />
                </View>
              }
              divider
              style={styles.item}
            />
            <ListItem
              text="Attach an image"
              onPress={handleAttachImage}
              itemRight={
                <View style={styles.icon}>
                  <Image {...iconProps} />
                </View>
              }
              divider
              style={styles.item}
            />
            <ListItem
              text="Attach a file"
              onPress={handleAttachDocument}
              itemRight={
                <View style={styles.icon}>
                  <File {...iconProps} />
                </View>
              }
              style={styles.item}
            />
          </Card>
        </View>
      </View>
    </BottomSheet>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    paddingHorizontal: theme.spacing.large,
    paddingBottom: Math.max(
      UnistylesRuntime.insets.bottom,
      theme.spacing.large,
    ),
  },
  content: {
    gap: theme.spacing.large,
  },
  item: {
    padding: theme.spacing.large,
  },
  icon: {
    marginRight: theme.spacing.small,
  },
}));
