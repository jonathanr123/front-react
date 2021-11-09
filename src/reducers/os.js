import {
    RETRIEVE_OS_EP
  } from "../actions/types";
  
  const initialState = [];
  
  function osReducer(osociales = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_OS_EP:
        return payload;
        
      default:
        return osociales;
    }
  };
  
  export default osReducer;