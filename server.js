const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var db;

let port = 3000;

// View Engine
app.set('view engine', 'ejs')


// Middleware Functions
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())

// CRUD Functions
app.get('/', (req, res) => {
  db.collection('names').find().toArray((err, result) =>{
    if(err) return console.log(err);

    res.render('index.ejs', {names: result})
  })
})

app.post('/names', (req, res) => {
  db.collection('names').insertOne(req.body, (err, result) => {
    if(err) return console.log(err);

    console.log("Saved to db");
    res.redirect('/')
  })
})

app.put('/names', (req, res) => {
  db.collections('names')
  .findOneAndUpdate({FirstName: 'Nikolay'}, {
    $set: {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if(err) return res.send(err)
    res.send(result)
  })
})

app.delete('/names', (req, res) => {
  db.collection('quotes').
    findOneAndDelete({name: req.body.name}, (err, result) => {
      if(err) return res.send(500, err)
      res.send({message: 'Suk was deleted'})
    })
})

// Server starts Only if db is connected
MongoClient.connect('mongodb://qweeeq:qweeeq1@ds157493.mlab.com:57493/kolunya', (err, client) => {
  if(err) return console.log(err);
  db = client.db('kolunya')
  console.log("DB is connected");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
})
