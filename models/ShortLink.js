const mongoose = require('mongoose')

const ShortLinkSchema = new mongoose.Schema({
    shortLink: {
        type: String,
        required: [true, "Please provide a unique short link id"],
        unique: true
    },
    orignalLink: {
        type: String,
        required: [true, "Please provide a long URL"],
        unique: true
    }
})

module.exports = new mongoose.model('ShortLink', ShortLinkSchema)