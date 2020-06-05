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

let t;
let b;

let prixUtraiteur = 0;
let prixTtraiteur = 0;

let prixUboisson = 0;
let prixTboisson = 0;

let prixUwait = 0;
let prixTwait = 0;

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

wait[0].addEventListener("click", function() {
	document.getElementById("wait").style.display = "block";
	document.getElementById("tarifWait").innerHTML = "Forfait simulateur";
});

wait[1].addEventListener("click", function() {
	document.getElementById("wait").style.display = "none";
	document.getElementById("tarifWait").innerHTML = "";
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
			pTotal = pTraiteur + pBoisson + pWait;
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

			if (wait2[0].checked) {
				document.getElementById("nombreDeWait").innerHTML = "1";
				document.getElementById("prixUwait").innerHTML = "5 €";
				prixUwait = 5;
			}
			if (wait2[1].checked) {
				document.getElementById("nombreDeWait").innerHTML = "2";
				document.getElementById("prixUwait").innerHTML = "10 €";
				prixUwait = 10;
			}
			if (wait2[2].checked) {
				document.getElementById("nombreDeWait").innerHTML = "3";
				document.getElementById("prixUwait").innerHTML = "15 €";
				prixUwait = 15;
			}

			document.getElementById("prixTwait").innerHTML = pWait + " €";
			prixTwait = pWait;
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

	prix.style.display = "none";

	document.getElementById("formule1").innerHTML = calculPrix(nombreDePersonne.value, 30) + pTotal + " €";

	document.getElementById("formule2").innerHTML = calculPrix(nombreDePersonne.value, 18) + pTotal + " €";

	document.getElementById("formule3").innerHTML = calculPrix(nombreDePersonne.value, 9) + pTotal + " €";
});

//Partie choix d'un prix

//Requête Ajax pour la création des devis.

function requeteSaveDevis(user, duree, date, nombreDePersonne, traiteur, boisson, remarque, prixUpersonne, prixUtraiteur, prixUboisson, prixUwait, prixTpersonne,
	prixTtraiteur, prixTboisson, prixTwait, prixT) {
	let url = "php/requeteDevis.php?date=" + date + "&duree=" + duree + "&nombreDePersonne=" + nombreDePersonne + "&traiteur=" + traiteur +
	"&boisson=" + boisson + "&remarque=" + remarque + "&user=" + user + "&prixUpersonne=" + prixUpersonne + "&&prixUtraiteur=" + prixUtraiteur +
	"&prixUboisson=" + prixUboisson + "&prixUwait=" + prixUwait + "&prixTpersonne=" + prixTpersonne + "&prixTtraiteur=" + prixTtraiteur +
	"&prixTboisson=" + prixTboisson + "&prixTwait=" + prixTwait + "&prixT=" + prixT;
	let requete = new XMLHttpRequest();

	requete.open("GET", url, true);

	requete.addEventListener("load", function () {
		callback(requete);
	});

	requete.send(null);
}

function requeteSelectUser(nom, prenom, email, duree, prixUpersonne) {
	let url = "php/requeteSelectUser.php?nom=" + nom + "&prenom=" + prenom + "&email=" + email;
	let requete = new XMLHttpRequest();

	requete.open("GET", url, true);

	requete.addEventListener("load", function () {
		callback2(requete, duree, prixUpersonne);
	});

	requete.send(null);
}

function callback2(req, duree, prixUpersonne) {
	let prixTpersonne = prixUpersonne * nombreDePersonne.value;

	requeteSaveDevis(req.responseText, duree, date.value, nombreDePersonne.value, t, b, remarque.value,
	prixUpersonne, prixUtraiteur, prixUboisson, prixUwait, prixTpersonne, prixTtraiteur, prixTboisson, prixTwait, prixTotal);
}

function calculPrix(nbr, value) {
	return Math.floor(nbr / value * 13 * 30);
}

let prixTotal = 0;

document.getElementById("choix1").addEventListener("click", function() {
	let duree = nombreDePersonne.value * 20 / 60;
	let prixU = prixUpersonne(calculPrix(nombreDePersonne.value, 30));
	
	afficherTab();
	private();
	time(duree);
	personnes();
	document.getElementById("prixTpersonne").innerHTML = calculPrix(nombreDePersonne.value, 30) + " €";
	document.getElementById("prixUpersonne").innerHTML = prixU + " €";

	//calcul du prix TTC
	if (pTraiteur != 0 && pBoisson != 0 && pWait != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 30) * 1.02 + pTraiteur * 1.01 + pBoisson * 1.02 + pWait * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 30) * 1.02 + pTraiteur * 1.01 + pBoisson * 1.02 + pWait * 1.02;
	}
	else if (pTraiteur != 0 && pBoisson != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 30) * 1.02 + pTraiteur * 1.01 + pBoisson * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 30) * 1.02 + pTraiteur * 1.01 + pBoisson * 1.02;
	}
	else if (pTraiteur != 0 && pWait != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 30) * 1.02 + pTraiteur * 1.01 + pWait * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 30) * 1.02 + pTraiteur * 1.01 + pWait * 1.02;
	}
	else if (pBoisson != 0 && pWait != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 30) * 1.02 + pBoisson * 1.02 + pWait * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 30) * 1.02 + pBoisson * 1.02 + pWait * 1.02
	}
	else if (pTraiteur != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 30) * 1.02 + pTraiteur * 1.01);
		prixTotal = calculPrix(nombreDePersonne.value, 30) * 1.02 + pTraiteur * 1.01;
	}
	else if (pBoisson != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 30) * 1.02 + pBoisson * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 30) * 1.02 + pBoisson * 1.02;
	}
	else if (pWait != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 30) * 1.02 + pWait * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 30) * 1.02 + pWait * 1.02;
	}
	
	document.getElementById("choix").parentNode.remove(document.getElementById("choix"));

	requeteSelectUser(nom.value, prenom.value, email.value, duree, prixU);
});

document.getElementById("choix2").addEventListener("click", function() {
	let duree = nombreDePersonne.value * 30 / 60;
	let prixU = prixUpersonne(calculPrix(nombreDePersonne.value, 18));
	
	afficherTab();
	private();
	time(duree);
	personnes();
	document.getElementById("prixTpersonne").innerHTML = calculPrix(nombreDePersonne.value, 18) + " €";
	document.getElementById("prixUpersonne").innerHTML = prixU + " €";
	
	//calcul du prix TTC
	if (pTraiteur != 0 && pBoisson != 0 && pWait != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 18) * 1.02 + pTraiteur * 1.01 + pBoisson * 1.02 + pWait * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 18) * 1.02 + pTraiteur * 1.01 + pBoisson * 1.02 + pWait * 1.02;
	}
	else if (pTraiteur != 0 && pBoisson != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 18) * 1.02 + pTraiteur * 1.01 + pBoisson * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 18) * 1.02 + pTraiteur * 1.01 + pBoisson * 1.02;
	}
	else if (pTraiteur != 0 && pWait != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 18) * 1.02 + pTraiteur * 1.01 + pWait * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 18) * 1.02 + pTraiteur * 1.01 + pWait * 1.02;
	}
	else if (pBoisson != 0 && pWait != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 18) * 1.02 + pBoisson * 1.02 + pWait * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 18) * 1.02 + pBoisson * 1.02 + pWait * 1.02
	}
	else if (pTraiteur != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 18) * 1.02 + pTraiteur * 1.01);
		prixTotal = calculPrix(nombreDePersonne.value, 18) * 1.02 + pTraiteur * 1.01;
	}
	else if (pBoisson != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 18) * 1.02 + pBoisson * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 18) * 1.02 + pBoisson * 1.02;
	}
	else if (pWait != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 18) * 1.02 + pWait * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 18) * 1.02 + pWait * 1.02;
	}
	
	document.getElementById("choix").parentNode.remove(document.getElementById("choix"));

	requeteSelectUser(nom.value, prenom.value, email.value, duree, prixU);
});

document.getElementById("choix3").addEventListener("click", function() {
	let duree = nombreDePersonne.value * 60 / 60;
	let prixU = prixUpersonne(calculPrix(nombreDePersonne.value, 9));

	afficherTab();
	private();
	time(duree);
	personnes();
	document.getElementById("prixTpersonne").innerHTML = calculPrix(nombreDePersonne.value, 9) + " €";
	document.getElementById("prixUpersonne").innerHTML = prixU + " €";
	
	//calcul du prix TTC
	if (pTraiteur != 0 && pBoisson != 0 && pWait != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 9) * 1.02 + pTraiteur * 1.01 + pBoisson * 1.02 + pWait * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 9) * 1.02 + pTraiteur * 1.01 + pBoisson * 1.02 + pWait * 1.02;
	}
	else if (pTraiteur != 0 && pBoisson != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 9) * 1.02 + pTraiteur * 1.01 + pBoisson * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 9) * 1.02 + pTraiteur * 1.01 + pBoisson * 1.02;
	}
	else if (pTraiteur != 0 && pWait != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 9) * 1.02 + pTraiteur * 1.01 + pWait * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 9) * 1.02 + pTraiteur * 1.01 + pWait * 1.02;
	}
	else if (pBoisson != 0 && pWait != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 9) * 1.02 + pBoisson * 1.02 + pWait * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 9) * 1.02 + pBoisson * 1.02 + pWait * 1.02
	}
	else if (pTraiteur != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 9) * 1.02 + pTraiteur * 1.01);
		prixTotal = calculPrix(nombreDePersonne.value, 9) * 1.02 + pTraiteur * 1.01;
	}
	else if (pBoisson != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 9) * 1.02 + pBoisson * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 9) * 1.02 + pBoisson * 1.02;
	}
	else if (pWait != 0) {
		document.getElementById("prixTotal").innerHTML = "Prix TTC : " + (calculPrix(nombreDePersonne.value, 9) * 1.02 + pWait * 1.02);
		prixTotal = calculPrix(nombreDePersonne.value, 9) * 1.02 + pWait * 1.02;
	}

	document.getElementById("choix").parentNode.remove(document.getElementById("choix"));

	requeteSelectUser(nom.value, prenom.value, email.value, duree, prixU);
});

function afficherTab() {
	document.getElementById("tableau").style.display = "flex";
}

function private() {
	if (nombreDePersonne.value >= 30) {
		document.getElementById("private").innerHTML = "Privatisation du parc Upside";
	}
}

function time(duree) {
	document.getElementById("duree").innerHTML = duree;
}

function personnes() {
	document.getElementById("nombre").innerHTML = nombreDePersonne.value;
}

function prixUpersonne(prix) {
	return prix / nombreDePersonne.value;
}

//Partie affichage du devis

document.getElementById("tableau").style.display = "none";

//Partie générale

function callback(req) {
	console.log(req.responseText);
}