var mysql = require("mysql")
var express = require("express")
var multer = require('multer')
let app = express()

var connection = mysql.createConnection ({
    host: "localhost",
    user : 'tch_new',
    password : 'tch_password',
    database : 'tchsql'
})

// 跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})

connection.connect()

// 查询综合
var sqlList = "SELECT * FROM new_list order by id desc"
app.get('/get',function (req,res) {
    connection.query(sqlList,function(err,result) {
        if (err) {
            console.log(err,'这是err')
            return
        }
        res.status(200)
        res.json(result)
        // console.log(result,'这是result')
    })
})
// 查询细分
app.post('/postCode', function (req,res) {
    req.on('data',function(data) {
        postCode = JSON.parse(data)
        console.log(postCode)
        var sqlCode = "SELECT * FROM new_list where code = "+postCode+" order by id desc"
        connection.query(sqlCode,function(err,result) {
            // res.send(result)
            if (err) {
                console.log(err,'这是err')
                return
            }
            res.status(200)
            res.json(result)
            // console.log(result,'这是result')
        })
    })
})
// 配置静态文件夹，图片存放
const upload = multer({dest: __dirname + '/upload'})
// 接收传来的图片
app.post('/uploadImg',upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:8080/upload/${file.filename}`
    // res.send(file)
    res.json(file)
})
// 添加数据
app.post('/post', function (req,res) {
    req.on('data',function(data) {
        obj = JSON.parse(data)
        console.log(obj)
        var addSql = 'INSERT INTO new_list(code,type,title,text,time,img)VALUES(?,?,?,?,?,?)'
        var addList = obj
        connection.query(addSql,addList,function(err,result) {
            if (err) {
                console.log(err)
            }
            res.json("1")
        })
    })
})
// 删除数据
app.post('/delete', function (req,res) {
    req.on('data', function(data) {
        var dataId = JSON.parse(data)
        console.log(dataId)
        var delSql = "DELETE FROM new_list WHERE id="+dataId+""
        connection.query(delSql,function (err,result) {
            if(err) {
                console.log(err,'报错：')
                return
            }
            console.log(result)
            res.json(result)
        })
    })
})

// 修改数据
// var initNum = 100
// var changeNum = setInterval(function () {
//     initNum+=10
//     if (initNum>200) {
//         clearInterval(changeNum)
//         return
//     }
//     var update = 'UPDATE progress SET progress = ? WHERE Id = ?'
//     var nowdate = [initNum,1]
//     connection.query(update,nowdate,function (err,res) {
//         if (err) {
//             console.log(err,"报错")
//         } else {
//             console.log(res,"成功")
//         }
//     })
//     console.log(initNum)
// },2000)


// 开通端口
var server =  app.listen(5000, function() {
    var host = server.address().address
    var port = server.address().port
    console.log(host,'这是host')
    console.log(port,'这是port')
})