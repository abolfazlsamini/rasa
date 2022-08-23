import axios from 'axios';


function login(props){
  const username = props.username
  const password = props.password
  const body = {
    "username":username,
    "password":password
    }

    try {
      const res = axios.post(
        "http://localhost:8000/api/token/",
        
          body
        ,
        
      ).then(res.set)
      return res
    } catch (error) {
      console.log(error);
    }
}
//     const respons = fetch('http://localhost:8000/api/token/', {
//         method: 'POST',
//         body: JSON.stringify(body),
//         headers:{
//           'Content-Type': 'application/json'
//         },
//          credentials: 'include',
//          origin: true
//       }).then(res => {return res.json()}).then(console.log("somethingg in my ass"))
//       document.cookie = "username=John Doe";
//       return respons
// }


//     try {
//         return axios.post('http://localhost:8000/api/token/',body, 
        
//         { withCredentials: true }).then(
//             token => { 

//                 return token.data }
//             )
            

//     } catch (error) {
//         console.log("ERROR"+error)
        
//     }

//   const response = ()=>{
//     try {
//         fetch('http://localhost:8000/api/token/', {
//         method: 'POST',
//         mode: 'same-origin', // no-cors, *cors, same-origin
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body) 
//       }).then(console.log("respons"))
//       return response.json()
        
//     } catch (error) {
//         console.log("respons")
//     }
    
// }


// export default login;

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
