import http from "../http-common";

export const medicamentoRepository = {

    async getAll() {
        let response = await http.get(`/medicamento`);

        return response;
    },

    async create(data) {
        let response = await http.post(`/medicamento`, data);

        return response;
    },

    async update(id, data) {
        let response = await http.put(`/medicamento/${id}`, data);

        return response;
    },

    async delete(id) {
        let response = await http.delete(`/medicamento/${id}`);

        return response;
    }

};
