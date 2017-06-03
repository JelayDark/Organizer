import Contacts from '../models/contacts';

exports.allContacts = (req, res) => {
    Contacts.allContacts((err, docs) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            res.send(docs);
        }
    })
}

exports.addContact = (req, res) => {
    Contacts.addContact(req.body, (err, result) => {
        if(err || !result) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.send(result.ops[0]);
        }
    })
}

exports.deleteContact = (req, res) => {
    Contacts.deleteContact(req.params.id, (err, result) => {
        if(err || !result) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    })
}

exports.editContact = (req, res) => {
    Contacts.editContact(req.params.id, req.body, (err, result) => {
        if(err || !result) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.send(result);
        }
    })
}
