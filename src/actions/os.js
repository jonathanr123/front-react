import {
    RETRIEVE_OS_EP,
    CREATE_OS,
    UPDATE_OS,
    DELETE_OS
  } from "./types";

import OSDataService from "../services/os.service";

  //Trae todos las obras sociales de una determinada personaEP
  export const retrieveOSEp = (id) => async (dispatch) => {
    try {
      const res = await OSDataService.get(id);
      console.log(res.data);
      dispatch({
        type: RETRIEVE_OS_EP,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Crea una ObraSocial
  export const createOS = (idpersonaep, idobrasocial, borrado) => async (dispatch) => {
    try {
      const res = await OSDataService.create({idpersonaep, idobrasocial, borrado});
  
      dispatch({
        type: CREATE_OS,
        payload: res.data,
        
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Actualiza una ObraSocial
  export const updateOS = (id, data) => async (dispatch) => {
    try {
      const res = await OSDataService.update(id, data);
  
      dispatch({
        type: UPDATE_OS,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Elimina una ObraSocial
  export const deleteOS = (id) => async (dispatch) => {
    try {
      await OSDataService.delete(id);
  
      dispatch({
        type: DELETE_OS,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

