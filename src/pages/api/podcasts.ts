import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/client';
// import { parse } from "../../services/rssparser";
// import firestore from '../../services/firebase';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    if(request.method === 'POST') {
        const session = await getSession({ req: request })

        const { feed_url } = request.body;
        console.log(feed_url)
    }
}