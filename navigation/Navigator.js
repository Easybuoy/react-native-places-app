import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import NewPlace from "../screens/NewPlace";
import Map from "../screens/Map";
import PlaceDetail from "../screens/PlaceDetail";
import PlacesList from "../screens/PlacesList";
import Colors from "../constants/Colors";
import HeaderButton from "../components/HeaderButton";

const Stack = createStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="All Places"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.PRIMARY : "white",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.PRIMARY,
      }}
    >
      <Stack.Screen name="Add Place" component={NewPlace} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Place Detail" component={PlaceDetail} />
      <Stack.Screen
        name="All Places"
        component={PlacesList}
        options={({ navigation }) => {
          return {
            headerRight: ({}) => {
              return (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Add Place"
                    iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                    onPress={() => navigation.navigate("Add Place")}
                  />
                </HeaderButtons>
              );
            },
          };
        }}
      />
    </Stack.Navigator>
  );
};

export { StackScreen };
