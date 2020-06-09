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

let form2 = document.getElementById("date");

let date = document.getElementById("date_id");
let moment = document.getElementById("moment_id");
let nombreDePersonne = document.getElementById("nombre_id");
let remarque = document.getElementById("remarque_id");

let prix = document.getElementById("prix");
prix.style.display = "none";

let traiteur = document.getElementsByName("traiteur");
let boisson = document.getElementsByName("boisson");

let traiteur2 = document.getElementsByName("traiteur2");
let boisson2 = document.getElementsByName("boisson2");

let pTraiteur = 0;
let pBoisson = 0;
let pTotal = 0;

let t;
let b;

let prixUtraiteur = 0;
let prixTtraiteur = 0;

let prixUboisson = 0;
let prixTboisson = 0;

traiteur[0].addEventListener("click", function() {
	document.getElementById("traiteur").style.display = "block";
	document.getElementById("tarifTraiteur").innerHTML = "Forfait traiteur";
	t = 1;
});

traiteur[1].addEventListener("click", function() {
	document.getElementById("traiteur").style.display = "none";
	document.getElementById("tarifTraiteur").innerHTML = "";
	t = 0;
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
	document.getElementById("tarifBar").innerHTML = "Forfait BAR";
	b = 1;
});

boisson[1].addEventListener("click", function() {
	document.getElementById("boisson").style.display = "none";
	document.getElementById("tarifBar").innerHTML = "";
	b = 0;
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

for (let i = 0; i < 3; i ++) {
	traiteur2[i].addEventListener("click", function() {
		if (nombreDePersonne.value == 0) {
			alert("Veuillez sélectionnez un nombre de participants !");
		}
		else {
			if (traiteur2[i].checked) {
				pTraiteur = traiteur2[i].value * nombreDePersonne.value;
			}
			pTotal = pTraiteur + pBoisson;
			prix.innerHTML = "Coût : " + pTotal + " €";

			if (traiteur2[0].checked) {
				document.getElementById("nombre").innerHTML = "entrée/plat";
				document.getElementById("prixUtraiteur").innerHTML = "15 €";
				prixUtraiteur = 15;
			}
			if (traiteur2[1].checked) {
				document.getElementById("nombre").innerHTML = "plat/dessert";
				document.getElementById("prixUtraiteur").innerHTML = "20 €";
				prixUtraiteur = 20;
			}
			if (traiteur2[2].checked) {
				document.getElementById("nombre").innerHTML = "entrée/plat/dessert";
				document.getElementById("prixUtraiteur").innerHTML = "30 €";
				prixUtraiteur = 30;
			}

			document.getElementById("prixTtraiteur").innerHTML = pTraiteur + " €";
			prixTtraiteur = pTraiteur;
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
			pTotal = pTraiteur + pBoisson;
			prix.innerHTML = "Coût : " + pTotal + " €";

			if (boisson2[0].checked) {
				document.getElementById("nombreDeBoisson").innerHTML = "1";
				document.getElementById("prixUboisson").innerHTML = "3 €";
				prixUboisson = 3;
			}
			if (boisson2[1].checked) {
				document.getElementById("nombreDeBoisson").innerHTML = "2";
				document.getElementById("prixUboisson").innerHTML = "5 €";
				prixUboisson = 5;
			}
			if (boisson2[2].checked) {
				document.getElementById("nombreDeBoisson").innerHTML = "3";
				document.getElementById("prixUboisson").innerHTML = "10 €";
				prixUboisson = 10;
			}

			document.getElementById("prixTboisson").innerHTML = pBoisson + " €";
			prixTboisson = pBoisson;
		}
	});
}

form2.addEventListener("submit", function() {
	document.getElementById("choix").style.display = "flex";

	form2.parentNode.remove(form2);

	prix.style.display = "none";
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

function requeteSelectUser(nom, prenom, email) {
	let url = "php/requeteSelectUser.php?nom=" + nom + "&prenom=" + prenom + "&email=" + email;
	let requete = new XMLHttpRequest();

	requete.open("GET", url, true);

	requete.addEventListener("load", function () {
		callback2(requete);
	});

	requete.send(null);
}

function callback2(req, duree, prixUpersonne) {
	let prixTpersonne = prixUpersonne * nombreDePersonne.value;

	requeteSaveDevis(req.responseText, duree.value, date.value, nombreDePersonne.value, t, b, remarque.value);
}

let dureePers;

function calculPrix(prixBase) {
	let coeff = ((duree.value * 13) / nombreDePersonne.value) / 100;
	if (coeff <= 1) {
		dureePers = 30;
	}
	else if (coeff > 1 || coeff < 1.5) {
		dureePers = 60;
	}
	else if (coeff >= 1.5 || coeff < 2) {
		dureePers = 60;

	}
}

function afficherTab() {
	document.getElementById("tableau").style.display = "flex";
}

function private() {
	if (nombreDePersonne.value >= 30) {
		document.getElementById("private").innerHTML = "Privatisation du parc Upside";
	}
}

//Partie affichage du devis

document.getElementById("tableau").style.display = "none";

//Partie générale

function callback(req) {
	console.log(req.responseText);
}

let reunion = document.getElementsByName("reunion");
let meeting = document.getElementsByName("meeting");
let nombreReunion = document.getElementById("nombreReunion");

document.getElementById("meeting").style.display = "none";

nombreReunion.style.display = "none";

reunion[0].addEventListener("click", function () {
	document.getElementById("meeting").style.display = "block";
});

reunion[1].addEventListener("click", function() {
	document.getElementById("meeting").style.display = "none";
	for (let i = 0; i != 2; i ++) {
		meeting[i].checked = false;
	}
	nombreReunion.style.display = "none";
});

meeting[0].addEventListener("click", function() {
	nombreReunion.style.display = "flex";
	nombreReunion.setAttribute("max", "25");
});

meeting[1].addEventListener("click", function() {
	nombreReunion.style.display = "flex";
	nombreReunion.setAttribute("max", "60");
});

let maDate;

let jour;
let mois;
let annee;

date.addEventListener("change", function() {
	jour = date.value.slice(0,2);
	mois = date.value.slice(3,5);
	annee = date.value.slice(6,10);

	maDate = new Date(annee, mois - 1, jour);

	let prixBase = 0;

	if (maDate.getDay() == 5 || maDate.getDay() == 6) {
		if (moment.value == "matinee") {
			prixBase = 25;
		}
		else {
			prixBase = 30;
		}
	}
	else {
		if (moment.value == "matinee" || moment.value == "apresmidi" || moment.value == "journee") {
			prixBase = 20;
		}
		else {
			prixBase = 25;
		}
	}

	moment.addEventListener("change", function() {
		if (maDate.getDay() == 5 || maDate.getDay() == 6 && nombreDePersonne.value >= 20) {
			if (moment.value == "journee" || moment.value == "soiree") {
				document.getElementById("cd-popup").setAttribute("class", "is-visible");
			}
		}
		else {
			if (moment.value == "soiree" && nombreDePersonne.value >= 20) {
				document.getElementById("cd-popup").setAttribute("class", "is-visible");
			}
		}
	});
});

let popup = document.getElementById("nombre_id");

popup.addEventListener("change", function() {
	if (nombreDePersonne.value >= 20) {
		document.getElementById("cd-popup").setAttribute("class", "is-visible");
	}
});

document.getElementById("ok").addEventListener("click", removeClass);
document.getElementById("annuler").addEventListener("click", removeClass);

function removeClass() {
	document.getElementById("cd-popup").removeAttribute("class", "is-visible");
}

let duree = document.getElementById("duree_id");