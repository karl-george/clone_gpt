import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';

const Page = () => {
  const { url, prompt } = useLocalSearchParams<{
    url: string;
    prompt?: string;
  }>();

  const { bottom } = useSafeAreaInsets();

  const onCopyPrompt = () => {
    console.log('copy prompt');
  };

  return (
    <View style={styles.container}>
      <ImageZoom
        uri={url}
        style={styles.image}
        minScale={0.5}
        maxScale={5}
        minPanPointers={1}
        doubleTapScale={2}
        isSingleTapEnabled
        isDoubleTapEnabled
        resizeMode='contain'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Page;
