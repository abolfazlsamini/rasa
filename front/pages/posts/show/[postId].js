import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CalleditPageAPI } from "../../../actions/post";

export default function PostView() {
  const router = useRouter();
  const postId = router.query.postId;
  const [postData, setpostData] = useState();
  const [pages, setPages] = useState();

  const fetchData = async () => {
    const postDataPromis = CalleditPageAPI(postId);
    // const pagesPromis = CalleditPageAPI(postId)

    const postData = await postDataPromis;

    setpostData(postData);
  };
  // CalleditPageAPI(postId).then((res) => {
  //   Object.values(data).map();
  // });

  useEffect(() => {
    fetchData();
  }, [postId]);

  return <div>{console.log(postData)}</div>;
}
