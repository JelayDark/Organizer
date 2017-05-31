import db from '../db';
import { ObjectID } from 'mongodb';

exports.allLists = (cb) => {
    db.get().collection('todolists').find().toArray((err, docs) => {
        cb(err, docs);
    })
}

exports.createList = (list, cb) => {
    db.get().collection('todolists').find({name: list.name}).toArray((err, docs) => {
        if(docs.length === 0) {
            db.get().collection('todolists').insert({ name: list.name, needs: list.needs }, (err, result) => {
                cb(err, result);
            })
        } else {
            cb(err, false);
        }
    })
}

// exports.allNeeds = (activeID, cb) => {
//     db.get().collection('todolists').find({_id: ObjectID(activeID.id)}).toArray((err, docs) => {
//         // console.log('ABFDS', docs);
//         if(docs.length === 0) {
//             db.get().collection('needs').find().toArray((err, docs) => {
//                 // console.log('lists: ', docs);
//                 cb(err, docs);
//             })
//         } else {
//             cb(err, false);
//         }
//     })
// }

exports.allNeeds = (activeID, cb) => {
    db.get().collection('todolists').find({_id: ObjectID(activeID)}, {needs: 1}).toArray((err, docs) => {
        console.log('ABFDS', docs[0].needs);
        if(docs.length != 0) {
                cb(err, docs[0].needs);
        } else {
            cb(err, false);
        }
    })
}


// exports.todoesList = (cb) => {
//     db.get().collection('needs').find({_id: steve.company.$id}).toArray((err, docs) => {
//         cb(err, docs);
//     })
// }

// let ObjectID = require('mongodb').ObjectID;


// module.exports = 