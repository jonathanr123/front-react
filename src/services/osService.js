import http from "../http-common";

export const osRepository = {

    //me trae la lista de obra sociales de una persona con ep
    async get(id) {
        let response = await http.get(`/os/${id}/personaep`);

        return response;
    },

    async create(data) {
        let response = await http.post(`/os`, data);

        return response;
    },

    async update(id, data) {
        let response = await http.put(`/os/${id}`, data);

        return response;
    },

    async delete(id) {
        let response = await http.delete(`/os/${id}`);

        return response;
    }

};