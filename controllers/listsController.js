import Lists from '../models/lists';

exports.allLists = (req, res) => {
    Lists.allLists((err, docs) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            res.send(docs);
        }
    })
}

exports.createList = (req, res) => {
    Lists.createList(req.body, (err, result) => {
        if(err || !result) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.send(result.ops[0]);
        }
    })
}

exports.allNeeds = (req, res) => {
    // console.log("Needs REQ:", req.params.id);
    Lists.allNeeds(req.params.id, (err, docs) => {
        if(err || !docs) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            res.send(docs);
        }
    })
}

exports.addTodo = (req, res) => {
    Lists.addTodo(req.params.id, req.body, (err, result) => {
        if(err || !result) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.send(result);
        }
    })
}

exports.toggleTodo = (req, res) => {
    Lists.addTodo(req.params.id, req.body, (err, result) => {
        if(err || !result) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.send(result);
        }
    })
}