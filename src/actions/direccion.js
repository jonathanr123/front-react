import {
    CREATE_DIRECCION
  } from "./types";
  
  import DireccionDataService from "../services/direccion.service";
  
  export const createDireccion = (calle, departamento, numero, piso, localidad_idlocalidad) => async (dispatch) => {
    try {
      const res = await DireccionDataService.create({calle, departamento, numero, piso, localidad_idlocalidad });
  
      dispatch({
        type: CREATE_DIRECCION,
        payload: res.data,
        
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };