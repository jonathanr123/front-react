import http from "../http-common";

class PersonaEpDataService {

  create(data) {
    console.log(data);
    return http.post("/personaEp", data);
  }

  getAll() {
    return http.get("/personaEp");
  }

  getPacientes() {
    return http.get("/personaP");
  }

}

export default new PersonaEpDataService();