import React from "react";
import { Image, StyleSheet } from "react-native";
import { API_KEY } from "react-native-dotenv";

const MapPreview = ({ location }) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${API_KEY}`;
  return <Image source={{ uri: imagePreviewUrl }} />;
};

const styles = StyleSheet.create({});
export default MapPreview;
