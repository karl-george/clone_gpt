import React from 'react';
import { View } from 'react-native';
import AnimatedIntro from '../components/AnimatedIntro';
import BottomLoginSheet from '../components/BottomLoginSheet';

const Index = () => {
  return (
    <View style={{ flex: 1 }}>
      <AnimatedIntro />
      <BottomLoginSheet />
    </View>
  );
};

export default Index;
