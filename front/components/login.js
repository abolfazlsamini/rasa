import axios from 'axios';


function login(props){
    const username = props.username
    const password = props.password
        const body = {
        "username":username,
        "password":password
    }
    try {
        const response = axios.post('http://localhost:8000/api/token/', body).then(
        )
        return response

    } catch (error) {
        console.log(error)
        
    }
//   const response = fetch('http://localhost:8000/api/token/', {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'same-origin', // no-cors, *cors, same-origin
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body) 
//   }).then(console.log("respons"))
//   return response.json()
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
