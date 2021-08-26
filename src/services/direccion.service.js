import http from "../http-common";

class DireccionDataService {

  create(data) {
    console.log(data);
    return http.post("/direccion", data);
  }
}

export default new DireccionDataService();