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
        const campaignCollection = client.db('donation').collection('campaign');
        const ngoSignupCollection = client.db('donation').collection('ngoSignup');


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

        app.post('/blogs', async (req, res) => {
            const blog = req.body;
            const result = await blogsCollection.insertOne(blog);
            res.send(result);
        });

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

        app.get('/campaign', async (req, res) => {
            const query = {};
            const cursor = campaignCollection.find(query);
            const campaign = await cursor.toArray();
            res.send(campaign);
        })

        app.post('/campaign', async (req, res) => {
            const campaign = req.body;
            const result = await campaignCollection.insertOne(campaign);
            res.send(result);
        })

        app.get('/ngosignup', async (req, res) => {
            const query = {};
            const cursor = ngoSignupCollection.find(query);
            const ngoSignup = await cursor.toArray();
            res.send(ngoSignup);
        })

        app.get('/ngosignup/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const ngosignup = await ngoSignupCollection.findOne(query);
            res.send(ngosignup);
        })


        app.post('/ngosignup', async (req, res) => {
            const ngoSignup = req.body;
            const result = await ngoSignupCollection.insertOne(ngoSignup);
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