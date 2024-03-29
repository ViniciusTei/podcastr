import axios, { AxiosInstance } from 'axios'

export default class Api {
    public api: AxiosInstance

    constructor(token?: string) {
        if (token) {
            this.api = axios.create({
                baseURL: 'https://podclass-apii-3fedvep5fq-rj.a.run.app/v1',
                headers: { Authorization: `Bearer ${token}` }
            })
        } else {
            this.api = axios.create({
                baseURL: 'https://podclass-apii-3fedvep5fq-rj.a.run.app/v1',
            })
        }
        
    }
}

