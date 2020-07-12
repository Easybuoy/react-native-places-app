import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const Map = () => {
  const mapRegion = {
    latitude: 37.8,
    longitude: -122.43,
    latitudeDelta: 0.021,
    longitudeDelta: 0.42,
  };
  return <MapView region={mapRegion} style={styles.map}></MapView>;
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
