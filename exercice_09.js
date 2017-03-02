const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));

var db;

MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresses', (err, database) => {
	if (err) return console.log(err)
	db = database
	app.listen(8081, () => {
		console.log('connexion à la BD et on écoute sur le port 8081');
	})
})

app.get('/',  (req, res) => {
  console.log('la route route get / = ' + req.url)
  var cursor = db.collection('adresses').find().toArray(function(err, resultat){
    if (err) return console.log(err);
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {liste: resultat});
  })
})


app.post('/ajouter', function (req, res) {

	nouvelUtilisateur = {
		nom:req.body.nom,
		prenom:req.body.prenom,
		telephone:req.body.telephone,
		ville:req.body.ville,
		codepostal:req.body.codepostal
	};
	console.log('reponse');

	db.collection('adresses').save(nouvelUtilisateur, (err, result) => {
		if (err) return console.log(err);
		console.log('sauvegarder dans la BD');
		res.redirect('/');
	});
})