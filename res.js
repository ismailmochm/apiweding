'use strict';

exports.ok = function(values, res){
    var data = {
        'status':200,
        'values':values
    };

    console.log(values)
     res.json(data);
     res.end();
};

//response untuk nested matakuliah
exports.oknested = function(values, res){
    //lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item)=>{
        //tentukan key group
        if(akumulasikan[item.nama]){
            //buat variabel group nama mahasiswa
            const group = akumulasikan[item.nama];

            //cek jika isi array adalah boba
            if(Array.isArray(group.boba)){
                //tambahkan value ke dalam group boba
                group.boba.push(item.boba);
            }else {
                group.boba = [group.boba, item.boba];
            }

            if(Array.isArray(group.latte)){
                //tambahkan value ke dalam group latte
                group.latte.push(item.latte);
            }else {
                group.latte = [group.latte, item.latte];
            }

            if(Array.isArray(group.kopi)){
                //tambahkan value ke dalam group kopi
                group.kopi.push(item.kopi);
            }else {
                group.kopi = [group.kopi, item.kopi];
            }

            if(Array.isArray(group.makanan)){
                //tambahkan value ke dalam group makanan
                group.makanan.push(item.makanan);
            }else {
                group.makanan = [group.makanan, item.makanan];
            }

        }else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status':200,
        'values':hasil
    };
    
     res.json(data);
     res.end();

}
