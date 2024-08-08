import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
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

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
