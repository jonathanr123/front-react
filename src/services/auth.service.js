import http from "../http-common";

const resource = "auth";

export const authRepository = {
  async signIn(data) {
    let response = await http.post(`${resource}`, data);

    return response;
  },

  async signUp(data) {
    let response = await http.post(`${resource}/signup`, data);

    return response;
  },

  async logout() {
    let response = await http.get(`${resource}/logout`);

    return response;
  },

  async userData() {
    let response = await http.get(`${resource}/user`);

    return response;
  },
};
