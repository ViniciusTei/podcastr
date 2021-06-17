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
  avaliation?: number
}

interface EpisodeResponse extends Response {
  data: Episode[]
}

export class HttpService {
  private base_url: string;
  private myShowHeaders = new Headers({
    "Content-type": "application/json",
  });
  
  constructor() {
    this.base_url = process.env.PRODUCTION ? 'https://podclass.herokuapp.com' : 'http://127.0.0.1:5000';
  }

  async fetchEpisodes(): Promise<EpisodeResponse> {
      
    const initShowFetch = {
      method: 'GET',
      headers: this.myShowHeaders,
    }
   
    return 
  }
  
  async fetchEpisodeById(id: string | string[]): Promise<EpisodeResponse> {

    const initShowFetch = {
      method: 'GET',
      headers: this.myShowHeaders,
    }
   
    return null
  }

  async postAvaliation(rate: number, episodeId: string) {
    const body = {
      episode_id: episodeId,
      rate
    }
    
    const initShowFetch = {
      method: 'POST',
      headers: this.myShowHeaders,
      body: JSON.stringify(body)
    }

    return []
  }

}


