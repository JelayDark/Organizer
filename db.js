import { MongoClient } from 'mongodb';

let state = {
    db: null
}

exports.connect = (url, done) => {
    if(state.db) {
        return done();
    }

    MongoClient.connect(url, (err, db) =>{
        if(err) {
            return done(err);
        } else {
            state.db = db;
            done();
        }
    })
}

exports.get = () => {
    return state.db;
}