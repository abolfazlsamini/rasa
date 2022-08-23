import axios from 'axios';

export default async(req, res) => {
    try {
        const responst = await axios("http://localhost:8000/api/get-posts")
        // console.log(responst.data)
        return res.status(200).json(responst.data)
    } catch (error) {
        return 0
    }
}
