
function Login({ data }) {
    return (
        <>
        <form action={'/api/login'} method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" />
            <label for="password">Password:</label>
            <input type="text" id="password" name="password" />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

function post(){
    fetch('/api/token', {
        method: 'POST',
        body: JSON.stringify(objectWithData),
      })
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:8000/api/get-posts/`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
  }
  
  
  
  export default Login