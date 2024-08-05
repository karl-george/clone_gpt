import HeaderDropDown from '@/components/HeaderDropDown';
import MessageIdeas from '@/components/MessageIdeas';
import MessageInput from '@/components/MessageInput';
import { defaultStyles } from '@/constants/Styles';
import { Message } from '@/utils/interfaces';
import { useAuth } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';

const Page = () => {
  const [gptVersion, setGptVersion] = useState('3.5');
  const [messages, setMessages] = useState<Message[]>([]);
  const { signOut } = useAuth();

  const getCompletion = () => {
    console.log('Getting completion');
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <HeaderDropDown
              title='CloneGPT'
              items={[
                { key: '3.5', title: 'GPT-3.5', icon: 'bolt' },
                { key: '4', title: 'GPT-4', icon: 'new-releases' },
              ]}
              onSelect={(key) => {
                setGptVersion(key);
              }}
              selected={gptVersion}
            />
          ),
        }}
      />
      <View style={{ flex: 1 }}>
        <Button
          title='Sign out'
          onPress={() => {
            signOut();
          }}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={70}
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
      >
        {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />}
        <MessageInput onShouldSend={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Page;
