import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const PlacesList = () => {
  const places = useSelector((state) => state.places.places);

  return (
    <FlatList data={places} renderItem={itemData =>} />
  );
};

const styles = StyleSheet.create({});
export default PlacesList;
