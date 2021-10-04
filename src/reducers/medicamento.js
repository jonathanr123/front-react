import {
    RETRIEVE_MEDICAMENTOS,
  } from "../actions/types";
  
  const initialState = [];
  
  function medicamentoReducer(medicamentos = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_MEDICAMENTOS:
        return payload;
        
      default:
        return medicamentos;
    }
  };
  
  export default medicamentoReducer;