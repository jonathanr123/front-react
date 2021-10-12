import {
    CREATE_PERSONA_EP,
    RETRIEVE_PACIENTES
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


  export const retrievePacientes = () => async (dispatch) => {
    try {
      const res = await PersonaEpDataService.getPacientes();
      console.log(res.data);
      dispatch({
        type: RETRIEVE_PACIENTES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };