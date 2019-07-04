let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    nama: {
        type: String
    },
    nim: {
        type: Number
    },
    alamat: {
        type: String
    }
});

// Nama Collectionsnya jangan lupa
let Article = module.exports = mongoose.model('mhs', articleSchema);