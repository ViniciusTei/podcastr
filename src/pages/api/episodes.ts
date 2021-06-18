import { NextApiResponse, NextApiRequest } from "next";

export default async(request: NextApiRequest, response: NextApiResponse) => {
    if(request.method == 'GET') {
        return response.status(200)
    }
}