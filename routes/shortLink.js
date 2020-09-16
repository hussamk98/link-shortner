const router = require('express').Router()
const {
    getLink,
    createLink,
    deleteLink
} = require('../controller/shortLink')

router.route('/:id')
    .get(getLink)
    .delete(deleteLink)

router.route('/generate')
    .post(createLink)

module.exports = router