import {
    RETRIEVE_EVOLUCION_EP,
    CREATE_EVOLUCION,
    UPDATE_EVOLUCION,
    DELETE_EVOLUCION
  } from "./types";

import EvolucionDataService from "../services/evolucion.service";

  //Trae todos las evoluciones de una determinada personaEP
  export const retrieveEvolucionEp = (id) => async (dispatch) => {
    try {
      const res = await EvolucionDataService.get(id);
      console.log(res.data);
      dispatch({
        type: RETRIEVE_EVOLUCION_EP,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Crea una Evolucion
  export const createEvolucion = (escalaevolucion, fecha, idpersonaep, borrado) => async (dispatch) => {
    try {
      const res = await EvolucionDataService.create({escalaevolucion, fecha, idpersonaep, borrado});
  
      dispatch({
        type: CREATE_EVOLUCION,
        payload: res.data,
        
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Actualiza una Evolucion
  export const updateEvolucion = (id, data) => async (dispatch) => {
    try {
      const res = await EvolucionDataService.update(id, data);
  
      dispatch({
        type: UPDATE_EVOLUCION,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Elimina una Evolucion
  export const deleteEvolucion = (id) => async (dispatch) => {
    try {
      await EvolucionDataService.delete(id);
  
      dispatch({
        type: DELETE_EVOLUCION,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

