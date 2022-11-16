import { useRouter } from "next/router";
import { useState } from "react";
import { CalleditPageAPI } from "../../actions/post";

export default function editPost(post_id) {
  const arr = [];
  CalleditPageAPI(post_id).then((res) => {
    if (res && res.success && res.success != undefined) {
      const data = res.success;
      Object.values(data).map((page) => {
        if (page.page != undefined && page.page != null)
          arr.push({
            id: page.id.toString(),
            pageTitle: page.page_title,
            parent: page.page.toString(),
            text: page.text,
          });
        else
          arr.push({
            id: page.id.toString(),
            pageTitle: page.page_title,
            parent: "0",
            text: page.text,
          });
      });
    }
    // console.log(arr);
  });
  return arr;
}
