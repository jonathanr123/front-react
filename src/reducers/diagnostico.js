import {
    RETRIEVE_DIAGNOSTICOS_EP
  } from "../actions/types";
  
  const initialState = [];
  
  function diagnosticoReducer(diagnosticos = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_DIAGNOSTICOS_EP:
        return payload;
        
      default:
        return diagnosticos;
    }
  };
  
  export default diagnosticoReducer;