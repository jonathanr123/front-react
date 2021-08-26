import http from "../http-common";

class MunicipioDataService {
  getAll() {
    return http.get("/municipio");
  }
}

export default new MunicipioDataService();