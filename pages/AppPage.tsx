import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Navbar from '../components/Navbar';
import { View, Text } from 'react-native';

export default function AppPage() {
  return (
    <SafeAreaProvider>
      <Navbar />
      <View className="flex-1 items-center justify-center bg-green-500 to-teal-600">
        <Text className="text-white text-2xl font-semibold">App Page Content</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
