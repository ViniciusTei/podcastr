import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://165.232.126.168/v1'
})

