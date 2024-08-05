import { Message } from '@/utils/interfaces';
import React from 'react';
import { Text, View } from 'react-native';

const ChatMessage = ({ content, role, imageUrl, prompt }: Message) => {
  return (
    <View>
      <Text>ChatMessage</Text>
    </View>
  );
};

export default ChatMessage;
