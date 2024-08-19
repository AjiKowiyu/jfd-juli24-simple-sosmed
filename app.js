const express   = require('express')
const app       = express()
const port      = 3000
const c_beranda = require('./controller/c_beranda')


app.use( express.urlencoded({extended:false}) )
app.set('view engine', 'ejs')
app.set('views', './view')


app.get('/', c_beranda.index)


app.listen(port, ()=>{
    console.log(`Aplikasi sudah siap, buka http://localhost:${port}`)
})