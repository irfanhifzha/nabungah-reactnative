import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isActive = (name: string) => route.name === name;

  const linkStyle = (name: string) =>
    `px-3 py-2 rounded-md ${isActive(name) ? 'bg-white/20' : ''}`;

  return (
    <View
      className="flex-row items-center justify-between px-4 py-3 shadow-md mt-[80px] bg-black"
    >
      <Pressable onPress={() => navigation.navigate('Home')} style={{ flex: 1, alignItems: 'center' }}>
        <Text className={`${linkStyle('Home')} text-white text-base font-medium`}>
          Home
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('About')} style={{ flex: 1, alignItems: 'center' }}>
        <Text className={`${linkStyle('About')} text-white text-base font-medium`}>
          About
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('AppPage')} style={{ flex: 1, alignItems: 'center' }}>
        <Text className={`${linkStyle('AppPage')} text-white text-base font-medium`}>
          AppPage
        </Text>
      </Pressable>
    </View>
  );
};

export default Navbar;