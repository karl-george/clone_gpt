import Colors from '@/constants/Colors';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Link, useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const Layout = () => {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();

  return (
    <Drawer
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
});

export default Layout;
