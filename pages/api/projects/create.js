import nc from "next-connect";
import faunadb from "faunadb";

// Faunadb methods

const { Paginate, Get, Create, Collection, Var } = faunadb.query;

// Faunadb client connection
const client = new faunadb.Client({ secret: process.env.FAUNA_API_KEY });

const app = nc();

app.post(async (req, res) => {
  const { name, description, url, repo, screenshots } = JSON.parse(req.body);

  try {
    await client.query(
      Create(Collection("projects"), {
        data: {
          name,
          description,
          url,
          repo,
          screenshots,
        },
      })
    );

    res.status(201).json({
      message: `created ${name}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong in the server" });
  }
});

export default app;
