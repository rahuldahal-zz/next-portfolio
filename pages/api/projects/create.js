// POST: Create
// PATCH: Update

import nc from "next-connect";
import faunadb from "faunadb";
import Authenticate from "utils/authMiddleware";

// Faunadb methods

const { Paginate, Ref, Create, Update, Collection, Var } = faunadb.query;

// Faunadb client connection
const client = new faunadb.Client({ secret: process.env.FAUNA_API_KEY });

const app = nc();

function getToken(req) {
  const { authorization } = req.headers;
  if (!authorization) {
    return null;
  }
  return authorization.split(" ")[1];
}

app.post(async (req, res) => {
  console.log(req.body);
  const { name, description, url, repo, stack, screenshots } = req.body;

  try {
    await Authenticate(getToken(req));
    await client.query(
      Create(Collection("projects"), {
        data: {
          name,
          description,
          url,
          repo,
          stack,
          screenshots,
        },
      })
    );

    res.status(201).json({
      message: `created ${name}`,
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

app.patch(async (req, res) => {
  const { id, ...toBeUpdated } = req.body;

  try {
    await Authenticate(getToken(req));
    console.log(id);

    await client.query(
      Update(Ref(Collection("projects"), id), {
        data: toBeUpdated,
      })
    );

    res.status(201).json({
      message: { id, toBeUpdated },
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
