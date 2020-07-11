import * as FileSystem from "expo-file-system";

import { insertPlace, fetchPlaces } from "../../helpers/db";
import { ADD_PLACE, SET_PLACES } from "../types";

export const addPlace = (title, image) => {
  return async (dispatch) => {
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
        "Dummy address",
        15.6,
        2.4
      );
      console.log(result);
      dispatch({
        type: ADD_PLACE,
        payload: { id: result.insertId, restitle, image: newPath },
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
