const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDb = require('./db/db.connection');
const userRoutes = require('./routes/user.routes');

//express app
const app = express();

//db connection
connectDb();

//Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser());

app.use('/api/user', userRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
console.log("Server running on port " + PORT);
});