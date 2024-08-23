const m_user = require('./../model/m_user')
const moment = require('moment')
moment.locale('id')

module.exports =
{
    index: function(req,res) {
        let dataview = {
            req: req,
            moment: moment,
            message: req.query.msg,
        }
        res.render('profil/index', dataview)
    },


    form_edit: function(req,res) {
        let dataview = {
            req: req,
        }
        res.render('profil/form-edit', dataview)
    },


    proses_update: async function(req,res) {
        try {
            let update = await m_user.update(req)
            if (update.affectedRows > 0) {
                // ubah data session yg lama
                req.session.user[0].nama_lengkap    = req.body.form_namalengkap
                req.session.user[0].bio             = req.body.form_bio
                // kembalikan ke halaman profil
                res.redirect(`/profil?msg=berhasil edit profil`)
            }
        } catch (error) {
            throw error
        }
    },
}