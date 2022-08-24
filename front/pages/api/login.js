import axios from 'axios';
import cookie from 'cookie';

export default async(req, res) => {

    const body = req.body
    try {
        const response = await axios.post('http://localhost:8000/api/token/', body);
        if(response.status === 200){

            res.setHeader("Set-Cookie",[
                cookie.serialize(
                'access', response.data.access, {
                    httpOnly: true,
                    maxAge: 60 * 60,
                    secure: true,
                    sameSite: 'strict',
                    path: '/'
                }
                ),
                cookie.serialize(
                    'refresh', response.data.refresh, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 60 * 60 * 24,
                    sameSite: 'strict',
                    path: '/'
                }
                )
            ]);

            return res.status(200).json({'success':response.data})
        }
    } catch(err) {
        // i know that this 401 unauthorized should be in the try part but axios raise an error for anything 
        // other than 200 and the fetch just dosen't work so here we are
        return res.status(401).json({'error':err})
        

    }

}
