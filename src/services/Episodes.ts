import Api from './api';

type Episode = {
  _id: string;
  title: string;
  audioUrl: string;
  description: string;
  releaseDate: string;
  members: string;
  thumbnail: string;
  audioLength: number;
}
interface EpisodesResponse {
  data: Array<Episode>
  page: number
  pageSize: number
  totalPages: number
}

export default class EpisodesService extends Api {

  constructor(token: string) {
    super(token)
  }

  async getMostRecentEpisodes(userId: string): Promise<EpisodesResponse> {
    const response = await this.api.get<EpisodesResponse>(`/episodes/${userId}`)
    return response.data
  }

  async getEpisodes(userId: string, page: number): Promise<EpisodesResponse> {
    const response = await this.api.get<EpisodesResponse>(`/episodes/${userId}?page=${page}`)
    return response.data
  }

  async getOneEpisodeById(userId: string, episodeId: string): Promise<Episode> {
    const response = await this.api.get<Episode>(`/episodes/${userId}/detail?episodeId=${episodeId}`)
    return response.data
  }
}

