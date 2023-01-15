const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ho0d8c2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const blogsCollection = client.db('donation').collection('blogs');
        const commentCollection = client.db('donation').collection('comments');


        app.get('/blogs', async (req, res) => {
            const query = {};
            const cursor = blogsCollection.find(query);
            const blogs = await cursor.toArray();
            res.send(blogs);
        })

        app.get('/blogs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await blogsCollection.findOne(query);
            res.send(service);
        })


        // app.get('/reviews/queryService', async (req, res) => {

        //     let query = {};
        //     if (req.query.serviceName) {
        //         query = {
        //             serviceName: req.query.serviceName
        //         }
        //     }
        //     const cursor = reviewsCollection.find(query).sort(sortPattern);
        //     const reviews = await cursor.toArray();
        //     res.send(reviews);
        // })


        // app.get('/reviews/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const review = await reviewsCollection.findOne(query);
        //     res.send(review);
        // })

        // app.post('/reviews', async (req, res) => {
        //     const review = req.body;
        //     const result = await reviewsCollection.insertOne(review);
        //     res.send(result);
        // })

        // app.delete('/reviews/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const result = await reviewsCollection.deleteOne(query);
        //     res.send(result);

        // })

    }
    finally {

    }
}
run().catch(error => console.error(error));

app.get('/', (req, res) => {
    res.send('code-kids server running!')
})

app.listen(port, () => {
    console.log(`code-kids server listening on port ${port}`)
})