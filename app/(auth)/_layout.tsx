import Colors from '@/constants/Colors';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDbIfNeeded } from '@/utils/Database';

const Layout = () => {
  const router = useRouter();

  return (
    <SQLiteProvider databaseName='chats.db' onInit={migrateDbIfNeeded}>
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
        <Stack.Screen
          name='(modal)/[url]'
          options={{
            headerTitle: '',
            presentation: 'fullScreenModal',
            headerTransparent: true,
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            },
            headerBlurEffect: 'dark',
            headerTitleAlign: 'center',
          }}
        />
      </Stack>
    </SQLiteProvider>
  );
};

export default Layout;
