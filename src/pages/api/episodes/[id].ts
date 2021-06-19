import { NextApiResponse, NextApiRequest } from "next";
import firebase from "../../../services/firebase";

export default async(request: NextApiRequest, response: NextApiResponse) => {
    if(request.method == 'GET') {
        const { id } = request.query
        
        try {
            const episodesRef = firebase.collection('episodes')
            const episode = await episodesRef.doc(id.toString()).get()
            if (!episode.exists) {
                return response.status(400).send({message: 'Not found'})
            }
            return response.status(200).send({episode: {
                id: id,
                ...episode.data()
            }})
        } catch (error) {
            return response.status(500).send({message: 'Internal error', error})
        }
    }
}