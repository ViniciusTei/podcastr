import { api } from '../api';

interface EpisodesResponse {
  data: Array<{
    _id: string;
    title: string;
    audioUrl: string;
    description: string;
    releaseDate: string;
    members: string;
    thumbnail: string;
    audioLength: number;
  }>
  page: number
  pageSize: number
  totalPages: number
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

  async getMostRecentEpisodes(userId: string): Promise<EpisodesResponse> {
    const response = await api.get<EpisodesResponse>(`/episodes/${userId}`, this.options)
    return response.data
  }

  async getEpisodes(userId: string, page: number): Promise<EpisodesResponse> {
    const response = await api.get(`/episodes/${userId}?page=${page}`, this.options)
    return response.data
  }
}

