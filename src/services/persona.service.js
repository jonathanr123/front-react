import http from "../http-common";

class PersonaDataService {

  create(data) {
    console.log(data);
    return http.post("/persona", data);
  }
}

export default new PersonaDataService();