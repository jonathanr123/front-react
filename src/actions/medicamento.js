import {
    RETRIEVE_MEDICAMENTOS,
    CREATE_MEDICAMENTO,
    UPDATE_MEDICAMENTO,
    DELETE_MEDICAMENTO
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

  //Crea una Medicamento
  export const createMedicamento = (nombre, esantiparkinsoniano) => async (dispatch) => {
    try {
      const res = await MedicamentoDataService.create({nombre, esantiparkinsoniano});
  
      dispatch({
        type: CREATE_MEDICAMENTO,
        payload: res.data,
        
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Actualiza una Medicamento
  export const updateMedicamento = (id, data) => async (dispatch) => {
    try {
      const res = await MedicamentoDataService.update(id, data);
  
      dispatch({
        type: UPDATE_MEDICAMENTO,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Elimina una Medicamento
  export const deleteMedicamento = (id) => async (dispatch) => {
    try {
      await MedicamentoDataService.delete(id);
  
      dispatch({
        type: DELETE_MEDICAMENTO,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };