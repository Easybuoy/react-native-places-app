import { ADD_PLACE } from "../types";
import Place from "../../models/place";
const INITIALSTATE = {
  places: [],
};

export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(new Date().toString(), action.payload.title);
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
