import { NextApiResponse, NextApiRequest } from "next";

export default async(request: NextApiRequest, response: NextApiResponse) => {
    if(request.method == 'GET') {
        const { id } = request.query
        return response.status(200).send({id})
    }
}