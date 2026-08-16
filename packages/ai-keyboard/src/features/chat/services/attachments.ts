import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import type { Attachment } from '@/features/chat/model/types';

export async function pickFromCamera(): Promise<Attachment | null> {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) return null;

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ['images'],
    quality: 0.8,
  });
  return result.canceled ? null : { type: 'image', uri: result.assets[0].uri };
}

export async function pickFromLibrary(): Promise<Attachment | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.8,
    selectionLimit: 1,
  });
  return result.canceled ? null : { type: 'image', uri: result.assets[0].uri };
}

export async function pickFile(): Promise<Attachment | null> {
  const result = await DocumentPicker.getDocumentAsync();
  if (result.canceled) return null;

  const asset = result.assets[0];
  return {
    type: 'file',
    uri: asset.uri,
    name: asset.name,
    mimeType: asset.mimeType,
    size: asset.size,
  };
}
