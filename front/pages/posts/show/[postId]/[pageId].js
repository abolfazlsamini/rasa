import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  CallGetAllPagesOfPost,
  CallGetSinglePage,
} from "../../../../actions/post";
import Loading from "../../../../components/loading";
import Image from "next/image";
import retry_image from "../../../../public/Retry.png";
import styles from "../../../../styles/Post-Content.module.css";
import Link from "next/link";
// import styles from "../../../../styles/Post-Content.module.css";

export default function PostView() {
  const router = useRouter();
  const postId = router.query.postId;
  const pageId = router.query.pageId;
  const [postData, setpostData] = useState();
  const [pages, setPages] = useState();

  const fetchData = async () => {
    console.log("Fetching");
    const postDataPromis = CallGetSinglePage(postId, pageId); // call the onw with pageid
    const pagesPromis = CallGetAllPagesOfPost(postId); // call the one WithOUT padeid

    setpostData(false);
    const postData = await postDataPromis;
    const pageData = await pagesPromis;

    setpostData(postData);
    setPages(pageData);
  };
  // CalleditPageAPI(postId).then((res) => {
  //   Object.values(data).map();
  // });

  useEffect(() => {
    if (router.isReady) fetchData();
  }, [router]);

  const retry = () => {
    return (
      <Image
        title="Retry"
        className={styles.image}
        src={retry_image}
        width={25}
        height={25}
        onClick={(event) => {
          event.preventDefault();
          fetchData();
        }}
      />
    );
  };
  const Content = () => {
    if (postData && postData.success != undefined) {
      const data = postData.success[0];
      return (
        <div>
          <p className="Title">{data.page_title}</p>
          <div className="Text">{data.text}</div>
        </div>
      );
    }
    if (postData && postData.error != undefined) {
      return retry();
    }
  };

  const Pages = () => {
    if (pages && pages.success != undefined) {
      const data = pages.success;
      return (
        <div>
          <ul>
            {data.map((pages) => (
              <Link href={`/posts/show/${postId}/${pages.id}`}>
                <a>
                  <li key={pages.id}>{pages.page_title}</li>
                </a>
              </Link>
            ))}
          </ul>
        </div>
      );
    }
    if (postData && postData.error != undefined) {
      return retry();
    }
  };
  return (
    <div>
      <div className="Post_Content">
        {!postData ? <Loading /> : <></>}
        {/* {postData.error ? <>Error</> : <></>} */}
        <Content />
      </div>
      <div className={styles.page_order}>
        {!pages ? <Loading /> : <></>}

        <Pages />
      </div>
    </div>
  );
}
