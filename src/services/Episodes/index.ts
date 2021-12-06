import { api } from '../api';

interface EpisodesResponse {
  _id: string;
  title: string;
  audioUrl: string;
  description: string;
  releaseDate: string;
  members: string;
  thumbnail: string;
  audioLength: number;
}

type Options = {
  headers: {
    Authorization: string;
  }
}

export default class EpisodesService {
  private options: Options;

  constructor(token: string) {
    this.options = { headers: { Authorization: `Bearer ${token}` } }
  }

  async getMostRecentEpisodes(userId: string): Promise<EpisodesResponse[]> {
    const response = await api.get<EpisodesResponse[]>(`/episodes/${userId}`, this.options)
    return response.data
  }
}

