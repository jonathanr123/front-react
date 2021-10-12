import {
    RETRIEVE_ENFERMEDADES,
  } from "../actions/types";
  
  const initialState = [];
  
  function enfermedadReducer(enfermedades = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_ENFERMEDADES:
        return payload;
        
      default:
        return enfermedades;
    }
  };
  
  export default enfermedadReducer;