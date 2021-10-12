import {
    RETRIEVE_INDICACION_EP,
  } from "../actions/types";
  
  const initialState = [];
  
  function indicacionReducer(indicaciones = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_INDICACION_EP:
        return payload;
        
      default:
        return indicaciones;
    }
  };
  
  export default indicacionReducer;