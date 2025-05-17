import axios from 'axios'
import type { App, Plugin } from 'vue'

const Axios: Plugin = {
  install: (app: App, options: any) => {
    const instanceAxios = axios.create({
      baseURL: ' https://pokeapi.co/api/v2',
      timeout: 10000,
    })
    instanceAxios.interceptors.request.use(
      (request) => {
        return request
      },
      (error) => {
        return Promise.reject(error)
      },
    )
    instanceAxios.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        return Promise.reject(error)
      },
    )
    app.provide('axios', instanceAxios)
  },
}

export default Axios
