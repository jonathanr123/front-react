import {
    RETRIEVE_INDICACION_EP,
    CREATE_INDICACION,
    UPDATE_INDICACION,
    DELETE_INDICACION
  } from "./types";

import IndicacionDataService from "../services/indicacion.service";

  //Trae todos los diagnosticos de una determinada personaEP
  export const retrieveIndicacionEp = (id) => async (dispatch) => {
    try {
      const res = await IndicacionDataService.get(id);
      console.log(res.data);
      dispatch({
        type: RETRIEVE_INDICACION_EP,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //Crea un Indicacion
  export const createIndicacion = (cantidadmiligramos, estavigente, fechaprescripcion, horadetoma, idpersonaep, idmedicamento, borrado) => async (dispatch) => {
    try {
      const res = await IndicacionDataService.create({cantidadmiligramos, estavigente, fechaprescripcion, horadetoma, idpersonaep, idmedicamento, borrado});
  
      dispatch({
        type: CREATE_INDICACION,
        payload: res.data,
        
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Actualiza un Indicacion
  export const updateIndicacion = (id, data) => async (dispatch) => {
    try {
      const res = await IndicacionDataService.update(id, data);
  
      dispatch({
        type: UPDATE_INDICACION,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  //Elimina un Indicacion
  export const deleteIndicacion = (id) => async (dispatch) => {
    try {
      await IndicacionDataService.delete(id);
  
      dispatch({
        type: DELETE_INDICACION,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

