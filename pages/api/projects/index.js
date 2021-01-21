import nc from "next-connect";
import faunadb from "faunadb";

// Faunadb methods

const { Paginate, Documents, Collection, Get, Ref } = faunadb.query;

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

    for (const ref of projectRefs) {
      const project = await client.query(Get(ref));
      projects.push(project.data);
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
