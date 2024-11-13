const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const User = new Schema({
    name: {type: String},
    bio: {type: String},
    email: {type: String, required: true, unique: true},
    userPhoto: {type: String, default: 'https://cdn-icons-png.flaticon.com/512/848/848006.png'},
    password: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    links: [{
        url: {type: String},
        title: {type: String},
        icon: {type: String},
    }],
    socialMedia: {
        instagram: {type: String},
        tiktok: {type: String},
        facebook: {type: String},
        youtube: {type: String},
        twitter: {type: String},
        linkedin: {type: String},
        github: {type: String},
        discord: {type: String},
    },
    views: { type: Number, default: 0 }

}, {collection: 'user-data-mymap'});

const userModel = model('userData', User);

module.exports = userModel;
