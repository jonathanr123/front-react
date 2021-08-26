//Combina los reducers

import { combineReducers } from "redux";
import persona from "./persona";
import localidad from "./localidad";
import municipio from "./municipio";

export default combineReducers({
  persona,
  localidad,
  municipio
});