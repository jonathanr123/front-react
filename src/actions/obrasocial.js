import {
    RETRIEVE_OBRASOCIAL_EP,
    CREATE_OBRASOCIAL,
    UPDATE_OBRASOCIAL,
    DELETE_OBRASOCIAL
  } from "./types";

import ObraSocialDataService from "../services/obrasocial.service";

  //Trae todos las obras sociales de una determinada personaEP
  export const retrieveObraSocialEp = (id) => async (dispatch) => {
    try {
      const res = await ObraSocialDataService.get(id);
      console.log(res.data);
      dispatch({
        type: RETRIEVE_OBRASOCIAL_EP,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Crea una ObraSocial
  export const createObraSocial = (nombre, esestatal, idpersonaep) => async (dispatch) => {
    try {
      const res = await ObraSocialDataService.create({nombre, esestatal, idpersonaep});
  
      dispatch({
        type: CREATE_OBRASOCIAL,
        payload: res.data,
        
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Actualiza una ObraSocial
  export const updateObraSocial = (id, data) => async (dispatch) => {
    try {
      const res = await ObraSocialDataService.update(id, data);
  
      dispatch({
        type: UPDATE_OBRASOCIAL,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Elimina una ObraSocial
  export const deleteObraSocial = (id) => async (dispatch) => {
    try {
      await ObraSocialDataService.delete(id);
  
      dispatch({
        type: DELETE_OBRASOCIAL,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

