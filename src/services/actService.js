import http from "../http-common";

export const actiRepository = {
    async getAll() {
        let response = await http.get(`/actividad`);

        return response;
    },

    async create(data) {
        let response = await http.post(`/actividad`, data);

        return response;
    },

    async update(id, data) {
        let response = await http.put(`/actividad/${id}`, data);

        return response;
    },

    async delete(id) {
        let response = await http.delete(`/actividad/${id}`);

        return response;
    }

};
