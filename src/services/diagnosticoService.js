import http from "../http-common";

export const diagnosticoRepository = {

    //me trae los diagnosticos de una persona con ep
    async get(id) {
        let response = await http.get(`/diagnostico/${id}/personaep`);

        return response;
    },

    async create(data) {
        let response = await http.post(`/diagnostico`, data);

        return response;
    },

    async update(id, data) {
        let response = await http.put(`/diagnostico/${id}`, data);

        return response;
    },

    async delete(id) {
        let response = await http.delete(`/diagnostico/${id}`);

        return response;
    }

};
