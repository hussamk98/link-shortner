const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const connectMongo = require('./config/db')
const errorHandler = require('./middlewares/error')

//load routes
const shortLink = require('./routes/shortLink')

//dotenv config
dotenv.config({ path: './config/config.env' })

if (!process.env.PORT || !process.env.MONGO_URI) {
    console.log('\n\n\n\nmissing config vars\n./config/config.env\n\n\n\n')
}

//connect Mongo
connectMongo()

//middlewares
app.use(express.json())
app.use(express.static(path.join('public')))

app.use('/', shortLink)
app.use(errorHandler)
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})
//listen server
const server = app.listen(process.env.PORT, (err) => {
    if (!err) console.log(`server listening at PORT ${process.env.PORT}`)
    else console.log(err)
})
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)
    //close server & exit process
    server.close(() => process.exit(1))
})