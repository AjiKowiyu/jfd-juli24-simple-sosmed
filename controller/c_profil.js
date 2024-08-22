module.exports =
{
    index: function(req,res) {
        let dataview = {
            req: req,
        }
        res.render('profil/index', dataview)
    },


    form_edit: function(req,res) {
        let dataview = {
            req: req,
        }
        res.render('profil/form-edit', dataview)
    },
}