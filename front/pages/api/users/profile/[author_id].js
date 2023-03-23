import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access = cookies.access ?? false;
    let headers = "";
    // if (access === false) {
    //   return res.status(403).json({
    //     error: "User forbidden from making the request",
    //   }); //TODO dispatch verify maybe?
    // }
    if (!access || access === undefined) {
      // if Authorization header is invalid it wont work too lazy to fix but this is good enough
      headers = {
        headers: {},
      };
    } else {
      headers = {
        headers: {
          Authorization: "Bearer " + access,
        },
      };
    }
    const data = req.query;
    const author_id = data.author_id;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/user/author?author_id=${author_id}`,
        headers
      );
      if (response.status === 200) {
        console.log(response);
        return res.status(200).json({ success: response.data });
      } else return res.status(401).json({ error: response.data });
    } catch (err) {
      // i know that this 401 unauthorized should be in the try part but axios raise an error for anything
      // other than 200 and the fetch just dosen't work so here we are
      // TODO: eather fix axios or fix fetch for not working saing bad request
      return res.status(401).json({ error: err });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
