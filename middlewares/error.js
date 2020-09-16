const error = (err, req, res, next) => {
    res.send({ success: false, err })
}
module.exports = error