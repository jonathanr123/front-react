import http from "../http-common";

export const userRepository = {
  async getUsers() {
    let response = await http.get(`/users`);

    return response;
  }

};
