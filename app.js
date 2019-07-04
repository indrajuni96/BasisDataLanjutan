// Memanggil Library
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const swal = require('sweetalert');

mongoose.connect('mongodb://localhost:27017/dbpenilaian', { useNewUrlParser: true });
var Schema = mongoose.Schema;

var dataPegawai = new Schema({
    nip: Number,
    nama: String,
    jabatan: String
}, { collection: 'pegawai' });

var dataPenilaian = new Schema({
    nama: String,
    nTeknik: Number,
    nPersonality: Number,
    nAbsen: Number,
    nSanksi: Number
}, { collection: 'penilaian' });

var pegawai = mongoose.model('pegawai', dataPegawai);
var penilaian = mongoose.model('penilaian', dataPenilaian);

//Bootstrap 
app.use(express.static(path.join(__dirname + '/node_modules/bootstrap/dist/')));
app.use(express.static(path.join(__dirname + '/node_modules/sweetalert/dist/')));
app.use(express.static(path.join(__dirname + '/node_modules/datatables/media/')));
app.use(express.static(path.join(__dirname + '/custome/')));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

//tampilan View engine Pug
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Route (Url) , tampil home
app.get('/', function (req, res) {
    res.render('index')
});

// Route (Url), tampil Pegawai
app.get('/pegawai/tampil', function (req, res) {
    pegawai.find({}, function (err, datas) {
        if (err) {
            console.log(err);
        } else {
            res.render('tampil_pegawai', {
                items: datas
            })
        }
    });
});

// Route (Url) , tampil form tambah
app.get('/tambah_data', function (req, res) {
    res.render('tambah_data')
});

// Proses tambah
app.post('/tambah_data/proses', function (req, res) {
    var item = {
        nip: req.body.nip,
        nama: req.body.nama,
        jabatan: req.body.jabatan
    }

    var data = new pegawai(item);
    data.save();

    res.redirect('/pegawai/tampil');
});

// Route (Url) , tampil form edit
app.get('/pegawai/edit/:id', function (req, res) {
    pegawai.findById(req.params.id, function (err, item) {
        res.render('edit_pegawai', {
            items: item
        });
    })
});

// Proses edit
app.post('/pegawai/edit_proses/:id', function (req, res) {
    // Mengambil value name dari form yg tadi kita imput
    let items = {};
    items.nip = req.body.nip;
    items.nama = req.body.nama;
    items.jabatan = req.body.jabatan;

    let query = {
        _id: req.params.id
    }

    // Menyipan ke dalam Mongodb, form yg tadi telah kita isi
    pegawai.updateOne(query, items, function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/pegawai/tampil');
        }
    });
});

// prosses delete
app.delete('/pegawai/delete/:id', function (req, res) {
    let query = { _id: req.params.id }

    pegawai.deleteOne(query, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.send('Success');
        }
    });
});

// Route (Url), tampil Pegawai
app.get('/penilaian/tampil', function (req, res) {
    penilaian.find({}, function (err, datas) {
        if (err) {
            console.log(err);
        } else {
            res.render('tampil_nilai', {
                items: datas
            })
        }
    });
});

// Route (Url) , tampil form penilaian
app.get('/penilaian/pegawai', function (req, res) {
    pegawai.find({}, function (err, datas) {
        if (err) {
            console.log(err);
        } else {
            res.render('tambah_nilai', {
                items: datas
            })
        }
    });
});

// Proses tambah
app.post('/tambah_nilai/proses', function (req, res) {
    let items = {
        nama: req.body.nama,
        nTeknik: req.body.nTeknik,
        nPersonality: req.body.nPersonality,
        nAbsen: req.body.nAbsen,
        nSanksi: req.body.nSanksi
    }

    let data = new penilaian(items);
    data.save();

    res.redirect('/penilaian/tampil');
});

// Route (Url) , tampil form edit
app.get('/penilaian/edit/:id', function (req, res) {
    penilaian.findById(req.params.id, function (err, item) {
        res.render('edit_penilaian', {
            items: item
        });
    })
});

// Proses edit
app.post('/penilaian/edit_proses/:id', function (req, res) {
    // Mengambil value name dari form yg tadi kita imput
    let items = {
        nama: req.body.nama,
        nTeknik: req.body.nTeknik,
        nPersonality: req.body.nPersonality,
        nAbsen: req.body.nAbsen,
        nSanksi: req.body.nSanksi
    }

    let query = {
        _id: req.params.id
    }

    // Menyipan ke dalam Mongodb, form yg tadi telah kita isi
    penilaian.updateOne(query, items, function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/penilaian/tampil');
        }
    });
});

// prosses delete
app.delete('/penilaian/delete/:id', function (req, res) {
    let query = { _id: req.params.id }

    penilaian.deleteOne(query, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.send('Success');
        }
    });
});

// Route (Url), tampil Pegawai
app.get('/bonus/tampil', function (req, res) {
    penilaian.find({ nSanksi: { $lt: 15 } }, function (err, datas) {
        if (err) {
            console.log(err);
        } else {
            res.render('tampil_bonus', {
                items: datas
            })
        }
    });
});

app.listen(3000, function () {
    console.log('server started on port 3000...')
})