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

exports.deleteList = (id, cb) => {
    db.get().collection('todolists').deleteOne({ _id: ObjectID(id) }, (err, result) => {
                cb(err, result);
            })
}

exports.allNeeds = (activeID, cb) => {
    // console.log(activeID);
    db.get().collection('todolists').find({_id: ObjectID(activeID)}, {needs: 1}).toArray((err, docs) => {
        // console.log('ABFDS', docs[0].needs);
        if(docs.length != 0) {
                cb(err, docs[0]);
        } else {
            cb(err, false);
        }
    })
}

exports.addTodo = (activeID, todo, cb) => {
    db.get().collection('todolists').find({_id: ObjectID(activeID), "needs.task": todo.task}).toArray((err, docs) => {
        if(docs.length === 0) {
            db.get().collection('todolists').findOneAndUpdate({_id: ObjectID(activeID)}, { $push: {
                                                                                     needs: { 
                                                                                         task: todo.task, 
                                                                                         isCompleted: todo.isCompleted 
                                                                                        } 
                                                                                    } 
                                                                                }, {returnOriginal: false}, (err, doc) => {
                cb(err, doc);
    })
        } else {
            cb(err, false);
        }
    })
}   

exports.deleteTodo = (activeID, todo, cb) => {
    db.get().collection('todolists').findOneAndUpdate({ _id: ObjectID(activeID)
                                                        }, { $pull: {needs: {task: todo.task}} }, {returnOriginal: false}, (err, doc) => {
                cb(err, doc);
            })
} 


exports.toggleTodo = (activeID, todo, cb) => {
    db.get().collection('todolists').findOneAndUpdate({
                                            _id: ObjectID(activeID),
                                            needs: { $elemMatch: { task: todo.task } }
                                        }, { $set:{ "needs.$.isCompleted" : todo.isCompleted} }, {returnOriginal: false}, (err, doc) => {
                cb(err, doc);
    })
}   