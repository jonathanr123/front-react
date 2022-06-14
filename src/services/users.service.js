import http from "../http-common";

export const userRepository = {
  async getUsers() {
    let response = await http.get(`/users`);

    return response;
  },

  async updateUser(data) {
    let response = await http.put(`/update_user`, data);

    return response;
  },

  async createUser(data) {
    let response = await http.post(`/create_user`, data);

    return response;
  }

};
