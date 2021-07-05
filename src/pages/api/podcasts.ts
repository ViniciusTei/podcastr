import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/client';
import { parse } from "../../services/rssparser";
import firebase from '../../services/firebase';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    if(request.method === 'POST') {
        const session = await getSession({ req: request })

        if(!session) {
            return response.status(400).json({error: "Not logged in"})
        }
        
        const { feed_url } = request.body;
        const feed = await parse(feed_url)

        const userRef = firebase.collection('users')
        const userSnapshot = await userRef.where('email', '==', session.user.email).get()
        
        let userId = ''
        userSnapshot.forEach(doc => userId = doc.id)

        const podcastRef = firebase.collection('podcasts')
        const snapshot = await podcastRef.where('feed_rss', '==', feed_url).get()
        
        if(!snapshot.empty) {
            response.status(400).json({error: "Podcast alredy exists!"})
        }

        const podcast = {
            author: feed.itunes.author,
            title: feed.title,
            image: typeof feed.image === 'string' ? feed.image : feed.image.url,
            description: feed.description,
            last_published: feed.items[0].isoDate,
            feed_rss: feed_url,
            link: feed.link,
            user: userId
        }

        const podcastResponse = await podcastRef.add(podcast)
        
        const episodes = feed.items.map(item => {
            return {
                published: item.isoDate,
                title: item.title! ,
                description: item.contentSnippet || '',
                link: item.enclosure!.url,
                image: item.itunes.image,
                podcast_id: podcastResponse.id
            }
        })

        for (const ep of episodes) {
            const episodesRef = firebase.collection('episodes')
            await episodesRef.add(ep)
        }

        response.status(200).json({
            data: {
                ...podcast,
                episodes
            }
        })
    }
}