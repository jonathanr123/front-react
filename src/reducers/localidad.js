import {
    RETRIEVE_LOCALIDADES,
  } from "../actions/types";
  
  const initialState = [];
  
  function localidadReducer(localidades = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_LOCALIDADES:
        return payload;
        
      default:
        return localidades;
    }
  };
  
  export default localidadReducer;