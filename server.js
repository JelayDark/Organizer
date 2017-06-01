import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import auth from './routes/auth';
import db from './db';
import usersController from './controllers/usersController';
import listsController from './controllers/listsController';

const app = express();

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
}


app.post('/api/auth', usersController.checkLogin);
app.get('/api/users', usersController.allUsers);

app.get('/api/todolists', listsController.allLists);
app.post('/api/todolists/create', listsController.createList);

app.post('/api/todolists/needs/:id', listsController.allNeeds);
app.post('/api/needs/add/:id', listsController.addTodo);
app.post('/api/needs/toggle/:id', listsController.toggleTodo);


db.connect('mongodb://localhost:27017/takeyourtime', (err, database) => {
    if(err) {
      return console.log(err);
    }
    
    app.listen(app.get('port'), () => {
        console.log(`Find the server at: http://localhost:${app.get('port')}/`);
    });
});