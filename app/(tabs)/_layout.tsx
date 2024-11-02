import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}>
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tabla de cartas',
          tabBarIcon: ({ color }) => <TabBarIcon name="table" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Analizar mano',
          tabBarIcon: ({ color }) => <TabBarIcon name="chart-bar" color={color} />,
          headerShown: false,

        }}
      />
      <Tabs.Screen
        name="juegopuntos"
        options={{
          title: 'Juego de adivinar puntos',
          tabBarIcon: ({ color }) => <TabBarIcon name="cards-playing-outline" color={color} />,
          headerShown: false,

        }}
      />
      
    </Tabs>
  );
}
