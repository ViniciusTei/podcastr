import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/client';
import { parse } from "../../services/rssparser";
import firestore from '../../services/firebase';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    if(request.method === 'POST') {
        const session = await getSession({ req: request })

        if(!session) {
            response.status(400).json({error: "Not logged in"})
        }
        
        const { feed_url } = request.body;
        const feed = await parse(feed_url)

        const userRef = await firestore.collection('users')
        const userSnapshot = await userRef.where('email', '==', session.user.email).get()
        
        let userId = ''
        userSnapshot.forEach(doc => userId = doc.id)

        const podcastRef = await firestore.collection('podcasts')
        const snapshot = await podcastRef.where('feed_rss', '==', feed_url).get()
        
        if(!snapshot.empty) {
            response.status(400).json({error: "Podcast alredy exists!"})
        }

        const podcast = {
            author: feed.itunes.author,
            titile: feed.title,
            image: feed.image,
            description: feed.description,
            last_published: feed.items[0].pubDate,
            feed_rss: feed_url,
            user: userId
        }

        const podcastResponse = await podcastRef.add(podcast)
        
        const episodes = feed.items.map(item => {
            return {
                published: new Date(item.pubDate || ''),
                title: item.title! ,
                description: item.summary?.toString() || '',
                link: item.enclosure!.url,
                image: item.itunes.image,
                podcast_id: podcastResponse.id
            }
        })

        const episodesRef = await firestore.collection('episodes')
        await episodesRef.add(episodes)

        response.status(200).json({
            data: {
                ...podcast,
                episodes
            }
        })
    } else if(request.method === 'GET') {

        try {
            const podcastRef = firestore.collection('podcasts')
            const snapshot = await podcastRef.get()
    
            const podcast = []
    
            snapshot.forEach(doc => {
                podcast.push(doc.data())
            })
    
            response.status(200).json({
                data: {
                    podcast
                }
            })
        } catch(err) {
            console.log(err)
        }
        
    }
}