export const cambiarID = (id, nombre) => (dispatch) => {
    try {
      dispatch({type: CAMBIAR, idPersona: id, nombrePersona: nombre});
    } catch (err) {
        console.log(err);
      }
  };

  export const CAMBIAR = "CAMBIAR";

  const initialState = {
      idEpElegido:"",
      nombreEpElegido:""
  }
  
  function globalReducer(global = initialState, action) {
    switch (action.type) {
        case CAMBIAR:
            return {
                ...global,
                idEpElegido:action.idPersona,
                nombreEpElegido:action.nombrePersona,
            };
    }
    return global
  };
  
  export default globalReducer;