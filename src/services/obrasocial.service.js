import http from "../http-common";

class ObraSocialDataService {
  getAll() {
    return http.get("/obrasocial");
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