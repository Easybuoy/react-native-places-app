import * as FileSystem from "expo-file-system";

import { insertPlace } from "../../helpers/db";
import { ADD_PLACE } from "../types";

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
    
}
