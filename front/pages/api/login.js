import axios from 'axios';


export default async(req, res) => {

    const body = {
        "username":"ramtin",
        "password":"123123123"}
    try {
        const response = await axios.post('http://localhost:8000/api/token/', body);
        console.log( response);
        res.status(200).send(body)
    } catch (error) {
        console.log(error);
        res.status(200).send("response")
        }

}
