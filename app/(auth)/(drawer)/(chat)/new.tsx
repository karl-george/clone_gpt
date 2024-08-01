import HeaderDropDown from '@/components/HeaderDropDown';
import { defaultStyles } from '@/constants/Styles';
import { useAuth } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import React from 'react';
import { Button, View } from 'react-native';

const Page = () => {
  const { signOut } = useAuth();

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen options={{ headerTitle: () => <HeaderDropDown /> }} />
      <Button
        title='Sign out'
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export default Page;
