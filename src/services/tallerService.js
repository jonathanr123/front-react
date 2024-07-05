import http from "../http-common";

export const tallerRespository = {
  // service tipo de evento 
  async getTallerAll() {
    let response = await http.get(`/taller`);

    return response;
  },
  async updateTaller(id, data) {
    let response = await http.put(`/taller/${id}`, data);

    return response;
  },

  async createTaller(data) {
    let response = await http.post(`/taller`, data);

    return response;
  },

  async deleteTaller(id) {
    return await http.delete(`/taller/${id}`);
  },

// service de evento 
  async createEvent(data) {
    let response = await http.post(`/evento`, data);

    return response;
  },

  async getEventGestionAll() {
    let response = await http.get(`/evento`);

    return response;
  },
// service de persona 
  async getAll() {
    let response = await http.get(`/persona`);
    return response;
  },
  async getPersonAll() {
    let response = await http.get(`/personaP`);
    return response;
  },  
  async updatePerson(id, data) {
    let response = await http.put(`/persona/${id}`, data);
    return response;
  },
  async deletePerson(id) {
    return await http.delete(`/persona/${id}`);
  }
};