const express = require('express');
const app = express();
const port = 9000;
const cors = require('cors');
const contentRoute = require('./routes/content');


app.use(cors())
app.use(express.json());
app.use('/api/content', contentRoute);

app.get('/', function(req, res) {
    res.status(200).json({
        message: "We have conenction"
    })
})

app.listen(port, () => {
    console.log(`Server works on ${port} port`)
})
