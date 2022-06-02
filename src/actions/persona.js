import {
    CREATE_PERSONA
  } from "./types";
  
  import PersonaDataService from "../services/persona.service";
  
  export const createPersona = (nombre, apellido, telefono, iddireccion) => async (dispatch) => {
    try {
      const res = await PersonaDataService.create({nombre, apellido, telefono, iddireccion });
  
      dispatch({
        type: CREATE_PERSONA,
        payload: res.data,
        
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };