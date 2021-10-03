//Combina los reducers

import { combineReducers } from "redux";
import persona from "./persona";
import localidad from "./localidad";
import municipio from "./municipio";
import diagnostico from "./diagnostico"
import enfermedad from "./enfermedad"

export default combineReducers({
  persona,
  localidad,
  municipio,
  enfermedad,
  diagnostico
});