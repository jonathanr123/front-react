import http from "../http-common";

class EvolucionDataService {
  get(id) {
    return http.get(`/evolucion/${id}/personaep`);
    //me trae las evoluciones de una persona con ep
  }

  create(data) {
    return http.post("/evolucion", data);
  }

  update(id, data) {
    return http.put(`/evolucion/${id}`, data);
  }

  delete(id) {
    return http.delete(`/evolucion/${id}`);
  }

}

export default new EvolucionDataService();