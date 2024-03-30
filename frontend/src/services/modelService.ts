import http from "../http-common";

interface iModel{ 
  "id": number
  "name": string; 
  "runtime"?: Date | undefined; 
  "modelMetric": string; 
  "modelPath": string; 
  "trainingLoss": number; 
  "validationLoss": number; 
  "notes": string; 
  "favorite": boolean; 
}

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

  update(id: string, data: iModel) {
    return http.put(`/models/${id}`, data);
  }

  delete(id: string) {
    return http.put(`/models/${id}`);
  }
}

export default new ModelDataService();