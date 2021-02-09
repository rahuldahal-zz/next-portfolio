import nc from "next-connect";
import isEmail from "validator/lib/isEmail";
import isAlpha from "validator/lib/isAlpha";
import isLength from "validator/lib/isLength";
import matches from "validator/lib/matches";
import { validate } from "@components/Common/Footer/ContactForm";

const app = nc();

app.post(async (req, res) => {
  const { name, email, message } = req.body;
  const errors = validate([name, email, message]);
  if (errors.length === 0) {
    return res.status(202).end();
  }
  return res.status(400).end();
});

export default app;
