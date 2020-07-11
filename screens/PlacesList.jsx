import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { loadPlaces } from "../store/actions/places";
import PlaceItem from "../components/PlaceItem";

const PlacesList = ({ navigation }) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          title={itemData.item.title}
          address={null}
          image={itemData.item.imageUri}
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
