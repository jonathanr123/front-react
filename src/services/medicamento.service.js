import http from "../http-common";

class MedicamentoDataService {
  getAll() {
    return http.get("/medicamento");
  }

  create(data) {
    return http.post("/medicamento", data);
  }

  update(id, data) {
    return http.put(`/medicamento/${id}`, data);
  }

  delete(id) {
    return http.delete(`/medicamento/${id}`);
  }
}

export default new MedicamentoDataService();