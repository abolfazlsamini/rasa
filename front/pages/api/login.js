export default async(req, res) => {

    const body = {
        username : "ramtin",
        password : "123123123"
    }

    console.log(JSON.stringify(body))
    await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
    },body: JSON.stringify(body)
        
    }).then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
}