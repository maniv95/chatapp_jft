var db = require('../db');
var bcrypt = require('bcryptjs');
exports.register = async (req, res) => {
    console.log("register from usercontrollers",req.body);
    var UserName = req.body.username;
    var Name = req.body.name;
    var Email = req.body.email;
    var Password = req.body.password;
    db.connection.query("SELECT * from users WHERE email=?", [Email], function (error, check) {
        if (!error) {
            if (check.length > 0) {
                res.send({
                    code: 401,
                    error: "email already exists"
                })
            }
            else {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(Password, salt, function (err, hash) {
                        db.connection.query("INSERT INTO users (UserName,Name,Email,Password) VALUE(?,?,?,?,)",[UserName,Name, Email,hash], function (error, results) {
                            console.log("regisering user")
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
    var UserName = await req.body.UserName;
    var Password = await req.body.Password;
    db.connection.query('SELECT * FROM users where username=?', [UserName], function (error, results) {
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