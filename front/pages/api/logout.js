import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("access", "", {
        httpOnly: true,
        maxAge: new Date(0),
        secure: false,
        sameSite: "strict",
        path: "/",
      }),
      cookie.serialize("refresh", "", {
        httpOnly: true,
        secure: false,
        maxAge: new Date(0),
        sameSite: "strict",
        path: "/",
      }),
    ]);

    return res.status(200).json({
      success: "Successfully logged out",
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `Method ${req.method} now allowed`,
    });
  }
};
