import http from "../http-common";

class IndicacionDataService {
  get(id) {
    return http.get(`/indicacion/${id}/personaep`);
    //me trae las evoluciones de una persona con ep
  }

  create(data) {
    return http.post("/indicacion", data);
  }

  update(id, data) {
    return http.put(`/indicacion/${id}`, data);
  }

  delete(id) {
    return http.delete(`/indicacion/${id}`);
  }

}

export default new IndicacionDataService();