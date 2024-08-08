import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

// Share Image
export const shareImage = async (imageUrl: string) => {
  Sharing.shareAsync(imageUrl);
};

// Copy image to clipboard
export const copyImageToClipboard = async (imageUrl: string) => {
  let fileUri = FileSystem.documentDirectory + `${new Date().getTime()}.jpg`;

  try {
    const res = await FileSystem.downloadAsync(imageUrl, fileUri);
    const base64 = await FileSystem.readAsStringAsync(res.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Clipboard.setImageAsync(base64);
  } catch (error) {
    console.log(error);
  }
};

// Download and save image
export const downloadAndSaveImage = async (imageUrl: string) => {
  let fileUri = FileSystem.documentDirectory + `${new Date().getTime()}.jpg`;

  try {
    const res = await FileSystem.downloadAsync(imageUrl, fileUri);
    return saveFile(res.uri);
  } catch (error) {
    console.log(error);
  }
};

// Save image to custom album
const saveFile = async (fileUri: string) => {
  const { status } = await MediaLibrary.requestPermissionsAsync();

  if (status === 'granted') {
    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync('Download');

      if (album == null) {
        const result = await MediaLibrary.createAlbumAsync(
          'Download',
          asset,
          false
        );
        if (result) {
          Alert.alert('Downloaded successfully');
        }
      } else {
        const result = await MediaLibrary.addAssetsToAlbumAsync(
          [asset],
          album,
          false
        );
        if (result) {
          Alert.alert('Downloaded successfully');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};
