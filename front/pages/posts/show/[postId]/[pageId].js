import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  CallGetAllPagesOfPost,
  CallGetSinglePage,
  CallGetAuthorData,
  CallFollow,
  CallUnFollow,
} from "../../../../actions/post";
import Loading from "../../../../components/loading";
import Image from "next/image";
import retry_image from "../../../../public/Retry.png";
import styles from "../../../../styles/Post-Content.module.css";
import Link from "next/link";
// import styles from "../../../../styles/Post-Content.module.css";
import { useSelector } from "react-redux";

export default function PostView() {
  const router = useRouter();
  const postId = router.query.postId;
  const pageId = router.query.pageId;
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const [postData, setpostData] = useState();
  const [pages, setPages] = useState();
  const [authorData, setAuthorData] = useState();
  const [followData, setfollowData] = useState({
    is_followed: false,
    error: "",
  });

  const fetchData = async () => {
    const postDataPromis = CallGetSinglePage(postId, pageId); // the page text
    const pagesPromis = CallGetAllPagesOfPost(postId); // all the pages related to post
    const authorPromis = CallGetAuthorData(postId);
    const postData = await postDataPromis;
    const pageData = await pagesPromis;
    const authorData = await authorPromis;

    setpostData(postData);
    setPages(pageData);
    setAuthorData(authorData);
    setfollowData({ is_followed: authorData.success.is_followed, error: "" });
  };

  const fetchPages = async () => {
    const postDataPromis = CallGetSinglePage(postId, pageId); // the page text

    const postData = await postDataPromis;

    setpostData(postData);
  };
  const follow = async (author_id) => {
    if (typeof window !== "undefined" && !isAuthenticated) {
      router.push({
        pathname: "/profile/login",
        query: { redirect: `posts/show/${postId}/${pageId}` },
      });
      if (!isAuthenticated) return <></>;
    }
    const followRes = CallFollow(author_id);
    const followData = await followRes;
    if (followData.success && followData.success != undefined) {
      setfollowData({ is_followed: true, error: "" });
    } else {
      setfollowData({ is_followed: followData.is_followed, error: followData });
      router.push({
        pathname: "/profile/login",
        query: { redirect: `posts/show/${postId}/${pageId}` },
      });
      if (!isAuthenticated) return <></>;
    }
  };

  const unfollow = async (author_id) => {
    if (typeof window !== "undefined" && !isAuthenticated) {
      router.push({
        pathname: "/profile/login",
        query: { redirect: `posts/show/${postId}/${pageId}` },
      });
      if (!isAuthenticated) return <></>;
    }
    const unfollowRes = CallUnFollow(author_id);

    const unfollowData = await unfollowRes;

    if (unfollowData.success && unfollowData.success != undefined) {
      setfollowData({ is_followed: false, error: "" });
    } else {
      setfollowData({ is_followed: followData.is_followed, error: followData });
      router.push({
        pathname: "/profile/login",
        query: { redirect: `posts/show/${postId}/${pageId}` },
      });
      if (!isAuthenticated) return <></>;
    }
  };

  useEffect(() => {
    if (router.isReady)
      if (!postData) fetchData();
      else fetchPages();
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
  const AuthorInformation = () => {
    if (authorData && authorData.success != undefined) {
      const author_name = authorData.success.author_name;
      const authors_follower_count = authorData.success.authors_follower_count;

      const author_id = authorData.success.author_id;
      return (
        <div className="Author">
          <Link href={"/users/" + author_id}>
            <a className="author_name">author: {author_name}</a>
          </Link>
          <div className="authors_follower_count">
            subs: {authors_follower_count}
          </div>
          {followData.is_followed ? (
            <button
              className="unfollow"
              onClick={(event) => {
                event.preventDefault();
                unfollow(author_id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="follow"
              onClick={(event) => {
                event.preventDefault();
                follow(author_id);
              }}
            >
              follow
            </button>
          )}
        </div>
      );
    }
    if (postData && postData.error != undefined) {
      return retry();
    }
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
    if (pages && pages.error != undefined) {
      return retry();
    }
  };
  return (
    <div>
      <div className="Post_Content">
        {!postData ? <Loading /> : <></>}
        {/* {postData.error ? <>Error</> : <></>} */}
        <Content />
        <br />
        <br />
        <br />
        <br />
        <AuthorInformation />
      </div>
      <div className={styles.page_order}>
        {!pages ? <Loading /> : <></>}

        <Pages />
      </div>
    </div>
  );
}
