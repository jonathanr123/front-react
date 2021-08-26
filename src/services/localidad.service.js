import http from "../http-common";

class LocalidadDataService {
  getAll() {
    return http.get("/localidad");
  }
}

export default new LocalidadDataService();