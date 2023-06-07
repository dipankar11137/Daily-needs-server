const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

const uri =
  'mongodb+srv://daily_needs:zt7KqPSAsg1Fi3Aq@cluster0.yow9vhz.mongodb.net/?retryWrites=true&w=majority';


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    // console.log("database connect");
    const jobCollection = client.db('dailyNeeds').collection('jobs');
    const userCollection = client.db('dailyNeeds').collection('users');
    const allServicesCollection = client
      .db('dailyNeeds')
      .collection('services');
    const bookingCollection = client
      .db('dailyNeeds')
      .collection('bookingServices');

    //   // // // // // // // // // // // //

    // // post User
    app.post('/user', async (req, res) => {
      const newProduct = req.body;
      const result = await userCollection.insertOne(newProduct);
      res.send(result);
    });
    // get User
    app.get('/users', async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const mainProducts = await cursor.toArray();
      res.send(mainProducts);
    });

    //                    Jobs
    // get Jobs
    app.get('/jobs', async (req, res) => {
      const query = {};
      const cursor = jobCollection.find(query);
      const jobs = await cursor.toArray();
      res.send(jobs);
    });
    // post Jobs
    app.post('/jobs', async (req, res) => {
      const newProduct = req.body;
      const result = await jobCollection.insertOne(newProduct);
      res.send(result);
    });
    // g

    // //                        ALl services
    // All Services Collection
    app.post('/allServices', async (req, res) => {
      const newProduct = req.body;
      const result = await allServicesCollection.insertOne(newProduct);
      res.send(result);
    });

    // get all services
    app.get('/allServices', async (req, res) => {
      const query = {};
      const cursor = allServicesCollection.find(query);
      const mainProducts = await cursor.toArray();
      res.send(mainProducts);
    });
    // all service filter by service category
    app.get('/allServices/:service', async (req, res) => {
      const service = req.params.service;
      const query = { service };
      const cursor = allServicesCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });
    // get all services by id
    app.get('/allServicesId/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const products = await allServicesCollection.findOne(query);
      res.send(products);
    });
    // // Delete one Service
    app.delete('/allServices/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await allServicesCollection.deleteOne(query);
      res.send(result);
    });
    // post  book services
    app.post('/bookService', async (req, res) => {
      const newProduct = req.body;
      const result = await bookingCollection.insertOne(newProduct);
      res.send(result);
    });
    // // get Book Service
    app.get('/bookService', async (req, res) => {
      const query = {};
      const cursor = bookingCollection.find(query);
      const mainProducts = await cursor.toArray();
      res.send(mainProducts);
    });
    // delete booking
    app.delete('/bookService/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });
    //
    // all booking filter by email
    app.get('/allBooking/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const cursor = bookingCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Daily Needs Service");
});

app.listen(port, () => {
  console.log("Daily Needs  server is running ");
});
