import login from '../api/login'
import cookie from 'cookie'

function Logiin({ data }) {
    var setCookie = cookie.serialize('foo', 'bar');
    const handleSubmit = async (event) => {
        const username = document.querySelector('#username').value
        const password = document.querySelector('#password').value
        event.preventDefault()
        if (validateData(username,password)){

            const body = {
                'username': username,
                'password': password
            }
            // const respons = login(body)
            const respons = await fetch('../api/login',{
            method: 'POST',
            body: JSON.stringify(body),
            headers:{
                    'Content-Type': 'application/json',
                    'Access': 'application/json'
                        },
        })
            console.log(respons)
        }
    }
    function validateData(username,password){
        if (!username || !password) {
            alert("username or password field can't be empty")
            return false
        }
        else return true

    }
    return (
        <>
        <form onSubmit={handleSubmit} >
            <label htmlFor="username">Username:</label>
            <input type="username" id="username" name="username" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

// function post(){
//     fetch('/api/token', {
//         method: 'POST',
//         body: JSON.stringify(objectWithData),
//       })
// }

// // This gets called on every request
// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res = await fetch(`http://localhost:8000/api/get-posts/`)
//     const data = await res.json()
  
//     // Pass data to the page via props
//     return { props: { data } }
//   }
  
  
  
  export default Logiin