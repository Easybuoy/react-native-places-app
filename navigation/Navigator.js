import React from 'react'
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import NewPlace from "../screens/NewPlace";
import Map from "../screens/Map";
import PlaceDetail from "../screens/PlaceDetail";
import PlacesList from "../screens/PlacesList";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.PRIMARY : "white",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.PRIMARY,
      }}
    >
      <Stack.Screen name="New Place" component={NewPlace} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Place Detail" component={PlaceDetail} />
      <Stack.Screen name="Places List" component={PlacesList} />
    </Stack.Navigator>
  );
};

export { StackScreen };
