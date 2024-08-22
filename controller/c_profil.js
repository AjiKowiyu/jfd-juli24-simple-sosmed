module.exports =
{
    index: function(req,res) {
        let dataview = {
            req: req,
        }
        res.render('profil/index', dataview)
    },
}