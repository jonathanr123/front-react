import http from "../http-common";

export const evolucionRepository = {

    //me trae las evoluciones de una persona con ep
    async get(id) {
        let response = await http.get(`/evolucion/${id}/personaep`);

        return response;
    },

    async create(data) {
        let response = await http.post(`/evolucion`, data);

        return response;
    },

    async update(id, data) {
        let response = await http.put(`/evolucion/${id}`, data);

        return response;
    },

    async delete(id) {
        let response = await http.delete(`/evolucion/${id}`);

        return response;
    }

};
