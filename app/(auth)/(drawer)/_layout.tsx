import Colors from '@/constants/Colors';
import { getChats } from '@/utils/Database';
import { Chat } from '@/utils/interfaces';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Link, useNavigation, useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CustomDrawerContent = (props: any) => {
  const { bottom, top } = useSafeAreaInsets();
  const isDrawerOpen = useDrawerStatus() === 'open';

  const [history, setHistory] = useState<Chat[]>([]);
  const db = useSQLiteContext();
  const router = useRouter();

  useEffect(() => {
    if (isDrawerOpen) {
      loadChats();
    }
    Keyboard.dismiss();
  }, [isDrawerOpen]);

  const loadChats = async () => {
    const result = await getChats(db);
    setHistory(result);
  };

  return (
    <View style={{ flex: 1, marginTop: top }}>
      <View style={{ backgroundColor: '#fff', paddingBottom: 16 }}>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name='search'
            size={20}
            color={Colors.grey}
          />
          <TextInput
            style={styles.input}
            placeholder='Search'
            underlineColorAndroid={'transparent'}
          />
        </View>
      </View>
      <DrawerContentScrollView
        contentContainerStyle={{
          paddingTop: 0,
        }}
        {...props}
      >
        <DrawerItemList {...props} />
        {history.map((chat) => (
          <DrawerItem
            key={chat.id}
            label={chat.title}
            onPress={() => router.push(`/(auth)/(drawer)/(chat)/${chat.id}`)}
            inactiveTintColor='#000'
          ></DrawerItem>
        ))}
      </DrawerContentScrollView>

      <View style={{ paddingBottom: bottom + 6, padding: 16 }}>
        <Link href={'/(auth)/(modal)/settings'} asChild>
          <TouchableOpacity style={styles.footer}>
            <Image
              source={require('@/assets/images/logo-dark.png')}
              style={styles.avatar}
            />
            <Text style={styles.username}>Karl George</Text>
            <Ionicons
              name='ellipsis-horizontal'
              size={24}
              color={Colors.greyLight}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const Layout = () => {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ marginLeft: 16 }}
          >
            <FontAwesome6 name='grip-lines' size={20} color={Colors.grey} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.light,
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Colors.selected,
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#000',
        drawerItemStyle: {
          borderRadius: 12,
        },
        drawerLabelStyle: {
          marginLeft: -20,
        },
        drawerStyle: {
          width: dimensions.width * 0.86,
        },
        overlayColor: 'rgba(0, 0, 0, 0.2)',
      }}
    >
      <Drawer.Screen
        name='(chat)/new'
        getId={() => Math.random().toString()}
        options={{
          title: 'CloneGPT',
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: '#000' }]}>
              <Image
                source={require('@/assets/images/logo-white.png')}
                style={styles.btnImage}
              />
            </View>
          ),
          headerRight: () => (
            <Link href='/(auth)/(drawer)/(chat)/new' push asChild>
              <TouchableOpacity>
                <Ionicons
                  name='create-outline'
                  size={24}
                  color={Colors.grey}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Drawer.Screen
        name='(chat)/[id]'
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          headerRight: () => (
            <Link href='/(auth)/(drawer)/(chat)/new' push asChild>
              <TouchableOpacity>
                <Ionicons
                  name='create-outline'
                  size={24}
                  color={Colors.grey}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Drawer.Screen
        name='dalle'
        options={{
          title: 'DallE',
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: '#000' }]}>
              <Image
                source={require('@/assets/images/dalle.png')}
                style={styles.dallEImage}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name='explore'
        options={{
          title: 'Explore GPTs',
          drawerIcon: () => (
            <View style={[styles.itemExplore, ,]}>
              <Ionicons name='apps-outline' size={18} color={'#000'} />
            </View>
          ),
        }}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  dallEImage: {
    width: 28,
    height: 28,
    resizeMode: 'cover',
  },
  itemExplore: {
    backgroundColor: '#fff',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  searchSection: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.input,
    borderRadius: 10,
    height: 34,
  },
  searchIcon: {
    padding: 6,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    alignItems: 'center',
    color: '#424242',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  username: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Layout;
