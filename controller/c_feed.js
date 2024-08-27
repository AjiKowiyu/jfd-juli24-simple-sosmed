const m_post    = require('../model/m_post')
const moment    = require('moment')
moment.locale('id')


module.exports =
{
    index: async function(req,res) {
        let dataview = {
            req: req,
            message: req.query.msg,
            moment: moment,
            postingan: await m_post.get_all(),
        }
        res.render('feed/index', dataview)
    }
}