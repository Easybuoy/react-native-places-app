import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
// import { API_KEY } from "react-native-dotenv";
// console.log(API_KEY);
// const API_KEY = "adad";

const MapPreview = ({ location, children, style, onPress }) => {
  let imagePreviewUrl;
  if (location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${API_KEY}`;
  }
  return (
    <TouchableOpacity style={{ ...styles.mapPreview, ...style }} onPress={onPress}>
      {location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
  {
  }
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});
export default MapPreview;
