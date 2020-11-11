'use strict';

module.exports = function (app) {
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    //tampil semua data
    app.route('/tampil')
        .get(jsonku.tampilsemualpengguna);

    //menampilkan semua data mahasiwa berdasarkan id
    app.route('/tampil/:id')
        .get(jsonku.tampilberdasarkanid);

    //menambahakan data pengguna
    app.route('/tambah')
        .post(jsonku.tambahpengguna);

    //update data pengguna berdasarkan id
    app.route('/ubah')
        .put(jsonku.ubahpengguna);

    //hapus data pengguna
    app.route('/hapus')
        .delete(jsonku.hapuspengguna);

    app.route('/tampiltroli')
        .get(jsonku.tampilgrouptroli);
}