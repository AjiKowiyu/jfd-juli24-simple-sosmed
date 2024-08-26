const mysql     = require('mysql2')
const eksekusi  = require('../config/database').eksekusi
const moment    = require('moment')
moment.locale('id')

module.exports =
{

    insert: function(req) {
        let data = {
            caption     : req.body.form_caption,
            file1       : req.files.form_media1.name,
            file2       : req.files.form_media2.name,
            file3       : req.files.form_media3.name,
            created_at  : moment().format("YYYY-MM-DD HH:mm:ss"),
        }
        
        return eksekusi( mysql.format(
            `INSERT INTO post SET ?`,
            [data]
        ))
    },

}