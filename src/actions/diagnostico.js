import {
    RETRIEVE_DIAGNOSTICOS_EP,
    CREATE_DIAGNOSTICO,
    UPDATE_DIAGNOSTICO,
    DELETE_DIAGNOSTICO
  } from "./types";

import DiagnosticoDataService from "../services/diagnostico.service";

  //Trae todos los diagnosticos de una determinada personaEP
  export const retrieveDiagnosticosEp = (id) => async (dispatch) => {
    try {
      const res = await DiagnosticoDataService.get(id);
      console.log(res.data);
      dispatch({
        type: RETRIEVE_DIAGNOSTICOS_EP,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Crea un Diagnostico
  export const createDiagnostico = (fecha, idpersonaep, idenfermedad, borrado) => async (dispatch) => {
    try {
      const res = await DiagnosticoDataService.create({fecha, idpersonaep, idenfermedad, borrado});
  
      dispatch({
        type: CREATE_DIAGNOSTICO,
        payload: res.data,
        
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Actualiza un Diagnostico
  export const updateDiagnostico = (id, data) => async (dispatch) => {
    try {
      const res = await DiagnosticoDataService.update(id, data);
  
      dispatch({
        type: UPDATE_DIAGNOSTICO,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Elimina un Diagnostico
  export const deleteDiagnostico = (id) => async (dispatch) => {
    try {
      await DiagnosticoDataService.delete(id);
  
      dispatch({
        type: DELETE_DIAGNOSTICO,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

