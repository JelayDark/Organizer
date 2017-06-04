import db from '../db';
import { ObjectID } from 'mongodb';

exports.addEvent = (event, cb) => {
    db.get().collection('events').insert({
                                     title: event.title, 
                                     start: event.start, 
                                     end: event.end, 
                                     desc: event.desc
                                    }, (err, result) => {
        cb(err, result);
    })
}

exports.getEvents = (cb) => {
    db.get().collection('events').find().toArray((err, docs) => {
        cb(err, docs);
    })
}

exports.deleteEvent = (id, cb) => {
    db.get().collection('events').remove({ _id: ObjectID(id) }, (err, result) => {
        if(result) {
                    db.get().collection('events').find().toArray((err, docs) => {
                        cb(err, docs);
                    })} else cb(err, result);
            })
}

exports.editEvent = (activeID, event, cb) => {
    db.get().collection('events').findOneAndUpdate({
                                            _id: ObjectID(activeID)
                                        }, { $set:{ title: event.title, 
                                                    desc: event.desc
                                                } }, {returnOriginal: false}, (err, doc) => {
                if(doc) {
                    db.get().collection('events').find().toArray((err, docs) => {
                        cb(err, docs);
                    })
                }else cb(err, doc);
    })
} 

