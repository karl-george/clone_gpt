import HeaderDropDown from '@/components/HeaderDropDown';
import MessageInput from '@/components/MessageInput';
import { defaultStyles } from '@/constants/Styles';
import { useAuth } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const Page = () => {
  const [gptVersion, setGptVersion] = useState('3.5');
  const { signOut } = useAuth();

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
        <Text>Hi</Text>
        <Button
          title='Sign out'
          onPress={() => {
            signOut();
          }}
        />
      </View>
      <MessageInput />
    </View>
  );
};

export default Page;
