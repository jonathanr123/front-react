import http from "../http-common";

class DiagnosticoDataService {
  get(id) {
    return http.get(`/diagnostico/${id}/personaep`);
    //me trae los diagnosticos de una persona con ep
  }

  create(data) {
    return http.post("/diagnostico", data);
  }

  update(id, data) {
    return http.put(`/diagnostico/${id}`, data);
  }

  delete(id) {
    return http.delete(`/diagnostico/${id}`);
  }

}

export default new DiagnosticoDataService();