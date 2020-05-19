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
let remarque = document.getElementById("remarque_id");

let traiteur = document.getElementsByName("traiteur");
let t;

let boisson = document.getElementsByName("boisson");
let b;

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
	document.getElementById("choix").style.display = "flex";

	if (traiteur[0].checked) {
		t = 1;
	}
	else {
		t = 0;
	}

	if (boisson[0].checked) {
		b = 1;
	}
	else {
		b = 0;
	}

	form2.parentNode.remove(form2);

	document.getElementById("formule1").innerHTML = calculPrix(nombreDePersonne.value, 30) + " €";

	document.getElementById("formule2").innerHTML = calculPrix(nombreDePersonne.value, 18) + " €";

	document.getElementById("formule3").innerHTML = calculPrix(nombreDePersonne.value, 9) + " €";
});


function callback(req) {
	console.log(req.responseText);
}

function callback2(req, duree) {
	requeteSaveDevis(req.responseText, duree, date.value, nombreDePersonne.value, t, b, remarque.value);
}

function requeteUser(nom, prenom, email) {
	requeteSaveUser(nom, prenom, email);
}

function requeteUser(nom, prenom, email, tel) {
	requeteSaveUser(nom, prenom, email, tel);
}

//Requête Ajax pour la création d'un utilisateur sans téléphone

function requeteSaveUser(nom, prenom, email) {

	let url = 'php/requeteUtilisateur.php?nom=' + nom + '&prenom=' + prenom + '&email=' + email;
	let requete = new XMLHttpRequest();

	requete.open("GET", url, true);

	requete.addEventListener("load", function () {
		callback(requete);
	});

	requete.send(null);
}

//Requête Ajax pour la création d'un utilisateur avec téléphone

function requeteSaveUser(nom, prenom, email, tel) {

	let url = 'php/requeteUtilisateur.php?nom=' + nom + '&prenom=' + prenom + '&email=' + email + '&tel=' + tel;
	let requete = new XMLHttpRequest();

	requete.open("GET", url, true);

	requete.addEventListener("load", function () {
		callback(requete);
	});

	requete.send(null);
}

//Requête Ajax pour la création des devis.

function requeteSaveDevis(user, duree, date, nombreDePersonne, traiteur, boisson, remarque) {
	let url = "php/requeteDevis.php?date=" + date + "&duree=" + duree + "&nombreDePersonne=" + nombreDePersonne + "&traiteur=" + traiteur +
	"&boisson=" + boisson + "&remarque=" + remarque + "&user=" + user;
	let requete = new XMLHttpRequest();

	requete.open("GET", url, true);

	requete.addEventListener("load", function () {
		callback(requete);
	});

	requete.send(null);
}

function requeteSelectUser(nom, prenom, email, duree) {
	let url = "php/requeteSelectUser.php?nom=" + nom + "&prenom=" + prenom + "&email=" + email;
	let requete = new XMLHttpRequest();

	requete.open("GET", url, true);

	requete.addEventListener("load", function () {
		callback2(requete, duree);
	});

	requete.send(null);
}

let popup = document.getElementById("nombre_id");

popup.addEventListener("change", function() {
	if (popup.value >= 30) {
		alert("En choisissant cette option, nous vous privatisons le parc.");
	}
});

function calculPrix(nbr, value) {
	return nbr / value * 9 * 30;
}

document.getElementById("choix1").addEventListener("click", function() {
	let duree = nombreDePersonne.value * 20;

	requeteSelectUser(nom.value, prenom.value, email.value, duree);
});

document.getElementById("choix2").addEventListener("click", function() {
	let duree = nombreDePersonne.value * 30;

	requeteSelectUser(nom.value, prenom.value, email.value, duree);
});

document.getElementById("choix3").addEventListener("click", function() {
	let duree = nombreDePersonne.value * 60;

	requeteSelectUser(nom.value, prenom.value, email.value, duree);
});