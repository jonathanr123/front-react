import {
    RETRIEVE_LOCALIDADES,
  } from "./types";

import LocalidadDataService from "../services/localidad.service";

  export const retrieveLocalidades = () => async (dispatch) => {
    try {
      const res = await LocalidadDataService.getAll();
      console.log(res.data);
      dispatch({
        type: RETRIEVE_LOCALIDADES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };