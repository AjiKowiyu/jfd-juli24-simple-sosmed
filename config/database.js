const mysql     = require('mysql2')
const db        = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jfd_belajar_database',
})
db.connect()


function eksekusi(script_sql) {
    return new Promise( (resolve,reject)=>{
        db.query(script_sql, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}


module.exports = {
    db, eksekusi
}