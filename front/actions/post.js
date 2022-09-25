export const createNewPageAPI = async (page_title, text, page, post) => {
  const body = JSON.stringify({
    page_title,
    text,
    page,
    post,
  });

  try {
    const res = await fetch("/api/posts/create_new_page", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (res.status === 200) {
      console.log(res.json());
      return res;
    } else {
      return { failed: res };
    }
  } catch (err) {
    console.log(err);
    return { failed: err };
  }
};
