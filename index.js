const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.Port || 5000;

app.use(cors());

const blogs = require('./donationsBlogs/donationsBlogs.json');

app.get('/', (req, res) => {
    res.send('code-kids project running')
})

app.get('/blogs', (req, res) => {
    res.send(blogs);
})

app.get('/blogs/:id', async (req, res) => {
    const id = req.params.id;
    const blog = blogs.find(b => b.id == id);
    res.send(blog);
})

app.listen(port, () => {
    console.log(`code-kids listening on port ${port}`)
})