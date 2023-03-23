import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  CallFollow,
  CallGetAuthorProfile,
  CallUnFollow,
} from "../../actions/post";
import styles from "../../styles/Post-Content.module.css";
import retry_image from "../../public/Retry.png";
import Image from "next/image";
import Loading from "../../components/loading";
import { useSelector } from "react-redux";

export default function Profile() {
  const router = useRouter();
  const userId = router.query.userId;
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const [profileData, setProfileData] = useState({ data: "", error: "" });
  const [followData, setfollowData] = useState({
    is_followed: false,
    error: "",
  });
  const fetchData = async () => {
    const profileRes = CallGetAuthorProfile(userId);

    const profileData = await profileRes;

    console.log(profileData.success.is_followed);

    if (profileData.success && profileData.success != undefined) {
      setProfileData({ data: profileData.success, error: "" });
      setfollowData({
        is_followed: profileData.success.is_followed,
        error: "",
      });
    } else {
      setProfileData({ data: "", error: profileData });
      setfollowData({
        is_followed: followData.is_followed,
        error: profileData,
      });
    }
  };
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

  const FollowBtn = () => {
    return (
      <div>
        {followData.is_followed ? (
          <button
            className="unfollow"
            onClick={(event) => {
              event.preventDefault();
              unfollow(userId);
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="follow"
            onClick={(event) => {
              event.preventDefault();
              follow(userId);
            }}
          >
            follow
          </button>
        )}
      </div>
    );
  };
  const AuthorInfo = () => {
    if (profileData.error != "") return retry();
    return (
      <div className="author-info">
        <div className="author-name">{profileData.data.author_name}</div>
        <div className="followers">
          followers: {profileData.data.authors_follower_count}
        </div>
        <FollowBtn />
      </div>
    );
  };
  const Posts = () => {
    if (profileData.error != "") return retry();
    return (
      <div className="Posts">
        <ul>
          {profileData.data.posts?.map((post) => {
            return (
              <li>
                <Link href={`/posts/show/${post.id}/${post.pages}`}>
                  <a>{post.post_title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  return (
    <div>
      {profileData.data === "" && profileData.error === "" ? (
        <Loading />
      ) : (
        <>
          <AuthorInfo /> <Posts />
        </>
      )}
    </div>
  );
}
