import http from "../http-common";

class EnfermedadDataService {
  getAll() {
    return http.get("/enfermedad");
  }

  create(data) {
    return http.post("/enfermedad", data);
  }

  update(id, data) {
    return http.put(`/enfermedad/${id}`, data);
  }

  delete(id) {
    return http.delete(`/enfermedad/${id}`);
  }
}

export default new EnfermedadDataService();