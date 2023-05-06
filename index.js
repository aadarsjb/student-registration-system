var pool = require("./connection");
var express = require('express');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/register.html');
});

app.post('/', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var mno = req.body.mno;

 pool.getConnection(function (error) {
        if (error) throw error;

        var sql = "INSERT INTO students(name, email, mno) VALUES ?";

        var values = [
            [name, email, mno]
        ];
     pool.query(sql, [values], function (error, result) {
            if (error) throw error;
            res.redirect('/up-del');
            //res.send('Student Register Successful' + result.insertId);
        });
    });
});

app.get('/up-del',function(req, res){
 pool.getConnection(function (error) {
    if (error) console.log(error);

    var sql = "SELECT * FROM students";

 pool.query(sql, function (error, result) {
        if (error) console.log(error);
        res.render(__dirname+"/up-del", {students:result});
    });
});
});

app.get('/students',function(req, res){
    pool.getConnection(function (error) {
       if (error) console.log(error);
   
       var sql = "SELECT * FROM students";
   
    pool.query(sql, function (error, result) {
           if (error) console.log(error);
           res.render(__dirname+"/students", {students:result});
       });
   });
   });

app.get('/delete-student', function(req, res){
 pool.getConnection(function (error) {
        if (error) console.log(error);
    
        var sql = "DELETE FROM students WHERE id=?";

        var id = req.query.id;

     pool.query(sql, [id], function (error, result) {
            if (error) console.log(error);
            res.redirect('/up-del');
        });
    });
});

app.get('/update-student', function(req, res){
 pool.getConnection(function (error) {
        if (error) console.log(error);
    
        var sql = "SELECT * FROM students WHERE id=?";

        var id = req.query.id;

     pool.query(sql, [id], function (error, result) {
            if (error) console.log(error);
            res.render(__dirname+"/update-student",{student:result});
        });
    });
});

app.post('/update-student', function(req, res){

    var name = req.body.name;
    var email = req.body.email;
    var mno = req.body.mno;
    var id = req.body.id;

 pool.getConnection(function (error) {
        if (error) console.log(error);
    
        var sql = "UPDATE students SET name=?, email=?, mno=? WHERE id=?";

     pool.query(sql, [name, email, mno, id], function (error, result) {
            if (error) console.log(error);
            res.redirect('/up-del');
        });
    });
});

app.get('/search-students', function(req, res){

 pool.getConnection(function (error) {
    if (error) console.log(error);

    var sql = "SELECT * FROM students";

 pool.query(sql, function (error, result) {
        if (error) console.log(error);
        res.render(__dirname+"/search-students", {students:[]});
    });
});
});

app.get('/search', function(req, res){

var name = req.query.name;
var email = req.query.email;
var mno = req.query.mno;
 pool.getConnection(function(error){
    if(error) console.log(error);

    var sql = "SELECT * FROM students WHERE name LIKE '%"+name+"%' AND email LIKE '%"+email+"%' AND mno LIKE '%"+mno+"%' ";
    
 pool.query(sql, function(error, result){
        if(error) console.log(error);
        res.render(__dirname+"/search-students",{students:result})
    });

});

})

app.listen(7000);