import axios, { AxiosInstance } from 'axios'
import { getAuthTokenFromUser } from './utils';
export class HttpRequest {
  private http: AxiosInstance

  constructor() {
    this.http = axios.create({
      baseURL: import.meta.env.DEV
        ? 'http://localhost:3000/'
        : import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json'
      },
      
    })

    this.setupInterceptors()
  }

  setupInterceptors() {
    this.http.interceptors.request.use(
      (config) => {
        if (!config.url?.includes('/login')) {
          const { access_token, refresh_token } = getAuthTokenFromUser()

          if (access_token) {
            config.headers.Authorization = `Bearer ${access_token} ${refresh_token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  async get(url: string) {
    const response = await this.http.get(url)
    return response.data
  }

  async post(url: string, data?: unknown) {
    const response = await this.http.post(url, data)
    return response.data
  }

  async patch(url: string, data: unknown) {
    const response = await this.http.patch(url, data)
    return response.data
  }

  async delete(url: string) {
    const response = await this.http.delete(url)
    return response.data
  }
}
