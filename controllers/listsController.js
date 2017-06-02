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

exports.deleteList = (req, res) => {
    Lists.deleteList(req.params.id, (err, result) => {
        if(err || !result) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    })
}

exports.allNeeds = (req, res) => {
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
    Lists.addTodo(req.params.id, req.body, (err, doc) => {
        if(err || !doc) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.send(doc);
        }
    })
}

exports.deleteTodo = (req, res) => {
    Lists.deleteTodo(req.params.id, req.body, (err, result) => {
        if(err || !result) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.send(result);
        }
    })
}

exports.toggleTodo = (req, res) => {
    Lists.toggleTodo(req.params.id, req.body, (err, result) => {
        if(err || !result) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.send(result);
        }
    })
}