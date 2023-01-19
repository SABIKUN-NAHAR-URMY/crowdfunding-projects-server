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
        const commentsCollection = client.db('donation').collection('comments');


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


        app.get('/comments/queryBlog', async (req, res) => {

            let query = {};
            if (req.query.blogName) {
                query = {
                    blogName: req.query.blogName
                }
            }
            const cursor = commentsCollection.find(query);
            const comments = await cursor.toArray();
            res.send(comments);
        })

        app.post('/comments', async (req, res) => {
            const comment = req.body;
            const result = await commentsCollection.insertOne(comment);
            res.send(result);
        })
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