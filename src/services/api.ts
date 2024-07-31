import axios, { AxiosError } from 'axios'
import { AppError } from '../utils/AppError'


const api = axios.create({
  baseURL: 'http://api.lusati.com.br/diamante-api/mobile',

})

api.interceptors.response.use(response => response, (error: AxiosError) => {
  if (error && error.message) {
    return Promise.reject(new AppError(error.message))

  } else {
    return Promise.reject(error)

  }
})

export { api }