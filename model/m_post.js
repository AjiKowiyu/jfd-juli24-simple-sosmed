const mysql     = require('mysql2')
const eksekusi  = require('../config/database').eksekusi
const moment    = require('moment')
moment.locale('id')

module.exports =
{

    insert: function(req, file1_name, file2_name, file3_name) {
        let data = {
            caption     : req.body.form_caption,
            file1       : (file1_name) ? file1_name : null,
            file2       : (file2_name) ? file2_name : null,
            file3       : (file3_name) ? file3_name : null,
            created_at  : moment().format("YYYY-MM-DD HH:mm:ss"),
        }
        
        return eksekusi( mysql.format(
            `INSERT INTO post SET ?`,
            [data]
        ))
    },

}