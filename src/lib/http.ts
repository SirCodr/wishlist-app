import axios, { AxiosInstance } from 'axios'
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
  }

  async get(url: string) {
    const response = await this.http.get(url)
    return response.data
  }

  async post(url: string, data?: unknown) {
    const response = await this.http.post(url, data)
    return response.data
  }
}
