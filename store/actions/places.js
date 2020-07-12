import * as FileSystem from "expo-file-system";

import { insertPlace, fetchPlaces } from "../../helpers/db";
import { ADD_PLACE, SET_PLACES } from "../types";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const API_KEY = "";

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const resData = await response.json();

      if (!resData.results) {
        throw new Error("Something went wrong");
      }
      const address = resData.results[0].formatted_address;

      FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const result = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );

      dispatch({
        type: ADD_PLACE,
        payload: {
          id: result.insertId,
          title,
          image: newPath,
          address,
          coords: { lat: location.lat, lng: location.lng },
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const places = await fetchPlaces();
      dispatch({
        type: SET_PLACES,
        payload: places.rows._array,
      });
    } catch (error) {
      throw error;
    }
  };
};
