import axios, { AxiosInstance } from 'axios'

export default class Api {
    public api: AxiosInstance

    constructor(token?: string) {
        if (token) {
            this.api = axios.create({
                baseURL: 'http://165.232.126.168/v1',
                headers: { Authorization: `Bearer ${token}` }
            })
        } else {
            this.api = axios.create({
                baseURL: 'http://165.232.126.168/v1',
            })
        }
        
    }
}

