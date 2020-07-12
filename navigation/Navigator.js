import React from "react";
import { Platform, Text, TouchableOpacity, StyleSheet } from "react-native";
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
      <Stack.Screen
        name="Map"
        component={Map}
        options={({ navigation, route }) => {
          let savePickedLocation;
          const readOnly = route.params?.readOnly;
          if (route.params) {
            savePickedLocation = route.params.savePickedLocation;
          }

          if (readOnly) {
            return {};
          }

          return {
            headerRight: ({}) => {
              return (
                <TouchableOpacity
                  style={styles.headerButton}
                  onPress={savePickedLocation}
                >
                  <Text style={styles.headerButtonText}>Save</Text>
                </TouchableOpacity>
              );
            },
          };
        }}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetail}
        options={({ route }) => {
          const { placeTitle } = route.params;

          return {
            headerTitle: placeTitle,
          };
        }}
      />
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

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.PRIMARY,
  },
});
export { StackScreen };
