import {
    CREATE_PERSONA,
  } from "../actions/types";
  
  const initialState = [];
  
  function personaReducer(personas = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_PERSONA:
        return [...personas, payload];
  
      default:
        return personas;
    }
  };
  
  export default personaReducer;