import {
    CREATE_PERSONA_EP
  } from "./types";
  
  import PersonaEpDataService from "../services/persona-ep.service";
  
  export const createPersonaEp = (escolaridadcompleta, fechainicio, fechanacimiento, maximaescolaridadalcanzada, sexo, tieneacompanante, tienecuidador, vivesolo, ocupacionprevia, ocupacionactual, persona_idpersona, idreferente) => async (dispatch) => {
    try {
      const res = await PersonaEpDataService.create({escolaridadcompleta, fechainicio, fechanacimiento, maximaescolaridadalcanzada, sexo, tieneacompanante, tienecuidador, vivesolo, ocupacionprevia, ocupacionactual, persona_idpersona, idreferente });
  
      dispatch({
        type: CREATE_PERSONA_EP,
        payload: res.data,
        
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };