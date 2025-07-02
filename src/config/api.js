
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

class Api {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async get(params = {}) {
    try {
      const res = await instance.get(this.endpoint, { params });
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  async getById(id) {
    try {
      const res = await instance.get(`${this.endpoint}/${id}`);
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  // POST (e.g., create)
  async post(data = {}) {
    try {
      const res = await instance.post(this.endpoint, data);
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  // PUT (e.g., update)
  async put(id, data = {}) {
    try {
      const res = await instance.put(`${this.endpoint}/${id}`, data);
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  // DELETE
  async delete(id) {
    try {
      const res = await instance.delete(`${this.endpoint}/${id}`);
      return res.data;
    } catch (err) {
      this.handleError(err);
    }
  }

  handleError(error) {
    console.error(`[API Error]: ${error.message}`);
    throw error?.response?.data || { message: "Unexpected error occurred." };
  }
}

export default Api;
