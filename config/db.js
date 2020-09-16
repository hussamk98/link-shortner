const mongoose = require('mongoose')

const connectMongo = async (req, res, next) => {
    const conn = await mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        console.log(`MongoDb connected: ${conn.connection.host}`)
}

module.exports = connectMongo