// bossisback2024
// AvydFNorAhmu53cw

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

//  ? mongoo Db
//  ! localy use server
// const uri = "mongodb://localhost:27017";

const uri =
  "mongodb+srv://bossisback2024:AvydFNorAhmu53cw@cluster0.air3igr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    // ! const userCollention = clint.db('usersDB').collection('users')

    //?  get

    app.get("/users", async (req, res) => {
      const curson = userCollection.find();
      const result = await curson.toArray();
      res.send(result);
    });

    // find a info
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const user = await userCollection.findOne(query);
      res.send(user);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // ! PUT
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      console.log(user);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };
      const result = await userCollection.updateOne(
        filter,
        updatedUser,
        options
      );
      res.send(result);
    });

    //  ! delete....
    // ? ----------------------------
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log("please delete ", id);
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //! await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("simple curd  is running ");
});

app.listen(port, () => {
  console.log("server is ok ");
});
