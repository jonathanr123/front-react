import {
    RETRIEVE_MUNICIPIOS,
  } from "./types";

import {municipioRepository} from "../services/municipio.service";

  export const retrieveMunicipios = () => async (dispatch) => {
    try {
      const res = await municipioRepository.getAll();
      console.log(res.data);
      dispatch({
        type: RETRIEVE_MUNICIPIOS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };