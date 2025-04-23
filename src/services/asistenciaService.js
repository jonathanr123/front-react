

import http from "../http-common";

export const asistenciaRepository = {
  async getAsistenciaAll() {
    let response = await http.get(`/asistenciataller`); //se conecta directamente con la parte de la url.py

    return response;
  },

  async createAsistencia(data) {
    let response = await http.post(`/asistenciataller`, data);

    return response;
  },

  async updateTaller(id, data) {
    let response = await http.put(`/asistenciataller/${id}`, data);

    return response;
  },

  async updateEncuentro(id, data) {
    let response = await http.put(`/asistenciataller/${id}`, data);

    return response;
  },

  async deleteTaller(id) {
    return await http.delete(`/taller/${id}`);
  },

  async getAsistenciaByEncuentro(idEncuentro) {
    let response = await http.get(`/asistenciataller/encuentro/${idEncuentro}`);
    return response;
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
    return await http.delete(`/encuentro/${id}`);
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


