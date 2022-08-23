import axios from 'axios';
import cookie from 'cookie';
import { serialize } from "cookie";

export default async(req, res) => {

    const body = req.body
    try {

        const response = await axios.post('http://localhost:8000/api/token/', body);

        res.setHeader("Set-Cookie",[
            cookie.serialize(
                'access', response.data.access, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    path: '/'
                }
            ),
            cookie.serialize(
                'refresh', response.data.refresh, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    path: '/'
                }
            )
        ]);
        return res.status(200).json({'suc':response.data})
    } catch (error) {
        console.log('error' + error);
        res.status(200).send("response")
        }


}
