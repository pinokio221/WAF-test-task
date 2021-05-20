const express = require('express');
const app = express();
const port = 9000;


app.get('/', function(req, res) {
    res.status(200).json({
        message: "We have conenction"
    })
})

app.listen(port, () => {
    console.log(`Server works on ${port} port`)
})
