import http from "../http-common";

export const eventRespository = {
  async getEventAll() {
    let response = await http.get(`/tipoevento`);

    return response;
  },
  async updateTypeEvent(id, data) {
    let response = await http.put(`/tipoevento/${id}`, data);

    return response;
  },

  async createTypeEvent(data) {
    let response = await http.post(`/tipoevento`, data);

    return response;
  },

  async deleteTypeEvent(id) {
    return await http.delete(`/tipoevento/${id}`);
  },


  async createEvent(data) {
    let response = await http.post(`/evento`, data);

    return response;
  },

  async getEventGestionAll() {
    let response = await http.get(`/evento`);

    return response;
  },

  async getAll() {
    let response = await http.get(`/personaP`);
    return response;
  },
};