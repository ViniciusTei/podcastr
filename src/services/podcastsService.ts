import Api from './api';

export default class PodcastService extends Api{

  constructor(token: string) {
    super(token)
  }

  async createPodcast(userId: string, feed_url: string) {
    const response = await this.api.post(`/podcasts/${userId}`, {rssFeed: feed_url})

    return response.data
  }
}