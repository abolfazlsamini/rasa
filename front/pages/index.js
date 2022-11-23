import Link from "next/link";
import styles from "../styles/profile.module.css";

function Home({ data }) {
  return (
    <div className={styles.CreatePost}>
      {data?.map((posts) => {
        return posts.pages != null ? (
          <ul className={styles.PostList}>
            <Link href={`/posts/show/${posts.id}/${posts.pages}`}>
              <a>
                <li id={posts.id} href="">
                  <div className={styles.PostTitle}>{posts.post_title}</div>{" "}
                  <br />
                  <div className={styles.Date}>
                    Created In: {posts.created_date.slice(0, 4)}/
                    {posts.created_date.slice(5, 7)}/
                    {posts.created_date.slice(8, 10)} At:{" "}
                    {posts.created_date.slice(11, 13)}:
                    {posts.created_date.slice(14, 16)}
                  </div>
                </li>
              </a>
            </Link>
          </ul>
        ) : (
          <></>
        );
      })}
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8000/api/posts/`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Home;
