import http from "../http-common";

class EnfermedadDataService {
  getAll() {
    return http.get("/enfermedad");
  }
}

export default new EnfermedadDataService();