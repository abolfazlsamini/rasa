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
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      return data;
    }
  } catch (err) {
    return err;
  }
};

export const createNewPostAPI = async (post_title) => {
  const body = JSON.stringify({
    post_title,
  });

  try {
    const res = await fetch("/api/posts/create_new_post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      return data;
    }
  } catch (err) {
    return err;
  }
};

export const updatePageAPI = async (page_id, page_title, text, post_id) => {
  const body = JSON.stringify({
    page_id,
    page_title,
    text,
    post_id,
  });

  try {
    const res = await fetch("/api/posts/update_page", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      return data;
    }
  } catch (err) {
    return err;
  }
};

export const deletePageAPI = async (page_id, post_id) => {
  const body = JSON.stringify({
    page_id,
    post_id,
  });

  try {
    const res = await fetch(
      "/api/posts/delete_page/" + post_id + "&" + page_id,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      return data;
    }
  } catch (err) {
    return err;
  }
};

export const CalleditPageAPI = async (id) => {
  try {
    const res = await fetch("/api/posts/" + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      return data;
    }
  } catch (err) {
    return err;
  }
};

export const CallGetPostContentApi = async () => {
  try {
    const res = await fetch("/api/get-posts/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      return data;
    }
  } catch (err) {
    return err;
  }
};

export const CallGetSinglePage = async (page_id, post_id) => {
  const body = JSON.stringify({
    page_id,
    post_id,
  });

  try {
    const res = await fetch(
      "/api/posts/show_post/post/" + post_id + "&" + page_id,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      return data;
    }
  } catch (err) {
    return err;
  }
};

export const CallGetAllPagesOfPost = async (page_id) => {
  const body = JSON.stringify({
    page_id,
  });

  try {
    const res = await fetch("/api/posts/show_post/pages/" + page_id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      return data;
    } else {
      return data;
    }
  } catch (err) {
    return err;
  }
};

export const CallGetUserPosts = async () => {
  try {
    const res = await fetch("/api/posts/get_posts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      return res.json();
    } else {
      return { error: "failed to get posts" };
    }
  } catch (err) {
    console.log(err);
    return { error: "something went wrong trying to get posts" };
  }
};
export const CallGetPosts = async () => {
  try {
    const res = await fetch("/api/posts/posts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      return res.json();
    } else {
      return { error: "failed to get posts" };
    }
  } catch (err) {
    console.log(err);
    return { error: "something went wrong trying to get posts" };
  }
};
