const asyncHandler = require('../middlewares/asyncHancler')
const ShortLink = require('../models/ShortLink')
const shortid = require('shortid')

/**
 * DESC:: returns a long url
 * ROUTE:: {{URL}}/:id
 * ACCESS:: Public
 */
exports.getLink = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    let link = await ShortLink.findOne({ shortLink: id })

    console.log(link)
    if (link) return res.redirect(link.orignalLink)

    res.status(200).send({ success: false, message: 'invalid link' })
})

/**
 * DESC:: deletes a short link
 * ROUTE:: {{URL}}/:id
 * ACCESS:: Public
 */
exports.deleteLink = asyncHandler(async (req, res, next) => {
    const { id } = req.params

    let link = await ShortLink.deleteOne({ shortLink: id })

    if (link) return res.send(link.deletedCount > 0 ? {success: true, message: 'deleted' } : {success: false, message: 'invalid link' })

    res.status(200).send({ success: false, message: 'invalid link', link })
})

/**
 * DESC:: returns a short link
 * ROUTE:: {{URL}}/generate
 * BODY:: { link:String }
 * ACCESS:: Public
 */
exports.createLink = asyncHandler(async (req, res, next) => {
    const { link } = req.body
    let check = await ShortLink.findOne({ orignalLink: link })

    if (check) return res.send(check)

    let gen = await ShortLink.create({
        shortLink: shortid.generate(),
        orignalLink: link
    })

    if (gen) return res.send(gen)

    res.status(200).send({ success: false, message: 'invalid link' })

})

