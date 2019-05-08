var db = require('../db');
var bcrypt = require('bcryptjs');
exports.register = async (req, res) => {
    console.log("register from Backend",req.body);
    var UserName = req.body.username;
    var Name = req.body.name;
    var Email = req.body.email;
    var Password = req.body.password;
    db.connection.query("SELECT * from user WHERE username=?",[UserName], function (error, check) {
        if (!error) {
            if (check.length > 0) {
                res.send({
                    code: 401,
                    error: "username already exists"
                })
            }
            else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(Password, salt, function (err, hash) {
                        db.connection.query("INSERT INTO user (username,name,email,password) VALUE(?,?,?,?)",[UserName,Name,Email,hash], function (error, results) {
                            console.log("registering user")
                            if (error) {
                                console.log(error);
                                res.send({
                                    code: 400,
                                    error: error.sqlMessage
                                })
                            }
                            else{
                                res.send({
                                    code:200
                                })
                            }
                        })
                    })
                })
            }
        }       
        else{
            res.send({code:404})
        }
    });
}
exports.login = async (req, res) => {
    var UserName = await req.body.username;
    var Password = await req.body.password;
    db.connection.query('SELECT * FROM user where username=?', [UserName], function (error, results) {
        if (!error) {
            if (results.length <= 0) {
                res.send({
                    code: 400,
                })
            }
            else {
                let hash = results[0].password;
                bcrypt.compare(Password, hash, function (error, results1) {
                    if (results1) {
                        res.send({
                            "code": 200,
                            "success": "login sucessfull",
                            rows: results
                        });
                    }
                    else {
                        res.send({
                            "code": 402,
                            "results": "error to login"
                        })
                    }
                })
            }
        }
        else {
            res.send({
                "code": 405
            })
        }
    })
}