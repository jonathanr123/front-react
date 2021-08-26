import {
    RETRIEVE_MUNICIPIOS,
  } from "../actions/types";
  
  const initialState = [];
  
  function municipioReducer(municipios = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_MUNICIPIOS:
        return payload;
        
      default:
        return municipios;
    }
  };
  
  export default municipioReducer;