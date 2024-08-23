const m_user    = require('./../model/m_user')
const path      = require('path')
const moment    = require('moment')
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


    form_edit_foto: function(req,res) {
        let dataview = {
            req: req,
        }
        res.render('profil/form-edit-foto', dataview)
    },


    proses_update_foto: function(req,res) {
        let foto            = req.files.form_uploadfoto

        // ganti nama file asli
        let username        = req.session.user[0].username.replaceAll('.','-')
        let datetime        = moment().format('YYYYMMDD_HHmmss')
        let file_name       = username + '_' + datetime + '_' + foto.name
        let folder_simpan   = path.join(__dirname, '../public/upload/', file_name)

        // pakai function mv() untuk meletakkan file di suatu folder/direktori
        foto.mv(folder_simpan, async function(err) {
            if (err) {
                return res.status(500).send(err)
            }
            // jika fotonya berhasil terupload ke folder_simpan
            try {
                let update = await m_user.update_foto(req, file_name)
                if (update.affectedRows > 0) {
                    // ubah data session yg lama
                    req.session.user[0].foto = file_name,
                    // kembalikan ke halaman profil
                    res.redirect(`/profil?msg=berhasil ganti foto profil`)
                }
            } catch (error) {
                throw error
            }
        })
    },
}