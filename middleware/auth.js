var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');
var nodemailer = require('nodemailer');

//controller register
exports.registrasi = require(req,res){
    var post = {
        username = req.body.username,
        email = req.body.email,
        nohp = req.body.nohp,
        password = md5(req.body.password),
        role = req.body.role,
        tanggal_daftar = new Date()
    }

    //cek email
    var query = "SELECT email FROM ?? WHERE ??";
    var table = ["users", "email", post.email];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows) {
        if(error){
            console.log(error);
        }else{
            //jika email kosong
            if(rows.length == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["users"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows) {
                    if(error){
                        console.log(error);
                    }else {
                        response.ok("berhasil menambahkan user baru", res);
                    }
                });
            } else {
                response.ok("email sudah terdaftar!!");
            }
        }
    })
}