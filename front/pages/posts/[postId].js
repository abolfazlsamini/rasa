import { useRouter } from "next/router";
import { useState } from "react";
import { CalleditPageAPI } from "../../actions/post";

export default function PostView() {
  const router = useRouter();
  const postId = router.query.postId;
  const [postData, setPostData] = useState([]);
  CalleditPageAPI(postId).then((res) => {
    setPostData(res.success);
  });
  return <div>{postData.map((page) => page.id)}</div>;
}
