import Users from '../models/users';
// import Lists from '../models/lists';

exports.checkLogin = (req, res) => {
    Users.checkLogin(req.body, (err, docs) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            if(docs.length === 0) {
                return res.sendStatus(401);
            } else {
                return res.sendStatus(200);
            }
        }
    })
}

exports.allUsers = (req, res) => {
    Users.allUsers((err, docs) => {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            res.send(docs);
        }
    })
}