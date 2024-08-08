import DropDownMenu from '@/components/DropDownMenu';
import { downloadAndSaveImage, shareImage } from '@/utils/Image';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import { BlurView } from 'expo-blur';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Page = () => {
  const { url, prompt } = useLocalSearchParams<{
    url: string;
    prompt?: string;
  }>();

  const { bottom } = useSafeAreaInsets();

  const onCopyPrompt = () => {
    console.log('copy prompt');
  };

  const handlePresentModalPress = () => {};

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <DropDownMenu
              items={[
                { key: '1', title: 'View prompt', icon: 'info.cirlce' },
                { key: '2', title: 'Learn more', icon: 'questionmark.cirlce' },
              ]}
              onSelect={handlePresentModalPress}
            />
          ),
        }}
      />
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

      <BlurView
        intensity={95}
        tint={'dark'}
        style={[styles.blurView, { paddingBottom: bottom }]}
      >
        <View style={styles.row}>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Ionicons
              name='chatbubble-ellipses-outline'
              size={24}
              color='white'
            />
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Ionicons name='brush-outline' size={24} color='white' />
            <Text style={styles.btnText}>Select</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => downloadAndSaveImage(url!)}
          >
            <Octicons name='download' size={24} color='white' />
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => shareImage(url!)}
          >
            <Octicons name='share' size={24} color='white' />
            <Text style={styles.btnText}>Share</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  blurView: {
    width: '100%',
    bottom: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
    paddingTop: 6,
  },
});

export default Page;
