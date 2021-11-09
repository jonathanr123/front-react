import {
    RETRIEVE_OBRASOCIAL
  } from "../actions/types";
  
  const initialState = [];
  
  function obrasocialReducer(obrasociales = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_OBRASOCIAL:
        return payload;
        
      default:
        return obrasociales;
    }
  };
  
  export default obrasocialReducer;