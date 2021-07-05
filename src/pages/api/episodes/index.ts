import { NextApiResponse, NextApiRequest } from "next";
import { parse } from '../../../services/rssparser';
import firestore from '../../../services/firebase';
import { getSession } from 'next-auth/client';

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
    published: any;
    title: string;
    description: string;
    link: string;
    image: string;
    podcast_id: string;
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const session = await getSession({req: request})
    
    if(!session) {
        return response.status(400).json({error: "Not logged in"})
    }
    
    const userRef = firestore.collection('users')
    const userSnapshot = await userRef.where('email', '==', session?.user.email).get()
    let userId = ''
    userSnapshot.forEach(doc => userId = doc.id)
    const podcastRef = firestore.collection('podcasts')

    const podcastsSnapshot = await podcastRef.where('user', '==', userId).get()
    
    if(podcastsSnapshot.empty) {
        return response.status(200).send({
            message: 'Podcasts Not found',
            data: []
        })
    }

    const podcast: Podcast[] = []
    podcastsSnapshot.forEach(doc => {
        podcast.push({
            id: doc.id,
            ...doc.data() as any
        })
    })

    let episodes: Episode[] = []
    let podcastsIds: string[] = []
    const episodesRef = firestore.collection('episodes')
    
    for (const pod of podcast) {
        podcastsIds.push(pod.id) 
        
        //update episodes list with new episodes from each podcast
        let feed = await parse(pod.feed_rss)
        let iterator = 0

        while(feed.items[iterator].isoDate !== pod.last_published) {
            
            const ep = {
                published: feed.items[iterator].isoDate,
                title: feed.items[iterator].title! ,
                description: feed.items[iterator].contentSnippet || '',
                link: feed.items[iterator].enclosure!.url,
                image: feed.items[iterator].itunes.image,
                podcast_id: podcast[0].id
            }
            
            try {
                const doc = await episodesRef.add(ep)
                episodes.push({
                    id: doc.id,
                    ...ep
                })
                
            } catch (error) {
                return response.status(500).send({
                    message: 'Internal error',
                    data: []
                })
            }
            iterator++
        }
    }

    const episodesSnapshot = await episodesRef
        .where('podcast_id', 'in', podcastsIds)
        .orderBy('published', 'desc')
        .limit(15)
        .get()
    
        episodesSnapshot.forEach(doc => {
        episodes.push({
            id: doc.id,
            ...doc.data() as any
        })
    })

    return response.status(200).send({
        message: 'Success',
        data: episodes
    })
    } catch (error) {
        return response.status(500).send({
            message: 'Internal error',
            data: []
        })
    }

}