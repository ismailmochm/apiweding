'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi REST API ku berjalan!", res)
};

//menampilkan semua data
exports.tampilsemualpengguna = function(req, res) {
    connection.query('SELECT * FROM pengguna', function(error, rows, fileds){
        if(error) {
            connection.log(error);
        }else{
            response.ok(rows, res)
        }
    })
}

//menampilkan semua data mahasiwa berdasarkan id
exports.tampilberdasarkanid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM pengguna WHERE id_pengguna = ?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        });
};

//menambahkan data pengguna
exports.tambahpengguna = function (req, res) {
    var nama = req.body.nama;
    var email = req.body.email;
    var nohp = req.body.nohp;
    var alamat= req.body.alamat;

    connection.query('INSERT INTO pengguna (nama,email,nohp,alamat) VALUES(?,?,?,?)',
        [nama, email, nohp,alamat],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan Data!", res)
            }
        });
};


//mengubah data berdasarkan id
exports.ubahpengguna = function (req, res) {
    var id = req.body.id_pengguna;
    var nama = req.body.nama;
    var email = req.body.email;
    var nohp = req.body.nohp;
    var alamat= req.body.alamat;

    connection.query('UPDATE pengguna SET nama=?, email=?, nohp=?, alamat=? WHERE id_pengguna=?', 
        [nama, email, nohp, alamat, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Ubah Data", res)
            }
        });
}

//Menghapus data berdasarkan id
exports.hapuspengguna = function (req, res) {
    var id = req.body.id_pengguna;
    connection.query('DELETE FROM pengguna WHERE id_pengguna=?',[id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Hapus Data", res)
            }
        });
}

//respon untuk troli
exports.tampilgrouptroli = function(req, res){
    connection.query
    ('SELECT pengguna.id_pengguna, pengguna.nama, pengguna.email, pengguna.nohp, pengguna.alamat, boba.namaboba, kopi.namakopi, latte.namalatte, makanan.namamakanan, troli.id_troli FROM troli JOIN boba JOIN latte JOIN makanan JOIN kopi JOIN pengguna WHERE troli.id_boba = boba.id_boba AND troli.id_latte = latte.id_latte AND troli.id_kopi = kopi.id_kopi AND troli.id_makanan = makanan.id_makanan AND troli.id_pengguna = pengguna.id_pengguna ORDER BY pengguna.id_pengguna',
        function (error, rows, fields){
            if(error){
                console.log(error);
            }else {
                response.oknested(rows,res);
            }
        }
    )

}

