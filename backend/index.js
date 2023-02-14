const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.use('/', userRoutes);

// app.post('/', express.json(), (req, res) => {
//     console.log(req.body);
// })

app.listen(5000, () => {
    console.log("The server is listening on the port 5000");
});