import { useAuth } from '@clerk/clerk-expo';
import React from 'react';
import { Button, View } from 'react-native';

const Page = () => {
  const { signOut } = useAuth();

  return (
    <View>
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
