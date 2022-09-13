import http from "../http-common";

export const direccionRepository = {

    async create(data) {
        let response = await http.post(`/direccion`, data);

        return response;
    },

};