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


app.post('/ajouter', urlencodedParser, function (req, res) {

	nouvelUtilisateur = {
		nom:req.body.nom,
		prenom:req.body.prenom,
		telephone:req.body.telephone,
		ville:req.body.ville,
		codepostal:req.body.codepostal,
		lamethode: "POST"
	};
	console.log('reponse');

	var lUtilisateur = JSON.stringify(nouvelUtilisateur);

	db.collection('adresses').save(lUtilisateur, (err, result) => {
		if (err) return console.log(err);
		console.log('sauvegarder dans la BD');
		res.redirect('/');
	});
})