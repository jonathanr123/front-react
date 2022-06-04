import http from "../http-common";

class OSDataService {
  get(id) {
    return http.get(`/os/${id}/personaep`);
    //me trae las evoluciones de una persona con ep
  }

  create(data) {
    return http.post("/os", data);
  }

  update(id, data) {
    return http.put(`/os/${id}`, data);
  }

  delete(id) {
    return http.delete(`/os/${id}`);
  }

}

export default new OSDataService();