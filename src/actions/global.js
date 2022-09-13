import { CAMBIAR } from "./types";

export const cambiarID = (id, nombre) => (dispatch) => {
  try {
    dispatch({ type: CAMBIAR, idPersona: id, nombrePersona: nombre });
  } catch (err) {
    console.log(err);
  }
};
