import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getCurrentPositionAsync } from "expo-location";
import { askAsync, LOCATION } from "expo-permissions";

import Colors from "../constants/Colors";

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const verifyPermision = async () => {
    const result = await askAsync(LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant permissions to use the app",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const permission = await verifyPermision();
    if (!permission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await getCurrentPositionAsync({
        timeout: 5000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert("Could not fetch location", "Try again later", [
        { text: "Okay" },
      ]);
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator color={Colors.PRIMARY} size="large" />
        ) : (
          <Text>No Location Chosen Yet</Text>
        )}
      </View>
      <Button
        title="Get User Location"
        color={Colors.PRIMARY}
        onPress={getLocationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LocationPicker;
