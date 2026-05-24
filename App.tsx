import './global.css';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home';
import About from './pages/About';
import AppPage from './pages/AppPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="AppPage" component={AppPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}