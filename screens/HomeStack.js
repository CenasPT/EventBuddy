import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import EventDetails from "./EventDetails";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={{ title: "Detalhes do Evento", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
