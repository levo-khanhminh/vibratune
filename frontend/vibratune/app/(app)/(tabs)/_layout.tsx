import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView
            tint="dark"
            intensity={50}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarActiveTintColor: '#9FE870',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        tabBarShowLabel: false,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={32} 
                color={color} 
                style={styles.icon}
              />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons 
                name={focused ? "search" : "search-outline"} 
                size={32} 
                color={color}
                style={styles.icon}
              />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="player"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons 
                name={focused ? "musical-notes" : "musical-notes-outline"} 
                size={32} 
                color={color}
                style={styles.icon}
              />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons 
                name={focused ? "library" : "library-outline"} 
                size={32} 
                color={color}
                style={styles.icon}
              />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: 'rgba(32, 33, 35, 0.85)',
    borderRadius: 40,
    elevation: 0,
    borderTopWidth: 0,
    paddingVertical: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
        backgroundColor: 'rgba(32, 33, 35, 0.95)',
      },
    }),
  },
  tabItem: {
    paddingTop: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    position: 'relative',
    marginBottom: 7,
    borderRadius: 35,
  },
  icon: {
    transform: [{ scale: 1 }],
  },
  activeIndicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 35,
    backgroundColor: '#9FE870',
    opacity: 0.2,
  },
}); 