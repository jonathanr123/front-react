//Combina los reducers

import { combineReducers } from "redux";
import persona from "./persona";
import localidad from "./localidad";
import municipio from "./municipio";
import global from "./global";
import paciente from "./persona-ep";
import AuthReducer from "./authReducer";

export default combineReducers({
  persona,
  localidad,
  municipio,
  paciente,
  auth: AuthReducer,
  global
});