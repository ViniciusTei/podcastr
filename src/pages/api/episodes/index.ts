import { NextApiResponse, NextApiRequest } from "next";
import { parse } from '../../../services/rssparser';
import firestore from '../../../services/firebase';

interface Podcast {
    id: string;
    author: string;
    description: string;
    feed_rss: string;
    image: string;
    last_published: string;
    link: string;
    title: string;
    user: string;
}

interface Episode {
    id: string;
    published: string;
    title: string;
    description: string;
    link: string;
    image: string;
    podcast_id: string;
}

export default async(request: NextApiRequest, response: NextApiResponse) => {
    if(request.method == 'GET') {
        const podcastsRef = firestore.collection('podcasts')
        const podcatsSnapshot = await podcastsRef.get()
        
        if(podcatsSnapshot.empty) {
            return response.status(404).send({
                message: 'Not found',
                data: []
            })
        }
        const podcast: Podcast[] = []
        podcatsSnapshot.forEach(doc => {
            podcast.push({
                id: doc.id,
                ...doc.data() as any
            })
        })
        
        const feed = await parse(podcast[0].feed_rss)

        const episodes: Episode[] = []
        const episodesRef = firestore.collection('episodes')
        const episodesSnapshot = await episodesRef.where('podcast_id', '==', podcast[0].id).get()
        episodesSnapshot.forEach(doc => {
            episodes.push({
                id: doc.id,
                ...doc.data() as any
            })
        })
        // let iterator = 0
        
        // while(new Date(feed.items[iterator].pubDate).getTime() != new Date(podcast[0].last_published).getTime()) {

        //     try {

        //         for (const ep of episodes) {
        //             const episodesRef = firestore.collection('episodes')
        //             await episodesRef.add(ep)
        //         }
                
        //     } catch (error) {
        //         return response.status(500).send({
        //             message: 'Internal Error',
        //             data: error
        //         })
        //     }
            
        // }

        return response.status(200).send({
            message: 'Success',
            data: episodes
        })
    }
}