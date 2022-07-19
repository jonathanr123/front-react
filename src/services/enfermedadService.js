import http from "../http-common";

export const enfermedadRepository = {

    async getAll() {
        let response = await http.get(`/enfermedad`);

        return response;
    },

    async create(data) {
        let response = await http.post(`/enfermedad`, data);

        return response;
    },

    async update(id, data) {
        let response = await http.put(`/enfermedad/${id}`, data);

        return response;
    },

    async delete(id) {
        let response = await http.delete(`/enfermedad/${id}`);

        return response;
    }

};
