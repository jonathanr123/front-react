import {
    RETRIEVE_MEDICAMENTOS,
  } from "./types";

import MedicamentoDataService from "../services/medicamento.service";

  export const retrieveMedicamento = () => async (dispatch) => {
    try {
      const res = await MedicamentoDataService.getAll();
      console.log(res.data);
      dispatch({
        type: RETRIEVE_MEDICAMENTOS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };