import * as FileSystem from "expo-file-system";

import { insertPlace, fetchPlaces } from "../../helpers/db";
import { ADD_PLACE, SET_PLACES } from "../types";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const API_KEY = "";
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();
    console.log(resData);

    if (!resData.results) {
      throw new Error("Something went wrong");
    }

    const address = resData.result[0].formatted_address;
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
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
      console.log(result);
      dispatch({
        type: ADD_PLACE,
        payload: {
          id: result.insertId,
          restitle,
          image: newPath,
          address,
          coords: { lat: location.lat, lng: location.lng },
        },
      });
    } catch (error) {
      console.log(error);
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
