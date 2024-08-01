import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Layout = () => {
  return (
    <Drawer>
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
