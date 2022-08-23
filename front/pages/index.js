import styles from '../styles/Home.module.css'
import cookie from 'cookie';

function Home({ data }) {
  var setCookie = cookie.serialize('foo', 'bsdfar');
  var cookies = cookie.parse('foo=bar; equation=E%3Dmc%5E2');
  console.log(data)
  return (
    <>
    
      <div className={styles.Home}>
        {
          data.map(posts =>
            {
              return(
              <>
                {posts.post_title}:<br/>
                {posts.pages?.map(pages =>{
                  {return (
                    <>
                      {pages.page_title}<br/>
                    </>
                    )}
                }
                  )}<br/>
              </>
              )
            }
          )
        }

      </div>
      <>
        <br/>end.
      </>
    </>
  )
}


// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8000/api/get-posts/`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}



export default Home