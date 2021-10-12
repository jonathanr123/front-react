import {
    RETRIEVE_OBRASOCIAL_EP
  } from "../actions/types";
  
  const initialState = [];
  
  function obrasocialReducer(obrasociales = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_OBRASOCIAL_EP:
        return payload;
        
      default:
        return obrasociales;
    }
  };
  
  export default obrasocialReducer;