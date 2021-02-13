import nc from "next-connect";
import { validate } from "@components/Common/Footer/ContactForm";
import faunadb from "faunadb";
import Authenticate from "utils/authMiddleware";
import { callSendAPI } from "./webhook/index";
import getTokenFromHeader from "utils/getTokenFromHeader";

// Faunadb client connection
const client = new faunadb.Client({ secret: process.env.FAUNA_API_KEY });

const { Paginate, Documents, Get, Lambda, Collection, Create } = faunadb.query;

const app = nc();

app.post(async (req, res) => {
  const { name, email, message } = req.body;
  const errors = validate([name, email, message]);
  if (errors.length === 0) {
    const messageToSend = `*${name}* has contacted via the website.`;
    try {
      // store received message in the database
      await client.query(
        Create(Collection("messages"), {
          data: {
            name,
            email,
            message,
          },
        })
      );

      // send notification to facebook
      await callSendAPI(process.env.RAHUL_DAHAL_PSID, { text: messageToSend });
      return res.status(202).end();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }
  return res.status(400).json({ errors });
});

app.get(async (req, res) => {
  try {
    await Authenticate(getTokenFromHeader(req));

    const { data: messageRefs } = await client.query(
      Paginate(Documents(Collection("messages")))
    );

    const messages = [];

    // using for...of loop because async/await doesn't work with array "loops"
    for (const Ref of messageRefs) {
      // solution from https://stackoverflow.com/a/62020423/11416157
      const { data, ref } = await client.query(Lambda(Get(Ref)));
      messages.push({ data, id: ref.id });
    }

    res.status(200).json({
      messages,
    });
  } catch (error) {
    console.log(error);
    if (error === "Invalid Token Received") {
      res.status(403).json({ message: error });
    } else {
      res.status(500).json({ message: "Something went wrong in the server" });
    }
  }
});

export default app;
