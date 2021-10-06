import {
    RETRIEVE_PACIENTES,
  } from "../actions/types";
  
  const initialState = [];
  
  function personaEpReducer(pacientes = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_PACIENTES:
        return payload;
        
      default:
        return pacientes;
    }
  };
  
  export default personaEpReducer;