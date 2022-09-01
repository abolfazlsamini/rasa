import styles from "../styles/Home.module.css";

function Home({ data }) {
  return (
    <>
      <div className={styles.Home}>
        {data?.map((posts) => {
          return (
            <>
              {posts.post_title}:<br />
              {posts.pages?.map((pages) => {
                {
                  return (
                    <>
                      {pages.page_title}
                      <br />
                    </>
                  );
                }
              })}
              <br />
            </>
          );
        })}
      </div>
      <>
        <br />
        end.
      </>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8000/api/get-posts/`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Home;
