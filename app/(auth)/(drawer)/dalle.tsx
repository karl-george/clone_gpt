import { View, Text } from 'react-native';
import React from 'react';
import { defaultStyles } from '@/constants/Styles';
import HeaderDropDown from '@/components/HeaderDropDown';
import { Stack } from 'expo-router';

const Page = () => {
  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => (
            <HeaderDropDown
              title='DallE'
              items={[
                { key: 'share', title: 'Share GPT', icon: 'bolt' },
                { key: 'details', title: 'See Details', icon: 'new-releases' },
                { key: 'keep', title: 'Keep in Sidebar', icon: 'pin' },
              ]}
              onSelect={() => {}}
            />
          ),
        }}
      />
    </View>
  );
};

export default Page;
