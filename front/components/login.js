import axios from 'axios';
// do i need to say class login extend nextjscomponents or not?


function login(){
        const body = {
        "username":"ramtin",
        "password":"123123123"
    }
    const response = await axios.post('http://localhost:8000/api/token/', body);
    console.log( response);
}
export default login;

// export default async(req, res) => {

//     const body = {
//         "username":"ramtin",
//         "password":"123123123"
//     }
//     try {
        
//         console.log( response);
//         res.status(200).send(body)
//     } catch (error) {
//         console.log(error);
//         res.status(200).send("response")
//         }

// }
