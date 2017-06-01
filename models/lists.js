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

exports.allNeeds = (activeID, cb) => {
    db.get().collection('todolists').find({_id: ObjectID(activeID)}, {needs: 1}).toArray((err, docs) => {
        // console.log('ABFDS', docs[0].needs);
        if(docs.length != 0) {
                cb(err, docs[0]);
        } else {
            cb(err, false);
        }
    })
}

// exports.addTodo = (activeID, todo, cb) => {
//     // db.get().collection('todolists').update({_id: ObjectID(activeID)}, {$push: {needs: {task: todo.task, isCompleted: todo.isCompleted}}});
//     //     console.log('ABFDS1: ', docs[0].needs);
//     db.get().collection('todolists').update({_id: ObjectID(activeID)}, { $push: { needs: { task: todo.task, isCompleted: todo.isCompleted } } }, {new: true}, (err, docs) => {
//                 // console.log(docs.task._id);
//                 cb(err, docs);
//     })
// }   

exports.addTodo = (activeID, todo, cb) => {
    // db.get().collection('todolists').update({_id: ObjectID(activeID)}, {$push: {needs: {task: todo.task, isCompleted: todo.isCompleted}}});
    //     console.log('ABFDS1: ', docs[0].needs);
    db.get().collection('todolists').findOneAndUpdate({_id: ObjectID(activeID)}, { $push: { needs: { task: todo.task, isCompleted: todo.isCompleted } } }, {new: true}, (err, doc) => {
                if (err) return next(err);
                // console.log(doc.needs[doc.needs.length-1].task);
                cb(err, doc);
    })
}   

exports.toggleTodo = (activeID, todo, cb) => {
    db.get().collection('todolists').findOneAndUpdate({_id: ObjectID(activeID)}, { needs: { task: todo.task, isCompleted: !todo.isCompleted } }, {new: true}, (err, doc) => {
                if (err) return next(err);
                // console.log(doc.needs[doc.needs.length-1].task);
                cb(err, doc);
    })
}   