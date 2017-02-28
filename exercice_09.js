const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

var db;

MongoClient.connect('mongodb://jonathan-lauzon:e1206261@ds053764.mlab.com:53764/carnet_adresses', (err, database) => {
	if (err) return console.log(err)
	db = database
	app.listen(8081, () => {
		console.log('connexion à la BD et on écoute sur le port 8081');
	})
}


