import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';

export default function About() {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <Navbar />
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-black mb-2">This is the About screen</Text>
        <TouchableOpacity
          className="bg-amber-600 p-2 rounded"
          onPress={() => navigation.navigate('Home')}
        >
          <Text className="text-white">Back to Home</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
