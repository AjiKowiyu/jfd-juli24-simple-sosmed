const express       = require('express')
const app           = express()
const port          = 3000
const passport      = require('passport')
const cookieParser  = require('cookie-parser')
const session       = require('express-session')

const c_beranda = require('./controller/c_beranda')
const c_auth    = require('./controller/c_auth')
const cek_login = c_auth.cek_login
const c_feed    = require('./controller/c_feed')


// settingan session untuk login
app.use( cookieParser('secret') )
app.use( session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2
        // batas session expired:
        // 1000 milidetik * 60 = 1 menit
        // 1 menit * 60 = 1 jam
    }
}))
app.use( passport.initialize() )
app.use( passport.session() )


app.use( express.urlencoded({extended:false}) )
app.use( express.static('public') )


app.set('view engine', 'ejs')
app.set('views', './view')


app.get('/', c_beranda.index)
app.get('/login', c_auth.form_login)
app.post('/proses-login', c_auth.proses_login)
app.get('/feed', cek_login, c_feed.index)


app.listen(port, ()=>{
    console.log(`Aplikasi sudah siap, buka http://localhost:${port}`)
})