import http from "../http-common";

export const encuentroRepository = {
  // service taller 
  async getEncuentroAll() {
    let response = await http.get(`/encuentro`);

    return response;
  },
  async updateTaller(id, data) {
    let response = await http.put(`/taller/${id}`, data);

    return response;
  },

  async updateEncuentro(id, data) {
    let response = await http.put(`/encuentro/${id}`, data);

    return response;
  },

  async createTaller(data) {
    let response = await http.post(`/taller`, data);

    return response;
  },

  async deleteTaller(id) {
    return await http.delete(`/taller/${id}`);
  },

// service de encuentro 
  async createEncuentro(data) {
    let response = await http.post(`/encuentro`, data);

    return response;
  },

  async getEncuentroGestionAll() {
    let response = await http.get(`/encuentro`);

    return response;
  },

  

  async deleteEncuentro(id) {
    let response = await http.delete(`/encuentro/${id}`);

    return response;
  },

/* service de persona 
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
  */
};
