const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/project")
const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
const user = mongoose.Schema({
  name: String,
  password: String,
  gameName: String,
  phone: String,
  sex: String,
  position: String,
  image: String
});
const Models = {
  user: mongoose.model('user', user)
}

module.exports = Models;
