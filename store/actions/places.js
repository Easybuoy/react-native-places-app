import * as FileSystem from "expo-file-system";

import { ADD_PLACE } from "../types";

export const addPlace = (title, image) => {
  return (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }

    dispatch({
      type: ADD_PLACE,
      payload: { title, image: newPath },
    });
  };
};
