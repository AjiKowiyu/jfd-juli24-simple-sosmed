module.exports =
{
    index: function(req,res) {
        let dataview = {
            req: req,
            message: req.query.msg,
        }
        res.render('feed/index', dataview)
    }
}