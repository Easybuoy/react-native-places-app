import { ADD_PLACE, SET_PLACES } from "../types";
import Place from "../../models/place";
import { addPlace } from "../actions/places";
const INITIALSTATE = {
  places: [],
};

export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.image,
        action.payload.address,
        action.payload.coords.lat,
        action.payload.coords.lng
      );
      return {
        places: state.places.concat(newPlace),
      };
    case SET_PLACES:
      return {
        places: action.payload.map(
          (pl) =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )
        ),
      };
    default:
      return state;
  }
};
