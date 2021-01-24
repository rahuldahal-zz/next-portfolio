import nc from "next-connect";
import jwt from "jsonwebtoken";

const app = nc();

app.post((req, res) => {
  const { password } = JSON.parse(req.body);
  if (password === process.env.ADMIN_PASSWORD) {
    const accessToken = jwt.sign({ user: "admin" }, process.env.JWT_SECRET);
    console.log(accessToken);
    return res.status(202).json({ token: accessToken });
  }

  return res.status(403).end();
});

export default app;
