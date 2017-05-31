import db from '../db';

exports.checkLogin = (account, cb) => {
    db.get().collection('users').find({name: account.login, password: account.password}).toArray((err, docs) => {
        cb(err, docs);
    })  
}

exports.allUsers = (cb) => {
    db.get().collection('users').find({ }, {name: 1}).toArray((err, docs) => {
        cb(err, docs);
    })
}