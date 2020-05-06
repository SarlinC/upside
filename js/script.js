let divForm2 = document.getElementById("secondForm");
divForm2.style.display = "none";

let form = document.getElementById("form");

let nom = document.getElementById("nom_id");
let prenom = document.getElementById("prenom_id");
let email = document.getElementById("email_id");
let tel = document.getElementById("tel_id");


let form2 = document.getElementById("date");

let date = document.getElementById("date_id");
let moment = document.getElementById("moment_id");
let nombreDePersonne = document.getElementById("nombre_id");
let traiteur = document.getElementById("traiteur");
let boisson = document.getElementById("boisson");

form.addEventListener("submit", function() {
	if (tel.value != "") {
		requeteUser(nom.value, prenom.value, email.value, tel.value);
	}
	else {
		requeteUser(nom.value, prenom.value, email.value);
	}
	form.parentNode.remove(form);
	divForm2.style.display = "block";
});

form2.addEventListener("submit", function() {
	requeteDevis(nom.value, prenom.value, email.value, date.value, moment.value, nombreDePersonne.value, traiteur.value, boisson.value);
});


function callback(req) {
	//let tab = JSON.parse(req.responseText);
	console.log(req.responseText);
	/*let tab2 = [tab.length];

	for (let i = 0; i < tab.length; i ++) {
		tab2[i] = tab[i].name;
	}*/
}

function requeteUser(nom, prenom, email) {
	requeteAJAX(nom, prenom, email, callback);
}

function requeteUser(nom, prenom, email, tel) {
	requeteAJAX(nom, prenom, email, tel, callback);
}

function requeteDevis(date, moment, nombreDePersonne, traiteur, boisson) {
	requeteAJAXDevis(date, moment, nombreDePersonne, traiteur, boisson, callback);
}

//Requête Ajax pour la création d'un utilisateur sans téléphone

function requeteAJAX(nom, prenom, email, callback) {

	let url = "php/requeteUtilisateur.php?nom=" + nom + "&prenom=" + prenom + "&email=" + email;
	let requete = new XMLHttpRequest();

	requete.open("GET", url, true);

	requete.addEventListener("load", function () {
		callback(requete);
	});

	requete.send(null);
}

//Requête Ajax pour la création d'un utilisateur avec téléphone

function requeteAJAX(nom, prenom, email, tel, callback) {

	let url = "php/requeteUtilisateur.php?nom=" + nom + "&prenom=" + prenom + "&email=" + email + "&tel=" + tel;
	let requete = new XMLHttpRequest();

	requete.open("GET", url, true);

	requete.addEventListener("load", function () {
		callback(requete);
	});

	requete.send(null);
	
}

//Requête Ajax pour la création des devis.

function requeteAJAXDevis(nom, prenom, email, date, moment, nombreDePersonne, traiteur, boisson, callback) {
	let url = "php/requeteDevis.php?date=" + date + "&moment=" + moment + "&nombreDePersonne=" + nombreDePersonne + "&traiteur=" + traiteur + "&boisson" + boisson + "&nom=" + nom + "&prenom=" + prenom + "&email=" + email;
	let requete = new XMLHttpRequest();

	requete.open("GET", url, true);

	requete.addEventListener("load", function () {
		callback(requete);
	});

	requete.send(null);
}

let popup = document.getElementById("nombre_id");

popup.addEventListener("change", function() {
	if (popup.value >= 30) {
		alert("En choisissant cette option, nous vous privatisons le parc.");
	}
});