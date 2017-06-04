import Events from '../models/events';

exports.addEvent = (req, res) => {
    Events.addEvent(req.body, (err, result) => {
        if(err || !result) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.send(result.ops[0]);
        }
    })
}

exports.getEvents = (req, res) => {
    Events.getEvents((err, docs) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            res.send(docs);
        }
    })
}

exports.deleteEvent = (req, res) => {
    Events.deleteEvent(req.params.id, (err, result) => {
        if(err || !result) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    })
}

exports.editEvent = (req, res) => {
    Events.editEvent(req.params.id, req.body, (err, result) => {
        if(err || !result) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.send(result);
        }
    })
}