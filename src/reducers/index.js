//Combina los reducers

import { combineReducers } from "redux";
import persona from "./persona";
import localidad from "./localidad";
import municipio from "./municipio";
import evolucion from "./evolucion";
import obrasocial from "./obrasocial";
import os from "./os";
import medicamento from "./medicamento";
import indicacion from "./indicacion";
import global from "./global";
import paciente from "./persona-ep";
import AuthReducer from "./authReducer";

export default combineReducers({
  persona,
  localidad,
  municipio,
  evolucion,
  obrasocial,
  os,
  medicamento,
  indicacion,
  paciente,
  auth: AuthReducer,
  global
});