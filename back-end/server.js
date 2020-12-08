const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});

app.post('/api/jokes', async (req, res) => {
  const pun = new Item({
    title: req.body.title,
    description: req.body.description,
    comments: req.body.comments,
  });
  try {
    await pun.save();
    res.send(pun);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  comments: Array,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);



// Get a list of all of the items in the museum.
app.get('/api/jokes', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete an item from the list
app.delete('/api/jokes/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Edit an item from the list
app.put('/api/jokes/:id', async (req, res) => {
  try {
    let item = await Item.findOne({
      _id: req.params.id
    });
    item.title = req.body.title;
    item.description = req.body.description;
    item.comments = req.body.comments;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
