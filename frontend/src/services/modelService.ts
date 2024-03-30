import http from "../http-common";

class ModelDataService {
  getAll() {
    return http.get("/models");
  }

  get(id: string) {
    return http.get(`/models/${id}`);
  }

  post() {
    return http.post(`/models`);
  }

  update(id: string) {
    return http.put(`/models/${id}`);
  }

  delete(id: string) {
    return http.put(`/models/${id}`);
  }
}

export default new ModelDataService();