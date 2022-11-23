import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CallGetSinglePage } from "../../../../actions/post";

export default function PostIndexPage() {
  const router = useRouter();
  const postId = router.query.postId;
  const pageId = router.query.pageId;
  const [postData, setpostData] = useState();
  const [pages, setPages] = useState();

  const fetchData = async () => {
    // const postDataPromis = CallGetSinglePage(postId, pageId); // call the onw with pageid
    // const pagesPromis = CalleditPageAPI(postId); // call the one WithOUT padeid
    // const postData = await postDataPromis;
    // setpostData(postData);
    //TODO this page redirect it to the first "PAGE" of the post
  };
  // CalleditPageAPI(postId).then((res) => {
  //   Object.values(data).map();
  // });

  useEffect(() => {
    if (router.isReady) fetchData();
  }, [postId]);

  return <div>you'll get redirected soon... someday</div>;
}
