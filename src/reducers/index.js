//Combina los reducers

import { combineReducers } from "redux";
import persona from "./persona";
import localidad from "./localidad";
import municipio from "./municipio";
import diagnostico from "./diagnostico";
import enfermedad from "./enfermedad";
import evolucion from "./evolucion";
import obrasocial from "./obrasocial";
import medicamento from "./medicamento";
import indicacion from "./indicacion";

export default combineReducers({
  persona,
  localidad,
  municipio,
  enfermedad,
  diagnostico,
  evolucion,
  obrasocial,
  medicamento,
  indicacion
});