import http from "../http-common";

const resource = "auth";

export const authRepository = {
  async login(data) {
    let response = await http.post(`/login`, data);

    return response;
  },

  async signUp(data) {
    let response = await http.post(`${resource}/signup`, data);

    return response;
  },

  logout() {
    localStorage.removeItem("auth");
  },

  async userData() {
    let response = await http.get(`${resource}/user`);

    return response;
  },
};
