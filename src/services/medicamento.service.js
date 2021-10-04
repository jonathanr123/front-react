import http from "../http-common";

class MedicamentoDataService {
  getAll() {
    return http.get("/medicamento");
  }
}

export default new MedicamentoDataService();