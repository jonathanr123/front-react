import {
    RETRIEVE_ENFERMEDADES,
  } from "./types";

import EnfermedadDataService from "../services/enfermedad.service";

  export const retrieveEnfermedad = () => async (dispatch) => {
    try {
      const res = await EnfermedadDataService.getAll();
      console.log(res.data);
      dispatch({
        type: RETRIEVE_ENFERMEDADES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };