import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CallGetAuthorProfile } from "../../actions/post";
import styles from "../../styles/Post-Content.module.css";
import retry_image from "../../public/Retry.png";
import Image from "next/image";
import Loading from "../../components/loading";

export default function Profile() {
  const router = useRouter();
  const userId = router.query.userId;
  const [profileData, setProfileData] = useState({ data: "", error: "" });
  const fetchData = async () => {
    const profileRes = CallGetAuthorProfile(userId);
    const profileData = await profileRes;
    if (profileData.success && profileData.success != undefined) {
      setProfileData({ data: profileData.success, error: "" });
    } else setProfileData({ data: "", error: profileData });
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
  const AuthorInfo = () => {
    if (profileData.error != "") return retry();
    return (
      <div className="author-info">
        <div className="author-name">{profileData.data.author_name}</div>
        <div className="followers">
          followers: {profileData.data.authors_follower_count}
        </div>
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
