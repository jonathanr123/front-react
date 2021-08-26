import http from "../http-common";

class PersonaEpDataService {

  create(data) {
    console.log(data);
    return http.post("/personaEp", data);
  }
}

export default new PersonaEpDataService();