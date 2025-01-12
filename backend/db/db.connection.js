const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
const connectDb = () => {
    mongoose.connect(MONGO_URI)
        .then(() => console.log("Db connected..."))
        .catch((error) => console.log("Db connection error " + error));
}

module.exports = connectDb;
