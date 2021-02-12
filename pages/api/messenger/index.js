import nc from "next-connect";
import { validate } from "@components/Common/Footer/ContactForm";
import { callSendAPI } from "./webhook/index";

const app = nc();

app.post(async (req, res) => {
  const { name, email, message } = req.body;
  const errors = validate([name, email, message]);
  if (errors.length === 0) {
    const messageToSend = `*${name}* has contacted via the website.`;
    try {
      await callSendAPI(process.env.RAHUL_DAHAL_PSID, { text: messageToSend });
      return res.status(202).end();
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  return res.status(400).json({ errors });
});

export default app;
