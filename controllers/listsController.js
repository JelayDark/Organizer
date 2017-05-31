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
    console.log("Create REQ:", req.body);
    Lists.createList(req.body, (err, result) => {
        if(err || !result) {
            console.log(err);
            return res.sendStatus(400);
        } else {
            res.send(result.ops[0]);
        }
    })
}

// exports.allNeeds = (req, res) => {
//     console.log("Needs REQ:", req.params.id);
//     Lists.allNeeds(req.body, (err, docs) => {
//         if(err || !docs) {
//             console.log(err);
//             return res.sendStatus(500);
//         } else {
//             res.send(docs);
//         }
//     })
// }

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