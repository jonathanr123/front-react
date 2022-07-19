import http from "../http-common";

export const obrasocialRepository = {

    async getAll() {
        let response = await http.get(`/obrasocial`);

        return response;
    },

    async create(data) {
        let response = await http.post(`/obrasocial`, data);

        return response;
    },

    async update(id, data) {
        let response = await http.put(`/obrasocial/${id}`, data);

        return response;
    },

    async delete(id) {
        let response = await http.delete(`/obrasocial/${id}`);

        return response;
    }

};
