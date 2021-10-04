import http from "../http-common";

class ObraSocialDataService {
  get(id) {
    return http.get(`/obrasocial/${id}/personaep`);
    //me trae las evoluciones de una persona con ep
  }

  create(data) {
    return http.post("/obrasocial", data);
  }

  update(id, data) {
    return http.put(`/obrasocial/${id}`, data);
  }

  delete(id) {
    return http.delete(`/obrasocial/${id}`);
  }

}

export default new ObraSocialDataService();