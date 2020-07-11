import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import PlaceItem from "../components/PlaceItem";

const PlacesList = ({ navigation }) => {
  const places = useSelector((state) => state.places.places);

  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          title={itemData.item.title}
          address={null}
          image={null}
          onSelect={() =>
            navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            })
          }
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});
export default PlacesList;
