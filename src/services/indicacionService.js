import http from "../http-common";

export const indicacionRepository = {

    //me trae la lista de indicaciones de una persona con ep
    async get(id) {
        let response = await http.get(`/indicacion/${id}/personaep`);

        return response;
    },

    async create(data) {
        let response = await http.post(`/indicacion`, data);

        return response;
    },

    async update(id, data) {
        let response = await http.put(`/indicacion/${id}`, data);

        return response;
    },

    async delete(id) {
        let response = await http.delete(`/indicacion/${id}`);

        return response;
    }

};