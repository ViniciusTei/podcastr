
export class HttpService {
  private base_url: string;
  
  constructor() {
    this.base_url = 'https://podclass.herokuapp.com';
  }

  async fetchEpisodes() {
  
    const myShowHeaders = new Headers({
      "Content-type": "application/json",
    });
    
    const initShowFetch = {
      method: 'GET',
      headers: myShowHeaders,
    }
   
    return fetch(`${this.base_url}/episodes`, initShowFetch)
  }
  
  async fetchEpisodeById(id: string | string[]) {

    const myShowHeaders = new Headers({
      "Content-type": "application/json",
    });

    const initShowFetch = {
      method: 'GET',
      headers: myShowHeaders,
    }
   
    return fetch(`${this.base_url}/episodes/${id}`, initShowFetch)
  }

}


