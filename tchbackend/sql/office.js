var mysql = require("mysql")
var express = require("express")
let app = express()

var connection = mysql.createConnection ({
    host: "localhost",
    user: "jgy123",
    password: "jgy123",
    database: "game_new_list"
})

// 跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})

connection.connect()

// 开通端口
var server =  app.listen(5000, function() {
    var host = server.address().address
    var port = server.address().port
    console.log(host,'这是host')
    console.log(port,'这是port')
})