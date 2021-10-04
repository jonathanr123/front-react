import {
    RETRIEVE_EVOLUCION_EP
  } from "../actions/types";
  
  const initialState = [];
  
  function evolucionReducer(evoluciones = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_EVOLUCION_EP:
        return payload;
        
      default:
        return evoluciones;
    }
  };
  
  export default evolucionReducer;