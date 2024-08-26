const express       = require('express')
const app           = express()
const port          = 3000
const passport      = require('passport')
const cookieParser  = require('cookie-parser')
const session       = require('express-session')
const fileUpload    = require('express-fileupload')

const c_beranda = require('./controller/c_beranda')
const c_auth    = require('./controller/c_auth')
const cek_login = c_auth.cek_login
const c_feed    = require('./controller/c_feed')
const c_profil  = require('./controller/c_profil')
const c_posting = require('./controller/c_posting')


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
app.use( fileUpload() )


app.set('view engine', 'ejs')
app.set('views', './view')


app.get('/', c_beranda.index)
app.get('/login', c_auth.form_login)
app.post('/proses-login', c_auth.proses_login)
app.get('/feed', cek_login, c_feed.index)

app.get('/profil', cek_login, c_profil.index)
app.get('/profil/edit', cek_login, c_profil.form_edit)
app.post('/profil/proses-update', cek_login, c_profil.proses_update)
app.get('/profil/edit-foto', cek_login, c_profil.form_edit_foto)
app.post('/profil/proses-update-foto', cek_login, c_profil.proses_update_foto)

app.get('/posting', cek_login, c_posting.index)
app.post('/posting/tambah', cek_login, c_posting.proses_insert)


app.listen(port, ()=>{
    console.log(`Aplikasi sudah siap, buka http://localhost:${port}`)
})