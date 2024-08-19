const mysql         = require('mysql2')
const db            = require('../config/database').db
const eksekusi      = require('../config/database').eksekusi

let cari_username   = function(username) {
    return eksekusi( mysql.format(
        "SELECT * FROM user WHERE username = ?",
        [username]
    ))
}


module.exports =
{
    form_login: function(req,res) {
        res.render('auth/form-login')
    },


    proses_login: async function(req,res) {
        let username = req.body.form_username
        let password = req.body.form_password

        let user = await cari_username(username)
        console.log(user)
        if (user.length > 0) {
            res.end('user ada di database')
        } else {
            res.end('Gak ada !!')
        }
    }
}