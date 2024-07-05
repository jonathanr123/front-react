import http from "../http-common";

export const actividadRealizadaRepository = {

    //me trae la lista de actividades de un encuentro
    async get(id) {
        let response = await http.get(`/actividadrealizada/${id}/actividades`);

        return response;
    },
  

    async create(data) {
        let response = await http.post(`/actividadrealizada`, data);

        return response;
    },

    async update(id, data) {
        let response = await http.put(`/os/${id}`, data);

        return response;
    },

    async delete(id) {
        let response = await http.delete(`/actividadrealizada/${id}`);

        return response;
    }

};