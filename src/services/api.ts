interface Response {
  message: string
}

interface Episode {
  id: string
  title: string
  members: string
  published: string
  thumbnail: string
  description: string
  file: string
}

interface EpisodeResponse extends Response {
  data: Episode[]
}

export class HttpService {
  private base_url: string;
  
  constructor() {
    this.base_url = 'https://podclass.herokuapp.com';
  }

  async fetchEpisodes(): Promise<EpisodeResponse> {
  
    const myShowHeaders = new Headers({
      "Content-type": "application/json",
    });
    
    const initShowFetch = {
      method: 'GET',
      headers: myShowHeaders,
    }
   
    return fetch(`${this.base_url}/episodes`, initShowFetch).then(response => response.json())
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


