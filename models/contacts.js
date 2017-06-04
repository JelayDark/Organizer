import db from '../db';
import { ObjectID } from 'mongodb';

exports.allContacts = (cb) => {
    db.get().collection('contacts').find().toArray((err, docs) => {
        cb(err, docs);
    })
}

exports.addContact = (user, cb) => {
    db.get().collection('contacts').insert({ name: user.name, company: user.company, phone: user.phone, email: user.email, image: user.image, about: user.about }, (err, result) => {
        cb(err, result);
    })
}

exports.deleteContact = (id, cb) => {
    db.get().collection('contacts').remove({ _id: ObjectID(id) }, (err, result) => {
                cb(err, result);
            })
}

exports.editContact = (activeID, user, cb) => {
    db.get().collection('contacts').findOneAndUpdate({
                                            _id: ObjectID(activeID)
                                        }, { $set:{ name: user.name, 
                                                    company: user.company, 
                                                    phone: user.phone, 
                                                    email: user.email, 
                                                    image: user.image,
                                                    about: user.about
                                                } }, {returnOriginal: false}, (err, doc) => {
                if(doc) {
                    db.get().collection('contacts').find().toArray((err, docs) => {
                        cb(err, docs);
                    })
                }else cb(err, doc);
    })
} 

