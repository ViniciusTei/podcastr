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
    published: any;
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

        let episodes: Episode[] = []
        const episodesRef = firestore.collection('episodes')
        const episodesSnapshot = await episodesRef
            .where('podcast_id', '==', podcast[0].id)
            .orderBy('published', 'desc')
            .get()
        
            episodesSnapshot.forEach(doc => {
            episodes.push({
                id: doc.id,
                ...doc.data() as any
            })
        })

        if(episodesSnapshot.empty) {
            for (const item of feed.items) {
                const ep = {
                    published: new Date(item.pubDate || ''),
                    title: item.title! ,
                    description: item.contentSnippet || '',
                    link: item.enclosure!.url,
                    image: item.itunes.image,
                    podcast_id: podcast[0].id
                }
                const doc = await episodesRef.add(ep)
                episodes.push({
                    id: doc.id,
                    ...ep
                })

            }

            return response.status(200).send({
                message: 'Success',
                data: episodes
            })
        }

        // let iterator = 0
        // while(new Date(feed.items[iterator].pubDate) !== new Date(episodes[iterator].published._seconds * 1000)) {
        //     try {
               
        //         const ep = {
        //             published: new Date(feed.items[iterator].pubDate || ''),
        //             title: feed.items[iterator].title! ,
        //             description: feed.items[iterator].contentSnippet || '',
        //             link: feed.items[iterator].enclosure!.url,
        //             image: feed.items[iterator].itunes.image,
        //             podcast_id: podcast[0].id
        //         }
        //         await episodesRef.add(ep)
        //         iterator++
        //     } catch (error) {
        //         console.log(error)
        //         break
        //     }
        // }

        return response.status(200).send({
            message: 'Success',
            data: episodes
        })
    }
}