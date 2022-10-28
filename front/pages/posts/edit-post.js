import { useRouter } from "next/router";
import { useState } from "react";
import { CalleditPageAPI } from "../../actions/post";

export default function editPost(post_id) {
  const arr = [];
  CalleditPageAPI(post_id).then((res) => {
    if (res && res.success && res.success != undefined) {
      const data = res.success;
      Object.values(data).map((page) => {
        arr.push({
          id: page.id.toString(),
          pageTitle: page.page_title,
          parent: page.post.toString(),
          text: page.text,
        });
      });
    }
    // console.log(arr);
  });
  return arr;
}
