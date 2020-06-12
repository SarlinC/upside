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
let duree = document.getElementById("duree_id");

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

let prixUtraiteur = 0;

let prixUboisson = 0;

let prixUwait = 0;

traiteur[0].addEventListener("click", function() {
	document.getElementById("traiteur").style.display = "block";
	document.getElementById("tarifTraiteur").innerHTML = "Forfait traiteur";
	document.getElementById("tr").style.display = "visible";
});

traiteur[1].addEventListener("click", function() {
	document.getElementById("traiteur").style.display = "none";
	document.getElementById("tarifTraiteur").innerHTML = "";
	document.getElementById("tr").style.display = "none";

	for (let i = 0; i < 3; i ++) {
		if (traiteur2[i].checked) {
			pTraiteur = 0;
			pTotal = pTotal - (traiteur2[i].value * nombreDePersonne.value);
			traiteur2[i].checked = false;
		}
	}
	prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
});

boisson[0].addEventListener("click", function() {
	document.getElementById("boisson").style.display = "block";
	document.getElementById("tarifBar").innerHTML = "Forfait BAR";
	document.getElementById("bar").style.display = "visible";
});

boisson[1].addEventListener("click", function() {
	document.getElementById("boisson").style.display = "none";
	document.getElementById("tarifBar").innerHTML = "";
	document.getElementById("bar").style.display = "none";

	for (let i = 0; i < 3; i ++) {
		if (boisson2[i].checked) {
			pBoisson = 0;
			pTotal = pTotal - (boisson2[i].value * nombreDePersonne.value);
			boisson2[i].checked = false;
		}
	}
	prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
});

wait[0].addEventListener("click", function() {
	document.getElementById("wait").style.display = "block";
	document.getElementById("tarifWait").innerHTML = "Forfait simulateur";
	document.getElementById("simulateur").style.display = "visible";
});

wait[1].addEventListener("click", function() {
	document.getElementById("wait").style.display = "none";
	document.getElementById("tarifWait").innerHTML = "";
	document.getElementById("simulateur").style.display = "none";

	for (let i = 0; i < 3; i ++) {
		if (wait2[i].checked) {
			pWait = 0;
			pTotal = pTotal - (wait2[i].value * nombreDePersonne.value);
			wait2[i].checked = false;
		}
	}
	prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
});

for (let i = 0; i < 3; i ++) {
	traiteur2[i].addEventListener("click", function() {
		if (nombreDePersonne.value == 0) {
			document.getElementById("alert").innerHTML = "Veuillez sélectionner un nombre de participants !"
			document.getElementById("cd-popup").setAttribute("class", "is-visible");
		}
		else {
			if (traiteur2[i].checked) {
				pTraiteur = traiteur2[i].value * nombreDePersonne.value;
			}
			pTotal = pTraiteur + pBoisson + pWait;
			prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";

			if (traiteur2[0].checked) {
				document.getElementById("menu").innerHTML = "entrée/plat";
				document.getElementById("prixUtraiteur").innerHTML = "15 €";
				prixUtraiteur = 15;
			}
			if (traiteur2[1].checked) {
				document.getElementById("menu").innerHTML = "plat/dessert";
				document.getElementById("prixUtraiteur").innerHTML = "20 €";
				prixUtraiteur = 20;
			}
			if (traiteur2[2].checked) {
				document.getElementById("menu").innerHTML = "entrée/plat/dessert";
				document.getElementById("prixUtraiteur").innerHTML = "30 €";
				prixUtraiteur = 30;
			}

			document.getElementById("prixTtraiteur").innerHTML = pTraiteur + " €";
		}
	});

	boisson2[i].addEventListener("click", function() {
		if (nombreDePersonne.value == 0) {
			document.getElementById("alert").innerHTML = "Veuillez sélectionner un nombre de participants !"
			document.getElementById("cd-popup").setAttribute("class", "is-visible");
		}
		else {
			if (boisson2[i].checked) {
				pBoisson = boisson2[i].value * nombreDePersonne.value;
			}
			pTotal = pTraiteur + pBoisson + pWait;
			prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";

			if (boisson2[0].checked) {
				document.getElementById("nombreDeBoisson").innerHTML = "1";
				document.getElementById("prixUboisson").innerHTML = "3 €";
				prixUboisson = 3;
			}
			if (boisson2[1].checked) {
				document.getElementById("nombreDeBoisson").innerHTML = "2";
				document.getElementById("prixUboisson").innerHTML = "5,50 €";
				prixUboisson = 5.5;
			}
			if (boisson2[2].checked) {
				document.getElementById("nombreDeBoisson").innerHTML = "3";
				document.getElementById("prixUboisson").innerHTML = "7,50 €";
				prixUboisson = 7.5;
			}

			document.getElementById("prixTboisson").innerHTML = pBoisson + " €";
		}
	});

	wait2[i].addEventListener("click", function() {
		if (nombreDePersonne.value == 0) {
			document.getElementById("alert").innerHTML = "Veuillez sélectionner un nombre de participants !"
			document.getElementById("cd-popup").setAttribute("class", "is-visible");
		}
		else {
			if (wait2[i].checked) {
				pWait = wait2[i].value * nombreDePersonne.value;
			}
			pTotal = pTraiteur + pBoisson + pWait;
			prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";

			if (wait2[0].checked) {
				document.getElementById("nombreWait").innerHTML = "1";
				document.getElementById("prixUwait").innerHTML = "5 €";
				prixUwait = 5;
			}
			if (wait2[1].checked) {
				document.getElementById("nombreWait").innerHTML = "2";
				document.getElementById("prixUwait").innerHTML = "10 €";
				prixUwait = 10;
			}
			if (wait2[2].checked) {
				document.getElementById("nombreWait").innerHTML = "3";
				document.getElementById("prixUwait").innerHTML = "15 €";
				prixUwait = 15;
			}

			document.getElementById("prixTwait").innerHTML = pWait + " €";
		}
	});
}

form2.addEventListener("submit", function() {
	completeDevis();

	document.getElementById("tableau").style.display = "flex";

	requeteSelectUser(nom.value, prenom.value, email.value);

	form2.parentNode.remove(form2);
});

function completeDevis() {
	document.getElementsByClassName("sidebar")[0].style.display = "none";

	document.getElementById("duree").innerHTML = duree.value;

	document.getElementById("nombrePersonne").innerHTML = nombreDePersonne.value;
	document.getElementById("prixUpersonne").innerHTML = prixBase + " €";
	document.getElementById("prixTpersonne").innerHTML = prixBase * nombreDePersonne.value + " €";

	let typeSeminaire;

	if (seminaire2[0].checked) {
		typeSeminaire = "Reunion";
	}
	else {
		typeSeminaire = "Plénière";
	}

	if (seminaire2[0].checked) {
		let dureeSem;

		if (temps2[0].checked) {
			dureeSem = "1/2 journee";
		}
		else {
			dureeSem = "1 journee";
		}
		document.getElementById("nombreSem").innerHTML = nombreReunion2[0].value + " personnes"
		+ "<br>" + dureeSem;
	}
	else {
		document.getElementById("nombreSem").innerHTML = nombreReunion2[0].value + " personnes";
	}

	document.getElementById("formatSem").innerHTML = typeSeminaire;
	
	document.getElementById("prixSem").innerHTML = prixSeminaire + " €";
}

//Requête Ajax pour la création des devis.

function requeteSaveDevis(user, duree, dureePers, date, moment, nombreDePersonne, remarque, typeSeminaire, nombreReunion, prixSeminaire, prixUpersonne
	, prixUtraiteur, prixUboisson, prixUwait, prixTpersonne, prixTtraiteur, prixTboisson, prixTwait, prixT, coeff) {
	let url = "php/requeteDevis.php?date=" + date + "&duree=" + duree + "&dureePers=" + dureePers + "&nombreDePersonne=" + nombreDePersonne
	+ "&remarque=" + remarque + "&user=" + user + "&typeSeminaire=" + typeSeminaire + "&nombreReunion=" + nombreReunion + "&dureeSem=" + dureeSem
	+ "&prixSeminaire=" + prixSeminaire + "&prixUpersonne=" + prixUpersonne + "&prixUtraiteur=" + prixUtraiteur + "&prixUboisson=" + prixUboisson
	+ "&prixUwait=" + prixUwait + "&prixTpersonne=" + prixTpersonne + "&prixTtraiteur=" + prixTtraiteur + "&prixTboisson=" + prixTboisson
	+ "&prixTwait=" + prixTwait + "&prixT=" + prixT + "&coeff=" + coeff;

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

function callback2(req) {
	let prixTpersonne = prixBase * nombreDePersonne.value;
	let prixTtraiteur = pTraiteur * nombreDePersonne.value;
	let prixTboisson = pBoisson * nombreDePersonne.value;
	let prixTwait = pWait * nombreDePersonne.value;
	let prixT = prixTpersonne + prixTtraiteur + prixTboisson + prixTwait;
	
	let typeSeminaire;

	if (seminaire2[0].checked) {
		typeSeminaire = "reunion";
	}
	else {
		typeSeminaire = "plénière";
	}

	let dureeSem;

	if (temps2[0].checked) {
		dureeSem = "1/2 journee";
	}
	else {
		dureeSem = "1 journee";
	}

	requeteSaveDevis(req.responseText, duree.value, dureePers, date.value, moment.value, nombreDePersonne.value, remarque.value,
		typeSeminaire, nombreReunion2[0].value, dureeSem, prixSeminaire, prixUpersonne, pTraiteur, pBoisson, pWait, prixTpersonne, prixTtraiteur,
		prixTboisson, prixTwait, prixT, coeff);
}

function calculPrix(prixBase) {
	return (duree.value/60) * 13 * prixBase;
}

//Partie affichage du devis

document.getElementById("tableau").style.display = "none";

//Partie générale

function callback(req) {
	console.log(req.responseText);
}

//Séminaire

let reunion = document.getElementById("reunion");
let seminaire = document.getElementById("seminaire");
let nombreReunion = document.getElementById("nombreReunion");
let temps = document.getElementById("temps");

let reunion2 = document.getElementsByName("reunion");
let seminaire2 = document.getElementsByName("seminaire");
let nombreReunion2 = document.getElementsByName("nombreReunion");
let temps2 = document.getElementsByName("temps");

seminaire.style.display = "none";
nombreReunion.style.display = "none";
temps.style.display = "none";

let prixSeminaire = 0;

reunion2[0].addEventListener("click", function() {
	document.getElementById("seminaire2").style.display = "visible";
	nombreReunion.style.display = "block";
});

reunion2[1].addEventListener("click", function() {
	document.getElementById("seminaire2").style.display = "none";

	seminaire.style.display = "none";
	nombreReunion.style.display = "none";
	temps.style.display = "none";

	for (let i = 0; i != 2; i ++) {
		seminaire2[i].checked = false;
		temps2[i].checked = false;
	}

	nombreReunion2[0].value = "";

	prixSeminaire = 0;
	prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
});

seminaire2[0].addEventListener("click", function() {
	temps.style.display = "block";

	prixSeminaire = 0;
	prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
});

seminaire2[1].addEventListener("click", function() {
	temps.style.display = "none";

	for (let i = 0; i != 2; i ++) {
		temps2[i].checked = false;
	}

	prixSeminaire = 150;
	prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
});

nombreReunion2[0].addEventListener("change", function() {
	if (parseInt(nombreReunion2[0].value) > parseInt(nombreDePersonne.value)) {
		document.getElementById("alert").innerHTML = "Veuillez sélectionner un bon nombre de participants au séminaire !"
		document.getElementById("cd-popup").setAttribute("class", "is-visible");
	}
	else { 
		if (parseInt(nombreReunion2[0].value) > 25 && parseInt(nombreReunion2[0].value) <= 60) {
			document.getElementById("alert").innerHTML = "Pour une telle capacité, nous vous recommandons le format plénière !"
			document.getElementById("cd-popup").setAttribute("class", "is-visible");

			seminaire.style.display = "block";
			temps.style.display = "none";

			for (let i = 0; i != 2; i ++) {
				temps2[i].checked = false;
			}

			seminaire2[0].setAttribute("disabled", "");
			seminaire2[1].checked = "true";
			seminaire2[1].setAttribute("disabled", "");

			prixSeminaire = 150;
			prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
		}
		else if (parseInt(nombreReunion2[0].value) > 60) {
			document.getElementById("alert").innerHTML = "La capacité maximale est de 60 personnes, merci de nous contacter pour un évènement sur-mesure !"
			document.getElementById("cd-popup").setAttribute("class", "is-visible");
		}
		else if (parseInt(nombreReunion2[0].value) <= 25) {
			seminaire.style.display = "block";
			temps.style.display = "none";

			seminaire2[0].removeAttribute("disabled", "");
			seminaire2[1].checked = "false";
			seminaire2[1].removeAttribute("disabled", "");
		}
	}
});

temps2[0].addEventListener("click", function() {
	prixSeminaire = 100;
	prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
});

temps2[1].addEventListener("click", function() {
	prixSeminaire = 150;
	prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
});

//Date

let maDate;

let jour;
let mois;
let annee;

let prixBase = 0;

date.addEventListener("change", function() {
	jour = date.value.slice(0,2);
	mois = date.value.slice(3,5);
	annee = date.value.slice(6,10);

	maDate = new Date(annee, mois - 1, jour);

	moment.addEventListener("change", function() {
		if (maDate.getDay() == 5 || maDate.getDay() == 6 && parseInt(nombreDePersonne.value >= 20)) {
			if (moment.value == "journee" || moment.value == "soiree") {
				document.getElementById("cd-popup").setAttribute("class", "is-visible");
			}
		}
		else {
			if (moment.value == "soiree" && parseInt(nombreDePersonne.value >= 20)) {
				document.getElementById("cd-popup").setAttribute("class", "is-visible");
			}
		}
	});
});

moment.addEventListener("change", function(){
	if (date.value != "") {
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
	}
});

document.getElementsByClassName("sidebar")[0].style.display = "none";

let tabMoment = {"matinee" : "en matinée", "apresmidi" : "en après-midi", "soiree" : "en soirée", "journee" : "en journée", "journee&soiree" : "de 9h à 23h"};
let coeff = 0;
let dureePers;

duree.addEventListener("change", function() {
	if (date.value != "" && moment.value != "" && nombreDePersonne.value != "") {
		document.getElementsByClassName("sidebar")[0].style.display = "flex";
		document.getElementById("date2").innerHTML = date.value;
		document.getElementById("moment2").innerHTML = tabMoment[moment.value];
		document.getElementById("nbrPersonne").innerHTML = nombreDePersonne.value;
		prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
	}
	else {
		document.getElementById("nbrPersonne").innerHTML = "0";
	}

	if (nombreDePersonne.value != "") {
		coeff = ((duree.value * 13) / nombreDePersonne.value) / 60;
		if (coeff < 0.5) {
			document.getElementById("alert").innerHTML = "Vous avez choisit une durée trop courte, nous vous conseillons de l'augmenter !";
			document.getElementById("cd-popup").setAttribute("class", "is-visible");

			for (let i = 0; i < document.getElementsByName("duree").length; i ++) {
				if (((document.getElementsByName("duree")[i].value * 13) / nombreDePersonne.value) / 60 < 0.5) {
					document.getElementsByName("duree")[i].setAttribute("disabled", "");
				}
			}
		}
		else if (coeff >= 0.5 && coeff <= 1) {
			dureePers = 30;

			for (let i = 0; i < document.getElementsByName("duree").length; i ++) {
				if (((document.getElementsByName("duree")[i].value * 13) / nombreDePersonne.value) / 60 >= 0.5) {
					document.getElementsByName("duree")[i].removeAttribute("disabled", "");
				}
			}
		}
		else {
			dureePers = 60;

			if (coeff >= 1.5 && coeff <= 2) {
				document.getElementById("alert").innerHTML = "En choisissant ces options, les activitées d'attente vous sont offertes !";
				document.getElementById("cd-popup").setAttribute("class", "is-visible");

				document.getElementById("attente").style.display = "none";
				document.getElementById("simulateur").style.display = "none";

				wait[1].checked = true;
			}

			for (let i = 0; i < document.getElementsByName("duree").length; i ++) {
				if (((document.getElementsByName("duree")[i].value * 13) / nombreDePersonne.value) / 60 >= 0.5) {
					document.getElementsByName("duree")[i].removeAttribute("disabled", "");
				}
			}
		}

		document.getElementById("duree2").innerHTML = dureePers + " minutes par personne";
	}
});

date.addEventListener("change", function() {
	if (duree.value != "" && moment.value != "" && nombreDePersonne.value != "") {
		document.getElementsByClassName("sidebar")[0].style.display = "flex";
		document.getElementById("date2").innerHTML = date.value;
		document.getElementById("moment2").innerHTML = tabMoment[moment.value];
		document.getElementById("nbrPersonne").innerHTML = nombreDePersonne.value;
		prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
	}
	else {
		document.getElementById("nbrPersonne").innerHTML = "0";
	}
});

moment.addEventListener("change", function() {
	if (date.value != "" && duree.value != "" && nombreDePersonne.value != "") {
		document.getElementsByClassName("sidebar")[0].style.display = "flex";
		document.getElementById("date2").innerHTML = date.value;
		document.getElementById("moment2").innerHTML = tabMoment[moment.value];
		document.getElementById("nbrPersonne").innerHTML = nombreDePersonne.value;
		prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
	}
	else {
		document.getElementById("nbrPersonne").innerHTML = "0";
	}
});

nombreDePersonne.addEventListener("change", function() {
	if (date.value != "" && moment.value != "" && duree.value != "") {
		document.getElementsByClassName("sidebar")[0].style.display = "flex";
		document.getElementById("date2").innerHTML = date.value;
		document.getElementById("moment2").innerHTML = tabMoment[moment.value];
		document.getElementById("nbrPersonne").innerHTML = nombreDePersonne.value;
		prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
	}
	else {
		document.getElementById("nbrPersonne").innerHTML = "0";
	}

	if (duree.value != "") {
		coeff = ((duree.value * 13) / nombreDePersonne.value) / 60;
		if (coeff < 0.5) {
			document.getElementById("alert").innerHTML = "Vous avez choisit une durée trop courte, nous vous conseillons de l'augmenter !";
			document.getElementById("cd-popup").setAttribute("class", "is-visible");

			for (let i = 0; i < document.getElementsByName("duree").length; i ++) {
				if (((document.getElementsByName("duree")[i].value * 13) / nombreDePersonne.value) / 60 < 0.5) {
					document.getElementsByName("duree")[i].setAttribute("disabled", "");
				}
			}
		}
		else if (coeff >= 0.5 && coeff <= 1) {
			dureePers = 30;

			for (let i = 0; i < document.getElementsByName("duree").length; i ++) {
				if (((document.getElementsByName("duree")[i].value * 13) / nombreDePersonne.value) / 60 >= 0.5) {
					document.getElementsByName("duree")[i].removeAttribute("disabled", "");
				}
			}
		}
		else {
			dureePers = 60;

			if (coeff >= 1.5 && coeff <= 2) {
				document.getElementById("alert").innerHTML = "En choisissant ces options, les activitées d'attente vous sont offertes !";
				document.getElementById("cd-popup").setAttribute("class", "is-visible");

				document.getElementById("attente").style.display = "none";
				document.getElementById("simulateur").style.display = "none";

				wait[1].checked = true;
			}

			for (let i = 0; i < document.getElementsByName("duree").length; i ++) {
				if (((document.getElementsByName("duree")[i].value * 13) / nombreDePersonne.value) / 60 >= 0.5) {
					document.getElementsByName("duree")[i].removeAttribute("disabled", "");
				}
			}
		}

		document.getElementById("duree2").innerHTML = dureePers + " minutes par personne";
	}
});

let popup = document.getElementById("nombre_id");

popup.addEventListener("change", function() {
	if (nombreDePersonne.value > 110) {
		document.getElementById("alert").innerHTML = "Pour une capacité de plus de 110 personnes, veuillez nous contacter pour un évènement sur-mesure !";
		document.getElementById("cd-popup").setAttribute("class", "is-visible");
	}
	else {
		if (duree.value != "" && nombreDePersonne.value != "") {
			if (coeff < 0.5 && nombreDePersonne.value >= 20) {
				document.getElementById("alert").innerHTML =
				"A partir d'une vingtaine de personne, nous vous privatisons le parc." +
				"<br><br>Vous avez choisit une durée trop courte, nous vous conseillons de l'augmenter !";
				document.getElementById("cd-popup").setAttribute("class", "is-visible");

				document.getElementById("private").innerHTML = "Privatisation";
			}
		}
		else if (nombreDePersonne.value >= 20) {
			document.getElementById("alert").innerHTML = "A partir d'une vingtaine de personne, nous vous privatisons le parc.";
			document.getElementById("cd-popup").setAttribute("class", "is-visible");

			document.getElementById("private").innerHTML = "Privatisation";
		}
	}
});

document.getElementById("ok").addEventListener("click", removeClass);
document.getElementById("annuler").addEventListener("click", removeClass);

function removeClass() {
	document.getElementById("cd-popup").removeAttribute("class", "is-visible");
}

/* Partie robot */

/*function robot() {
	let tabDate = {0 : "en semaine", 1 : "en semaine", 2 : "en semaine", 3 : "en semaine", 4 : "en semaine", 5 : "le week-end", 6 : "le week-end"};
	let tabMoment = {0 : "en Matinée", 1 : "en Après-midi", 2 : "en Soirée", 3 : "en Journée", 4 : "De 9h à 22h"};
	let tabDuree = {
		0 : "30", 1 : "60", 2 : "90", 3 : "120", 4 : "150", 5 : "180", 6 : "210", 7 : "240", 8 : "270", 9 : "300",
		10 : "330", 11 : "360", 12 : "390", 13 : "420", 14 : "450", 15 : "480"
	};

	for (let i = 0; i < 500; i ++) {
		let randDate = Math.floor(Math.random() * 7);
		let randMoment = Math.floor(Math.random() * 5);
		let randNbr = Math.floor(Math.random() * 111);
		let randDuree = Math.floor(Math.random() * 16);

		let pb = 0;

		if (randDate == 5 || randDate == 6) {
			if (randMoment == 0) {
				pb = 25;
			}
			else {
				pb = 30;
			}
		}
		else {
			if (randMoment == 0 || randMoment == 1 || randMoment == 3) {
				pb = 20;
			}
			else {
				pb = 25;
			}
		}

		let coeff = (((tabDuree[randDuree]) * 13) / randNbr) / 60;

		let prix = (tabDuree[randDuree] / 60) * 13 * pb;

		console.log("Pour votre évènement " + tabDate[randDate] + ", " + tabMoment[randMoment] +
			" pour " + randNbr + " personnes pour une durée de " + tabDuree[randDuree] +
			" minutes, le coeff est de : " + coeff + " et le prix de : " + prix + " € HT");

		requeteSaveRobot(tabDate[randDate], tabMoment[randMoment], randNbr, tabDuree[randDuree], coeff, prix);
	}
}

function requeteSaveRobot(date, moment, nombreDePersonne, duree, coeff, prix) {
	let url = "php/requeteSaveRobot.php?date=" + date + "&moment=" + moment + "&nombreDePersonne=" + nombreDePersonne +
	"&duree=" + duree + "&coeff=" + coeff + "&prix=" + prix;
	let requete = new XMLHttpRequest();

	requete.open("GET", url, true);

	requete.addEventListener("load", function () {
		callback(requete);
	});

	requete.send(null);
}*/