import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';

export default function Home() {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <Navbar />
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-black mb-2">This is the Home screen</Text>
        <Pressable
          className="bg-lime-600 p-2 rounded"
          onPress={() => navigation.navigate('About')}
        >
          <Text className="text-white">To About</Text>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
}
