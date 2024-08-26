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
        res.render('posting/index', dataview)
    },
}