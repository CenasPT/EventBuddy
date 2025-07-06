import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomeStack from "./screens/HomeStack";
import Toast from 'react-native-toast-message';
import { toastConfig } from "./components/ToastConfig";
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';

const Stack = createStackNavigator();

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="HomeStack"
            component={HomeStack}
            options={{ title: "", headerStyle: { backgroundColor: "#161616", height: 55 }, headerShadowVisible: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "", headerStyle: { backgroundColor: "#161616", height: 55 }, headerShadowVisible: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: "", headerStyle: { backgroundColor: "#161616", height: 55 }, headerShadowVisible: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
    useEffect(() => {      
      NavigationBar.setButtonStyleAsync('light');
    }, []);

    return (
    <AuthProvider>
      <AppNavigator />
      <Toast config={toastConfig} position="top" visibilityTime={5000} />      
    </AuthProvider>    
  );
};
