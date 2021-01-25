import nc from "next-connect";
import faunadb from "faunadb";

// Faunadb methods

const { Paginate, Documents, Collection, Get, Lambda } = faunadb.query;

// Faunadb client connection
const client = new faunadb.Client({
  secret: process.env.FAUNA_API_KEY,
  keepAlive: false,
});

const app = nc();

app.get(async (req, res) => {
  try {
    const { data: projectRefs } = await client.query(
      Paginate(Documents(Collection("projects")))
    );

    const projects = [];

    for (const Ref of projectRefs) {
      // solution from https://stackoverflow.com/a/62020423/11416157
      const { data, ref } = await client.query(Lambda(Get(Ref)));
      projects.push({ data, id: ref.id });
    }

    res.status(200).json({
      projects,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong in the server" });
  }
});

export default app;
