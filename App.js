import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeBaseProvider } from "native-base";
import { Provider as PaperProvider } from 'react-native-paper';

import Home from "./screens/Home";
import Login from "./screens/Login";
import SuratKeluarPublik from "./screens/SuratKeluarPublik";
import SuratMasukPublik from "./screens/SuratMasukPublik";
import DetailSuratMasuk from "./screens/DetailSuratMasuk";
import DetailSuratKeluar from "./screens/DetailSuratKeluar";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Ionicons name="home" size={32} color="black" />
          ),
        }}
      />
      <Tab.Screen name="SuratMasukPublik" component={SuratMasukPublik}
        options={{
          tabBarLabel: 'Surat Masuk',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="email-receive" size={32} color="black" />
          ),
        }}
      />
      <Tab.Screen name="SuratKeluarPublik" component={SuratKeluarPublik}
        options={{
          tabBarLabel: 'Surat Keluar',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="email-send" size={32} color="black" />
          ),
        }}
      />
      <Tab.Screen name="DetailSuratMasuk" component={DetailSuratMasuk}  
        options={{
          tabBarButton: (props) => null,
          tabBarLabelStyle: { display: 'none' },
          tabBarIconStyle: { display: "none"}
        }}
      />
      <Tab.Screen name="DetailSuratKeluar" component={DetailSuratKeluar}  
        options={{
          tabBarButton: (props) => null,
          tabBarLabelStyle: { display: 'none' },
          tabBarIconStyle: { display: "none"}
        }}
      />
    </Tab.Navigator>
  );
}

export default function App({ navigation }) {
  return (
    <NativeBaseProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="HomeStack"
          >
            <Stack.Screen name="HomeStack" component={TabStack} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PaperProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
