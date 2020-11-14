var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller register
exports.register = function(req,res) {
    var post = {
        username : req.body.username,
        email : req.body.email,
        // nohp : req.body.nohp,
        password : md5(req.body.password),
        role : req.body.role,
        tanggal_daftar : new Date(),
    }
    
        //cek email
        var query = "SELECT email FROM ?? WHERE ??=?";
        var table = ["user", "email", post.email];

        query = mysql.format(query,table);

        connection.query (query, function (error, rows) {
                if (error) {
                    console.log(error);
                } else {

                    if (rows.length == 0) {

                        var query = "INSERT INTO ?? SET ?";
                        var table = ["user"];

                        query = mysql.format(query, table);
                        connection.query(query, post, function (error, rows) {

                            if (error) {
                                console.log(error);
                            } else {
                                response.ok("berhasil menambahkan user baru", res);
                            }
                        });
                    } else {
                        response.ok("email sudah terdaftar!!", res);
                    }
                }
            });
}

//controller login
exports.masuk = function(req, res) {
    let post = {
        email: req.body.email,
        password: req.body.password,
    }
    let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    let table = ["user", "email", post.email, "password", md5(post.password)];

    query = mysql.format(query, table);

    connection.query(query, function(error, rows) {
        if(error){
            console.log(error);
        }else{
            if(rows.length == 1) {
                let token = jwt.sign({rows}, config.secret,{
                    expiresIn:1440
                });
                id_user = rows[0].id;
                
                let value = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }
                let query = "INSERT INTO ?? SET ?";
                let table = ["akses_token"];
                query = mysql.format(query, table);
                connection.query(query, value, function(error, rows){
                    if(error){
                        console.log(error)
                    }else{
                        res.json({
                            success: true,
                            message:"Token JWT Tergenerate",
                            token: token,
                            currUser: value.id_user,
                        });
                    }
                });
            }else{
                res.json({"Error":true, "Message":"Email dan Password Salah"});
            }
        }
    });
}