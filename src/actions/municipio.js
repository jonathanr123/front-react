import {
    RETRIEVE_MUNICIPIOS,
  } from "./types";

import MunicipioDataService from "../services/municipio.service";

  export const retrieveMunicipios = () => async (dispatch) => {
    try {
      const res = await MunicipioDataService.getAll();
      console.log(res.data);
      dispatch({
        type: RETRIEVE_MUNICIPIOS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };