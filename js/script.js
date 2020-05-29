//Partie 1er Formulaire
let form = document.getElementById("form");

let nom = document.getElementById("nom_id");
let prenom = document.getElementById("prenom_id");
let email = document.getElementById("email_id");
let tel = document.getElementById("tel_id");

form.addEventListener("submit", function() {
	if (tel.value != "") {
		requeteUser(nom.value, prenom.value, email.value, tel.value);
	}
	else {
		requeteUser(nom.value, prenom.value, email.value);
	}
	form.parentNode.remove(form);
	divForm2.style.display = "block";
	prix.style.display = "flex";
});

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

//Partie 2nd Formulaire

let divForm2 = document.getElementById("secondForm");
divForm2.style.display = "none";

document.getElementById("traiteur").style.display = "none";
document.getElementById("boisson").style.display = "none";
document.getElementById("wait").style.display = "none";

let form2 = document.getElementById("date");

let date = document.getElementById("date_id");
let moment = document.getElementById("moment_id");
let nombreDePersonne = document.getElementById("nombre_id");
let remarque = document.getElementById("remarque_id");

let prix = document.getElementById("prix");
prix.style.display = "none";

let traiteur = document.getElementsByName("traiteur");
let boisson = document.getElementsByName("boisson");
let wait = document.getElementsByName("wait");

let traiteur2 = document.getElementsByName("traiteur2");
let boisson2 = document.getElementsByName("boisson2");
let wait2 = document.getElementsByName("wait2");

let pTraiteur = 0;
let pBoisson = 0;
let pWait = 0;
let pTotal = 0;

traiteur[0].addEventListener("click", function() {
	document.getElementById("traiteur").style.display = "block";
});

traiteur[1].addEventListener("click", function() {
	document.getElementById("traiteur").style.display = "none";
	if (pTotal >= 0) {
		for (let i = 0; i < 3; i ++) {
			if (traiteur2[i].checked) {
				pTraiteur = 0;
				pTotal = pTotal - (traiteur2[i].value * nombreDePersonne.value);
				prix.innerHTML = "Coût : " + pTotal + " €";
				traiteur2[i].checked = false;
			}
		}
	}
	else {
		prix.innerHTML = "";
	}
});

boisson[0].addEventListener("click", function() {
	document.getElementById("boisson").style.display = "block";
});

boisson[1].addEventListener("click", function() {
	document.getElementById("boisson").style.display = "none";
	if (pTotal >= 0) {
		for (let i = 0; i < 3; i ++) {
			if (boisson2[i].checked) {
				pBoisson = 0;
				pTotal = pTotal - (boisson2[i].value * nombreDePersonne.value);
				prix.innerHTML = "Coût : " + pTotal + " €";
				boisson2[i].checked = false;
			}
		}
	}
	else {
		prix.innerHTML = "";
	}
});

wait[0].addEventListener("click", function() {
	document.getElementById("wait").style.display = "block";
});

wait[1].addEventListener("click", function() {
	document.getElementById("wait").style.display = "none";
	if (pTotal >= 0) {
		for (let i = 0; i < 3; i ++) {
			if (wait2[i].checked) {
				pWait = 0;
				pTotal = pTotal - (wait2[i].value * nombreDePersonne.value);
				prix.innerHTML = "Coût : " + pTotal + " €";
				wait2[i].checked = false;
			}
		}
	}
	else {
		prix.innerHTML = "";
	}
});

for (let i = 0; i < 3; i ++) {
	traiteur2[i].addEventListener("click", function() {
		if (nombreDePersonne.value == 0) {
			alert("Veuillez sélectionnez un nombre de participants !");
		}
		else {
			if (traiteur2[i].checked) {
				pTraiteur = traiteur2[i].value * nombreDePersonne.value;
			}
			pTotal = pTraiteur + pBoisson + pWait;
			prix.innerHTML = "Coût : " + pTotal + " €";
		}
	});

	boisson2[i].addEventListener("click", function() {
		if (nombreDePersonne.value == 0) {
			alert("Veuillez sélectionnez un nombre de participants !");
		}
		else {
			if (boisson2[i].checked) {
				pBoisson = boisson2[i].value * nombreDePersonne.value;
			}
			pTotal = pTraiteur + pBoisson + pWait;
			prix.innerHTML = "Coût : " + pTotal + " €";
		}
	});

	wait2[i].addEventListener("click", function() {
		if (nombreDePersonne.value == 0) {
			alert("Veuillez sélectionnez un nombre de participants !");
		}
		else {
			if (wait2[i].checked) {
				pWait = wait2[i].value * nombreDePersonne.value;
			}
			pTotal = pTraiteur + pBoisson + pWait;
			prix.innerHTML = "Coût : " + pTotal + " €";
		}
	});
}

let popup = document.getElementById("nombre_id");

popup.addEventListener("change", function() {
	if (popup.value >= 30) {
		alert("En choisissant cette option, nous vous privatisons le parc.");
	}
});

form2.addEventListener("submit", function() {
	document.getElementById("choix").style.display = "flex";

	form2.parentNode.remove(form2);

	document.getElementById("formule1").innerHTML = calculPrix(nombreDePersonne.value, 30) + " €";

	document.getElementById("formule2").innerHTML = calculPrix(nombreDePersonne.value, 18) + " €";

	document.getElementById("formule3").innerHTML = calculPrix(nombreDePersonne.value, 9) + " €";
});

//Partie choix d'un prix

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

function callback2(req, duree) {
	requeteSaveDevis(req.responseText, duree, date.value, nombreDePersonne.value, t, b, remarque.value);
}

function calculPrix(nbr, value) {
	return nbr / value * 13 * 30;
}

document.getElementById("choix1").addEventListener("click", function() {
	let duree = nombreDePersonne.value * 20;
	let price = document.getElementById("formule1").innerHTML;

	requeteSelectUser(nom.value, prenom.value, email.value, duree);
});

document.getElementById("choix2").addEventListener("click", function() {
	let duree = nombreDePersonne.value * 30;
	let price = document.getElementById("formule2").innerHTML;

	requeteSelectUser(nom.value, prenom.value, email.value, duree);
});

document.getElementById("choix3").addEventListener("click", function() {
	let duree = nombreDePersonne.value * 60;
	let price = document.getElementById("formule3").innerHTML;

	requeteSelectUser(nom.value, prenom.value, email.value, duree);
});

//Partie affichage du devis

document.getElementById("tableau").style.display = "none";

//Partie générale

function callback(req) {
	console.log(req.responseText);
}