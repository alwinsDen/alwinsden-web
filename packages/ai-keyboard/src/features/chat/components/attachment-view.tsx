import { Image as ExpoImage } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';

import { Spacing } from '@/constants/theme';
import type { Attachment } from '@/features/chat/model/types';

export function AttachmentView({
  attachment,
  thumbnail = false,
}: {
  attachment: Attachment;
  thumbnail?: boolean;
}) {
  const theme = useTheme();

  if (attachment.type === 'image') {
    return (
      <ExpoImage
        source={{ uri: attachment.uri }}
        style={thumbnail ? styles.attachmentThumb : styles.attachmentImage}
        contentFit="cover"
      />
    );
  }

  return (
    <View style={[styles.fileChip, { backgroundColor: theme.colors.surface }]}>
      <Icon source="file" size={20} color={theme.colors.onSurfaceVariant} />
      <Text variant="labelMedium" numberOfLines={1} style={styles.fileName}>
        {attachment.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  attachmentImage: { width: 200, height: 200, borderRadius: 12 },
  attachmentThumb: { width: 132, height: 132, borderRadius: 12 },
  fileChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    borderRadius: 10,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    maxWidth: 240,
  },
  fileName: { flexShrink: 1 },
});
