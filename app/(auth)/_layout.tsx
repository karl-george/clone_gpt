import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const Layout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
      <Stack.Screen
        name='(modal)/settings'
        options={{
          headerTitle: 'Settings',
          presentation: 'modal',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.selected,
          },
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
};

export default Layout;
