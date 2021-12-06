import { api } from './api';

type Options = {
  headers: {
    Authorization: string;
  }
}

export default class PodcastService {
  private options: Options

  constructor(token: string) {
    this.options = { headers: { Authorization: `Bearer ${token}` } }
  }

  async createPodcast(userId: string, feed_url: string) {
    const response = await api.post(`/podcasts/${userId}`, {feed_url: feed_url}, this.options)

    return response.data
  }
}