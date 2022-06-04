import {
    RETRIEVE_ENFERMEDADES,
    CREATE_ENFERMEDAD,
    UPDATE_ENFERMEDAD,
    DELETE_ENFERMEDAD
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

  //Crea una Enfermedad
  export const createEnfermedad = (nombre) => async (dispatch) => {
    try {
      const res = await EnfermedadDataService.create({nombre});
  
      dispatch({
        type: CREATE_ENFERMEDAD,
        payload: res.data,
        
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Actualiza una Enfermedad
  export const updateEnfermedad = (id, data) => async (dispatch) => {
    try {
      const res = await EnfermedadDataService.update(id, data);
  
      dispatch({
        type: UPDATE_ENFERMEDAD,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Elimina una Enfermedad
  export const deleteEnfermedad = (id) => async (dispatch) => {
    try {
      await EnfermedadDataService.delete(id);
  
      dispatch({
        type: DELETE_ENFERMEDAD,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };