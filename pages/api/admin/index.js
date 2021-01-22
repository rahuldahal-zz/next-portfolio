import nc from "next-connect";
const app = nc();

app.post((req, res) => {
  const { password } = JSON.parse(req.body);
  if (password === process.env.ADMIN_PASSWORD) {
    return res.status(202).end();
  }

  return res.status(403).end();
});

export default app;
