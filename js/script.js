//Partie 1er Formulaire
let form = document.getElementById('form');

let nom = document.getElementById('nom_id');
let prenom = document.getElementById('prenom_id');
let email = document.getElementById('email_id');
let tel = document.getElementById('tel_id');

function noDonnees() {
	rgpd = false;

	form.remove(form);

	divForm2.style.display = 'block';

	document.getElementById("ok").innerHTML = "ok";
	document.getElementById("annuler").innerHTML = "annuler";

	document.getElementById("annuler").removeEventListener("click", noDonnees);
	document.getElementById("annuler").addEventListener("click", removeClass);

	document.getElementById("ok").removeEventListener("click", okDonnees);
	document.getElementById("ok").addEventListener("click", removeClass);

	document.getElementById("cd-popup").removeAttribute("class", "is-visible");
}

function okDonnees() {
	rgpd = true;

	if (tel.value != "") {
		requeteUser(nom.value, prenom.value, email.value, tel.value);
	}
	else {
		requeteUser(nom.value, prenom.value, email.value);
	}

	form.remove(form);

	divForm2.style.display = 'block';

	document.getElementById("ok").innerHTML = "ok";
	document.getElementById("annuler").innerHTML = "annuler";

	document.getElementById("ok").removeEventListener("click", okDonnees);
	document.getElementById("ok").addEventListener("click", removeClass);

	document.getElementById("annuler").removeEventListener("click", noDonnees);
	document.getElementById("annuler").addEventListener("click", removeClass);

	document.getElementById("cd-popup").removeAttribute("class", "is-visible");
}

function removeForm () {
	document.getElementById("alert").innerHTML = 'J\'accepte que les informations saisies dans ce formulaire soient ' +
	'utilisées exclusivement par la société UPSIDE afin de me contacter. Pour plus d\'information : <a id="mention" href="https://www.upside-vr.fr/DevisEnLigne/">Mentions légales</a>';
	document.getElementById("cd-popup").setAttribute("class", "is-visible");

	document.getElementById("ok").innerHTML = "oui";
	document.getElementById("annuler").innerHTML = "non";

	document.getElementById("annuler").removeEventListener("click", removeClass);
	document.getElementById("annuler").addEventListener("click", noDonnees);

	document.getElementById("ok").removeEventListener("click", removeClass);
	document.getElementById("ok").addEventListener("click", okDonnees);
}

let rgpd;

//Partie 2nd Formulaire

let divForm2 = document.getElementById('secondForm');
divForm2.style.display = 'none';

document.getElementById("traiteur").style.display = 'none';
document.getElementById("boisson").style.display = 'none';
document.getElementById("wait").style.display = 'none';

let form2 = document.getElementById("date");

let date = document.getElementById("date_id");
let moment = document.getElementById("moment_id");
let nombreDePersonne = document.getElementById("nombre_id");
let remarque = document.getElementById("remarque_id");
let duree = document.getElementById("duree_id");

let prix = document.getElementById("prix");

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
	document.getElementById("tr").style.display = "table-row";
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
	document.getElementById("bar").style.display = "table-row";
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
	document.getElementById("simulateur").style.display = "table-row";
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
			document.getElementById("alert").innerHTML = "Veuillez définir un nombre de participants !"
			document.getElementById("cd-popup").setAttribute("class", "is-visible");
		}
		else {
			if (traiteur2[i].checked) {
				pTraiteur = traiteur2[i].value * nombreDePersonne.value;
			}
			pTotal = pTraiteur + pBoisson + pWait;
			prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";

			let menu = "";

			if (traiteur2[0].checked) {
				menu = "entrée/plat";
				document.getElementById("prixUtraiteur").innerHTML = "15 €";
				prixUtraiteur = 15;
			}
			if (traiteur2[1].checked) {
				menu = "plat/dessert";
				document.getElementById("prixUtraiteur").innerHTML = "20 €";
				prixUtraiteur = 20;
			}
			if (traiteur2[2].checked) {
				menu = "entrée/plat/dessert"
				document.getElementById("prixUtraiteur").innerHTML = "30 €";
				prixUtraiteur = 30;
			}

			document.getElementById("tarifTraiteur").innerHTML = "Forfait traiteur<br>" + menu;
			document.getElementById("menu").innerHTML = nombreDePersonne.value;

			document.getElementById("prixTtraiteur").innerHTML = pTraiteur + " €";
		}
	});

	boisson2[i].addEventListener("click", function() {
		if (nombreDePersonne.value == 0) {
			document.getElementById("alert").innerHTML = "Veuillez définir un nombre de participants !"
			document.getElementById("cd-popup").setAttribute("class", "is-visible");
		}
		else {
			if (boisson2[i].checked) {
				pBoisson = boisson2[i].value * nombreDePersonne.value;
			}
			pTotal = pTraiteur + pBoisson + pWait;
			prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";

			let verre = "";

			if (boisson2[0].checked) {
				verre = "1 boisson";
				document.getElementById("prixUboisson").innerHTML = "3 €";
				prixUboisson = 3;
			}
			if (boisson2[1].checked) {
				verre = "2 boissons";
				document.getElementById("prixUboisson").innerHTML = "5,50 €";
				prixUboisson = 5.5;
			}
			if (boisson2[2].checked) {
				verre = "3 boissons";
				document.getElementById("prixUboisson").innerHTML = "7,50 €";
				prixUboisson = 7.5;
			}

			document.getElementById("tarifBar").innerHTML = "Forfait BAR<br>" + verre;
			document.getElementById("nombreDeBoisson").innerHTML = nombreDePersonne.value;

			document.getElementById("prixTboisson").innerHTML = pBoisson + " €";
		}
	});

	wait2[i].addEventListener("click", function() {
		if (nombreDePersonne.value == 0) {
			document.getElementById("alert").innerHTML = "Veuillez définir un nombre de participants !"
			document.getElementById("cd-popup").setAttribute("class", "is-visible");
		}
		else {
			if (wait2[i].checked) {
				pWait = wait2[i].value * nombreDePersonne.value;
			}
			pTotal = pTraiteur + pBoisson + pWait;
			prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";

			let simu = "";

			if (wait2[0].checked) {
				simu = "1 simulation";
				document.getElementById("prixUwait").innerHTML = "5 €";
				prixUwait = 5;
			}
			if (wait2[1].checked) {
				simu = "2 simulations";
				document.getElementById("prixUwait").innerHTML = "10 €";
				prixUwait = 10;
			}
			if (wait2[2].checked) {
				simu = "En illimité";
				document.getElementById("prixUwait").innerHTML = "15 €";
				prixUwait = 15;
			}

			document.getElementById("tarifWait").innerHTML = "Forfait simulateur<br>" + simu;
			document.getElementById("nombreWait").innerHTML = nombreDePersonne.value;

			document.getElementById("prixTwait").innerHTML = pWait + " €";
		}
	});
}

//Gestion moment pc

let maDate;

let jour;
let mois;
let annee;

let prixBase = 0;

/*let dateCalendar = document.getElementsByClassName('qs-num');

for (let i = 0; i < document.getElementsByClassName('qs-arrow').length; i ++) {
	document.getElementsByClassName('qs-arrow')[i].addEventListener('click', eventOnCalendar);
}

eventOnCalendar();

function eventOnCalendar() {
	for(let i = 0; i < dateCalendar.length; i ++){
		dateCalendar[i].addEventListener('click', function() {

		});
	}
}*/

date.addEventListener("blur", modifDate);

function modifDate() {
	jour = date.value.slice(8,10);
	mois = date.value.slice(5,7);
	annee = date.value.slice(0,4);

	maDate = new Date(annee, mois - 1, jour);

	let dateDuJour = new Date(Date.now());

	if (maDate <= dateDuJour) {
		document.getElementById("alert").innerHTML = "Vous ne pouvez pas sélectionner la date du jour ou une date antérieur.";
		document.getElementById("cd-popup").setAttribute("class", "is-visible");

		date.value = "";
	}

	moment.addEventListener("change", function() {
		if (maDate.getDay() == 5 || maDate.getDay() == 6 && parseInt(nombreDePersonne.value >= 30)) {
			if (moment.value == "journee" || moment.value == "soiree") {
				document.getElementById("alert").innerHTML = "A partir de trente personnes, le parc UPSIDE est privatisé.";
				document.getElementById("cd-popup").setAttribute("class", "is-visible");
			}
		}
		else {
			if (moment.value == "soiree" && parseInt(nombreDePersonne.value >= 30)) {
				document.getElementById("alert").innerHTML = "A partir de trente personnes, le parc UPSIDE est privatisé.";
				document.getElementById("cd-popup").setAttribute("class", "is-visible");
			}
		}
	});
}

let tabDuree = document.getElementById("duree_id");

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

	if (moment.value == "matinee" || moment.value == "apresmidi") {
		for (let i = 0; i < tabDuree.length; i ++) {
			if (parseInt(tabDuree[i].value) > 240) {
				tabDuree[i].setAttribute("disabled", "");
			}
			else {
				tabDuree[i].removeAttribute("disabled", "");
			}
		}
	}
	else if (moment.value == "soiree") {
		for (let i = 0; i < tabDuree.length; i ++) {
			if (parseInt(tabDuree[i].value) > 300) {
				tabDuree[i].setAttribute("disabled", "");
			}
			else {
				tabDuree[i].removeAttribute("disabled", "");
			}
		}
	}
	else if (moment.value == "journee") {
		for (let i = 0; i < tabDuree.length; i ++) {
			if (i == tabDuree.length - 1) {
				tabDuree[tabDuree.length - 1].setAttribute("disabled", "");
			}
			else {
				tabDuree[i].removeAttribute("disabled", "");
			}
		}
	}
	else {
		for (let i = 0; i < tabDuree.length; i ++) {
			if (i != tabDuree.length - 1) {
				tabDuree[i].setAttribute("disabled", "");
			}
			else {
				tabDuree[i].removeAttribute("disabled", "");
			}
		}
	}
});

let tabMoment = {"matinee" : "en matinée", "apresmidi" : "en après-midi", "soiree" : "en soirée", "journee" : "en journée", "journee&soiree" : "de 9h à 23h"};
let coeff = 0;
let dureePers;

duree.addEventListener("change", function() {
	if (date.value != "" && moment.value != "" && nombreDePersonne.value != "") {
		side.style.display = "inline";
		document.getElementById("noSide").style.display = "none";

		document.getElementById("date2").innerHTML = jour + "/" + mois + "/" + annee;
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
			document.getElementById("alert").innerHTML = "Vous avez choisi une durée trop courte, nous vous conseillons de l'augmenter !";
			document.getElementById("cd-popup").setAttribute("class", "is-visible");

			for (let i = 0; i < tabDuree.length; i ++) {
				if (((tabDuree[i].value * 13) / nombreDePersonne.value) / 60 < 0.5) {
					tabDuree[i].setAttribute("disabled", "");
				}
			}
		}
		else if (coeff >= 0.5 && coeff <= 1) {
			dureePers = 30;

			for (let i = 0; i < tabDuree.length; i ++) {
				if (((tabDuree[i].value * 13) / nombreDePersonne.value) / 60 >= 0.5) {
					tabDuree[i].removeAttribute("disabled", "");
				}
			}
		}
		else {
			dureePers = 60;

			if (coeff >= 1.5 && coeff <= 2) {
				document.getElementById("alert").innerHTML = "En choisissant ces options, les activités d'attente vous sont offertes !";
				document.getElementById("cd-popup").setAttribute("class", "is-visible");

				document.getElementById("attente").style.display = "none";
				document.getElementById("simulateur").style.display = "none";

				wait[1].checked = true;
			}
		}

		document.getElementById("duree2").innerHTML = dureePers + " minutes par personne";
	}
});

date.addEventListener("change", function() {
	if (duree.value != "" && moment.value != "" && nombreDePersonne.value != "") {
		side.style.display = "inline";
		document.getElementById("noSide").style.display = "none";

		document.getElementById("date2").innerHTML = jour + "/" + mois + "/" + annee;
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
		side.style.display = "inline";
		document.getElementById("noSide").style.display = "none";

		document.getElementById("date2").innerHTML = jour + "/" + mois + "/" + annee;
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
		side.style.display = "inline";
		document.getElementById("noSide").style.display = "none";

		document.getElementById("date2").innerHTML = jour + "/" + mois + "/" + annee;
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
			document.getElementById("alert").innerHTML = "Vous avez choisi une durée trop courte, nous vous conseillons de l'augmenter !";
			document.getElementById("cd-popup").setAttribute("class", "is-visible");

			for (let i = 0; i < tabDuree.length; i ++) {
				if (((tabDuree[i].value * 13) / nombreDePersonne.value) / 60 < 0.5) {
					tabDuree[i].setAttribute("disabled", "");
				}
			}
		}
		else if (coeff >= 0.5 && coeff <= 1) {
			dureePers = 30;

			for (let i = 0; i < tabDuree.length; i ++) {
				if (((tabDuree[i].value * 13) / nombreDePersonne.value) / 60 >= 0.5) {
					tabDuree[i].removeAttribute("disabled", "");
				}
			}
		}
		else {
			dureePers = 60;

			if (coeff > 1.3) {
				document.getElementById("alert").innerHTML = "En choisissant ces options, les activités d'attente vous sont offertes !";
				document.getElementById("cd-popup").setAttribute("class", "is-visible");

				document.getElementById("attente").style.display = "none";
				document.getElementById("simulateur").style.display = "none";

				wait[1].checked = true;
			}
		}

		document.getElementById("duree2").innerHTML = dureePers + " minutes par personne";
	}
});

//Séminaire

let reunion = document.getElementById("reunion");
let tempsReunion = document.getElementById("tempsReunion");
let tempsPleniere = document.getElementById("tempsPleniere");

let reunion2 = document.getElementsByName("reunion");
let tempsReunion2 = document.getElementsByName("tempsReunion");
let tempsPleniere2 = document.getElementsByName("tempsPleniere");

tempsReunion.style.display = "none";
tempsPleniere.style.display = "none";

let prixSeminaire = 0;
let nombrePersonneReunion = nombreDePersonne.value;

let typeSeminaire;
let dureeSem;

nombreDePersonne.addEventListener("change", function() {
	if (nombreDePersonne.value < 25) {
		reunion2[1].removeAttribute("disabled", "");
	}
	else if (nombreDePersonne.value < 60) {
		reunion2[2].removeAttribute("disabled", "");
	}
});

reunion2[0].addEventListener("click", function() {
	document.getElementById("seminaire2").style.display = "none";
	tempsReunion.style.display = "none";
	tempsPleniere.style.display = "none";

	typeSeminaire = "";
	dureeSem = "";

	for (let i = 0; i != 2; i ++) {
		tempsReunion2[i].checked = false;
		tempsPleniere2[i].checked = false;
		tempsReunion2[i].removeAttribute("required", "");
		tempsPleniere2[i].removeAttribute("required", "");
	}

	nombrePersonneReunion = "";

	prixSeminaire = 0;
	prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
});

reunion2[1].addEventListener("click", function() {

	if (nombreDePersonne.value > 25) {
		document.getElementById("alert").innerHTML = "La capacité maximale de notre salle de réunion est de 25 personnes, vous pouvez soit dimunuer le nombre de participants, soit opter pour le format séminaire.";
		document.getElementById("cd-popup").setAttribute("class", "is-visible");

		reunion2[1].setAttribute("disabled", "");
		reunion2[1].checked = false;
		tempsReunion.style.display = "none";
	}
	else {
		tempsReunion.style.display = "inline-block";
	}

	document.getElementById("seminaire2").style.display = "table-row";
	tempsPleniere.style.display = "none";
	
	typeSeminaire = "reunion";

	for (let i = 0; i != 2; i ++) {
		tempsPleniere2[i].checked = false;
		tempsReunion2[i].setAttribute("required", "");
		tempsPleniere2[i].removeAttribute("required", "");
	}

	nombrePersonneReunion = nombreDePersonne.value;
});

reunion2[2].addEventListener("click", function() {

	if (nombreDePersonne.value > 60) {	
		document.getElementById("alert").innerHTML = "La capacité maximale de l'espace de séminaire en plénière est de 60 personnes.";
		document.getElementById("cd-popup").setAttribute("class", "is-visible");

		reunion2[1].setAttribute("disabled", "");
		reunion2[2].setAttribute("disabled", "");
		
		reunion2[2].checked = false;
		tempsPleniere.style.display = "none";
	}
	else {
		tempsPleniere.style.display = "inline-block";
		reunion2[2].removeAttribute("disabled", "");		
	}

	document.getElementById("seminaire2").style.display = "table-row";
	tempsReunion.style.display = "none";

	typeSeminaire = "plénière";

	for (let i = 0; i != 2; i ++) {
		tempsReunion2[i].checked = false;
		tempsReunion2[i].removeAttribute("required", "");
		tempsPleniere2[i].setAttribute("required", "");
	}

	nombrePersonneReunion = nombreDePersonne.value;
});

tempsReunion2[0].addEventListener("click", function() {
	dureeSem = "1/2 journee";
	prixSeminaire = 100;
	prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
});

tempsReunion2[1].addEventListener("click", function() {
	dureeSem = "1 journee";
	prixSeminaire = 150;
	prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
});

tempsPleniere2[0].addEventListener("click", function() {
	dureeSem = "1/2 journee";
	prixSeminaire = 100;
	prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
});

tempsPleniere2[1].addEventListener("click", function() {
	dureeSem = "1 journee";
	prixSeminaire = 150;
	prix.innerHTML = (calculPrix(prixBase) + pTotal + prixSeminaire) + " € HT";
});

function removeForm2() {
	completeDevis();

	document.getElementById("tableau").style.display = "block";

	if (rgpd == true) {
		requeteSelectUser(nom.value, prenom.value, email.value, tel.value, duree.value, moment.value, nombreDePersonne.value, remarque.value,
			typeSeminaire, nombrePersonneReunion, dureeSem);
	}

	document.getElementsByClassName("sidebar")[0].style.display = "block";

	form2.remove(form2);
}

function completeDevis() {
	let prixTpersonne = prixBase * nombreDePersonne.value;
	let prixTtraiteur = prixUtraiteur * nombreDePersonne.value;
	let prixTboisson = prixUboisson * nombreDePersonne.value;
	let prixTwait = prixUwait * nombreDePersonne.value;

	let prixT = prixTpersonne + prixTtraiteur + prixTboisson + prixTwait;
	let prixTVA = prixTpersonne * (20/100) + prixTtraiteur * (20/100) + prixTboisson * (20/100) + prixTwait * (20/100);
	let prixTTC = prixT + prixTVA;

	document.getElementsByClassName("sidebar")[0].innerHTML = '<div><p>Total HT : ' + prixT + '€</p><p>TVA : ' + prixTVA + ' €</p><p>Total TTC : ' + prixTTC + ' €</p>'
	+ '<button id="contact" class="btn" type="submit">Être rappelé</button></div>';

	document.getElementById("contact").addEventListener("click", function() {
		document.getElementById("alert").innerHTML = "Notre équipe à bien reçu votre demande.<br>Vous serez recontacté sous peu.<br>Merci !"
		document.getElementById("cd-popup").setAttribute("class", "is-visible");

		mail(nom.value, prenom.value);
	});

	let dureeEnHeure = (Math.trunc(duree.value / 60)) + "h" + (duree.value % 60);

	document.getElementById("duree").innerHTML = dureeEnHeure;

	document.getElementById("nombrePersonne").innerHTML = nombreDePersonne.value;
	document.getElementById("prixUpersonne").innerHTML = prixBase + " €";
	document.getElementById("prixTpersonne").innerHTML = prixBase * nombreDePersonne.value + " €";

	document.getElementById("nombreSem").innerHTML = nombrePersonneReunion + " personnes"
	+ "<br>" + dureeSem;	

	document.getElementById("formatSem").innerHTML = typeSeminaire;
	
	document.getElementById("prixSem").innerHTML = prixSeminaire + " €";
}

/* Popup */

let popup = document.getElementById("nombre_id");

popup.addEventListener("change", function() {
	if (nombreDePersonne.value > 110) {
		document.getElementById("alert").innerHTML = "Pour une capacité de plus de 110 personnes, veuillez nous contacter pour un évènement sur-mesure !";
		document.getElementById("cd-popup").setAttribute("class", "is-visible");
	}
	else {
		if (duree.value != "" && nombreDePersonne.value != "") {
			if (coeff < 0.5 && nombreDePersonne.value >= 30) {
				document.getElementById("alert").innerHTML =
				"A partir de trente personnes, le parc UPSIDE est privatisé." +
				"<br><br>Vous avez choisi une durée trop courte, nous vous conseillons de l'augmenter !";
				
				document.getElementById("cd-popup").setAttribute("class", "is-visible");
				document.getElementById("private").innerHTML = "Privatisation";
			}
		}
		else if (nombreDePersonne.value >= 30) {
			document.getElementById("alert").innerHTML = "A partir de trente personnes, le parc UPSIDE est privatisé.";
			document.getElementById("cd-popup").setAttribute("class", "is-visible");

			document.getElementById("private").innerHTML = "Privatisation";
		}
	}
});

/* Premier formulaire téléphone */

let formTel = document.getElementById('formTel');

let nomTel = document.getElementById('nom_tel_id');
let prenomTel = document.getElementById('prenom_tel_id');
let emailTel = document.getElementById('email_tel_id');
let telTel = document.getElementById('tel_tel_id');

function noDonneesTel() {
	rgpd = false;

	formTel.remove(formTel);

	formTel2.style.display = 'block';
	prix.style.display = 'flex';

	document.getElementById("ok").innerHTML = "ok";
	document.getElementById("annuler").innerHTML = "annuler";

	document.getElementById("annuler").removeEventListener("click", noDonneesTel);
	document.getElementById("annuler").addEventListener("click", removeClass);

	document.getElementById("ok").removeEventListener("click", okDonneesTel);
	document.getElementById("ok").addEventListener("click", removeClass);

	document.getElementById("cd-popup").removeAttribute("class", "is-visible");
}

function okDonneesTel() {
	rgpd = true;

	if (tel.value != "") {
		requeteUser(nomTel.value, prenomTel.value, emailTel.value, telTel.value);
	}
	else {
		requeteUser(nomTel.value, prenomTel.value, emailTel.value);
	}

	formTel.remove(formTel);

	formTel2.style.display = 'block';
	prix.style.display = 'flex';

	document.getElementById("ok").innerHTML = "ok";
	document.getElementById("annuler").innerHTML = "annuler";

	document.getElementById("ok").removeEventListener("click", okDonneesTel);
	document.getElementById("ok").addEventListener("click", removeClass);

	document.getElementById("annuler").removeEventListener("click", noDonneesTel);
	document.getElementById("annuler").addEventListener("click", removeClass);

	document.getElementById("cd-popup").removeAttribute("class", "is-visible");
}

function removeFormTel () {
	document.getElementById("alert").innerHTML = 'J\'accepte que les informations saisies dans ce formulaire soient ' +
	'utilisées exclusivement par la société UPSIDE afin de me contacter. Pour plus d\'informations : <a id="mention" href="mention_legal.html">Mentions légales</a>';
	document.getElementById("cd-popup").setAttribute("class", "is-visible");

	document.getElementById("ok").innerHTML = "oui";
	document.getElementById("annuler").innerHTML = "non";

	document.getElementById("annuler").removeEventListener("click", removeClass);
	document.getElementById("annuler").addEventListener("click", noDonneesTel);

	document.getElementById("ok").removeEventListener("click", removeClass);
	document.getElementById("ok").addEventListener("click", okDonneesTel);
}

/* Second formualire téléphone */

let formTel2 = document.getElementById('secondFormTel');
formTel2.style.display = 'none';

document.getElementById("traiteurTel").style.display = 'none';
document.getElementById("boissonTel").style.display = 'none';
document.getElementById("waitTel").style.display = 'none';

let form2Tel = document.getElementById("formTel2");

let dateTel = document.getElementById("date_tel_id");
let momentTel = document.getElementById("moment_tel_id");
let nombreDePersonneTel = document.getElementById("nombre_tel_id");
let remarqueTel = document.getElementById("remarque_tel_id");
let dureeTel = document.getElementById("duree_tel_id");

let traiteurTel = document.getElementsByName("traiteurTel");
let boissonTel = document.getElementsByName("boissonTel");
let waitTel = document.getElementsByName("waitTel");

let traiteurTel2 = document.getElementsByName("traiteurTel2");
let boissonTel2 = document.getElementsByName("boissonTel2");
let waitTel2 = document.getElementsByName("waitTel2");

traiteurTel[0].addEventListener("click", function() {
	document.getElementById("traiteurTel").style.display = "block";
	document.getElementById("tarifTraiteur").innerHTML = '<i class="material-icons">restaurant</i>';
	document.getElementById("tr").style.display = "visible";
});

traiteurTel[1].addEventListener("click", function() {
	document.getElementById("traiteurTel").style.display = "none";
	document.getElementById("tarifTraiteur").innerHTML = "";
	document.getElementById("tr").style.display = "none";

	for (let i = 0; i < 3; i ++) {
		if (traiteurTel2[i].checked) {
			pTraiteur = 0;
			pTotal = pTotal - (traiteurTel2[i].value * nombreDePersonneTel.value);
			traiteurTel2[i].checked = false;
		}
	}
	document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";
});

boissonTel[0].addEventListener("click", function() {
	document.getElementById("boissonTel").style.display = "block";
	document.getElementById("tarifBar").innerHTML = '<i class="material-icons">local_bar</i>';
	document.getElementById("bar").style.display = "visible";
});

boissonTel[1].addEventListener("click", function() {
	document.getElementById("boissonTel").style.display = "none";
	document.getElementById("tarifBar").innerHTML = "";
	document.getElementById("bar").style.display = "none";

	for (let i = 0; i < 3; i ++) {
		if (boissonTel2[i].checked) {
			pBoisson = 0;
			pTotal = pTotal - (boissonTel2[i].value * nombreDePersonneTel.value);
			boissonTel2[i].checked = false;
		}
	}
	document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";
});

waitTel[0].addEventListener("click", function() {
	document.getElementById("waitTel").style.display = "block";
	document.getElementById("tarifWait").innerHTML = '<i class="material-icons">flash_on</i>';
	document.getElementById("simulateur").style.display = "visible";
});

waitTel[1].addEventListener("click", function() {
	document.getElementById("waitTel").style.display = "none";
	document.getElementById("tarifWait").innerHTML = "";
	document.getElementById("simulateur").style.display = "none";

	for (let i = 0; i < 3; i ++) {
		if (waitTel2[i].checked) {
			pWait = 0;
			pTotal = pTotal - (waitTel2[i].value * nombreDePersonneTel.value);
			waitTel2[i].checked = false;
		}
	}
	document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";
});

for (let i = 0; i < 3; i ++) {
	traiteurTel2[i].addEventListener("click", function() {
		if (nombreDePersonneTel.value == 0) {
			document.getElementById("alert").innerHTML = "Veuillez sélectionner un nombre de participants !"
			document.getElementById("cd-popup").setAttribute("class", "is-visible");
		}
		else {
			if (traiteurTel2[i].checked) {
				pTraiteur = traiteurTel2[i].value * nombreDePersonneTel.value;
			}
			pTotal = pTraiteur + pBoisson + pWait;
			document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";

			let menu = "";

			if (traiteurTel2[0].checked) {
				menu = "entrée/plat";
				document.getElementById("prixUtraiteur").innerHTML = "15 €";
				prixUtraiteur = 15;
			}
			if (traiteurTel2[1].checked) {
				menu = "plat/dessert";
				document.getElementById("prixUtraiteur").innerHTML = "20 €";
				prixUtraiteur = 20;
			}
			if (traiteurTel2[2].checked) {
				menu = "entrée/plat/dessert"
				document.getElementById("prixUtraiteur").innerHTML = "30 €";
				prixUtraiteur = 30;
			}

			document.getElementById("tarifTraiteur").innerHTML = '<i class="material-icons">restaurant</i><br>' + menu;
			document.getElementById("menu").innerHTML = nombreDePersonneTel.value;

			document.getElementById("prixTtraiteur").innerHTML = pTraiteur + " €";
		}
	});

	boissonTel2[i].addEventListener("click", function() {
		if (nombreDePersonneTel.value == 0) {
			document.getElementById("alert").innerHTML = "Veuillez sélectionner un nombre de participants !"
			document.getElementById("cd-popup").setAttribute("class", "is-visible");
		}
		else {
			if (boissonTel2[i].checked) {
				pBoisson = boissonTel2[i].value * nombreDePersonneTel.value;
			}
			pTotal = pTraiteur + pBoisson + pWait;
			document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";

			let verre = "";

			if (boissonTel2[0].checked) {
				verre = "1 boisson";
				document.getElementById("prixUboisson").innerHTML = "3 €";
				prixUboisson = 3;
			}
			if (boissonTel2[1].checked) {
				verre = "2 boissons";
				document.getElementById("prixUboisson").innerHTML = "5,50 €";
				prixUboisson = 5.5;
			}
			if (boissonTel2[2].checked) {
				verre = "3 boissons";
				document.getElementById("prixUboisson").innerHTML = "7,50 €";
				prixUboisson = 7.5;
			}

			document.getElementById("tarifBar").innerHTML = '<i class="material-icons">local_bar</i><br>' + verre;
			document.getElementById("nombreDeBoisson").innerHTML = nombreDePersonneTel.value;

			document.getElementById("prixTboisson").innerHTML = pBoisson + " €";
		}
	});

	waitTel2[i].addEventListener("click", function() {
		if (nombreDePersonneTel.value == 0) {
			document.getElementById("alert").innerHTML = "Veuillez sélectionner un nombre de participants !"
			document.getElementById("cd-popup").setAttribute("class", "is-visible");
		}
		else {
			if (waitTel2[i].checked) {
				pWait = waitTel2[i].value * nombreDePersonneTel.value;
			}
			pTotal = pTraiteur + pBoisson + pWait;
			document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";

			let simu = "";

			if (waitTel2[0].checked) {
				simu = "1 simulation";
				document.getElementById("prixUwait").innerHTML = "5 €";
				prixUwait = 5;
			}
			if (waitTel2[1].checked) {
				simu = "2 simulations";
				document.getElementById("prixUwait").innerHTML = "10 €";
				prixUwait = 10;
			}
			if (waitTel2[2].checked) {
				simu = "En illimité";
				document.getElementById("prixUwait").innerHTML = "15 €";
				prixUwait = 15;
			}

			document.getElementById("tarifWait").innerHTML = '<i class="material-icons">flash_on</i><br>' + simu;
			document.getElementById("nombreWait").innerHTML = nombreDePersonneTel.value;

			document.getElementById("prixTwait").innerHTML = pWait + " €";
		}
	});
}

/* Gestion des moments téléphone */

dateTel.addEventListener("change", function() {
	jour = dateTel.value.slice(8,10);
	mois = dateTel.value.slice(5,7);
	annee = dateTel.value.slice(0,4);

	maDate = new Date(annee, mois - 1, jour);

	momentTel.addEventListener("change", function() {
		if (maDate.getDay() == 5 || maDate.getDay() == 6 && parseInt(nombreDePersonneTel.value >= 30)) {
			if (momentTel.value == "journee" || momentTel.value == "soiree") {
				document.getElementById("alert").innerHTML = "A partir de trente personnes, le parc UPSIDE est privatisé.";
				document.getElementById("cd-popup").setAttribute("class", "is-visible");
			}
		}
		else {
			if (momentTel.value == "soiree" && parseInt(nombreDePersonneTel.value >= 30)) {
				document.getElementById("alert").innerHTML = "A partir de trente personnes, le parc UPSIDE est privatisé.";
				document.getElementById("cd-popup").setAttribute("class", "is-visible");
			}
		}
	});
});

let tabDureeTel = document.getElementById("duree_tel_id");

momentTel.addEventListener("change", function(){
	if (dateTel.value != "") {
		if (maDate.getDay() == 5 || maDate.getDay() == 6) {
			if (momentTel.value == "matinee") {
				prixBase = 25;
			}
			else {
				prixBase = 30;
			}
		}
		else {
			if (momentTel.value == "matinee" || momentTel.value == "apresmidi" || momentTel.value == "journee") {
				prixBase = 20;
			}
			else {
				prixBase = 25;
			}
		}
	}

	if (momentTel.value == "matinee" || momentTel.value == "apresmidi") {
		for (let i = 0; i < tabDureeTel.length; i ++) {
			if (parseInt(tabDureeTel[i].value) > 240) {
				tabDureeTel[i].setAttribute("disabled", "");
			}
			else {
				tabDureeTel[i].removeAttribute("disabled", "");
			}
		}
	}
	else if (momentTel.value == "soiree") {
		for (let i = 0; i < tabDureeTel.length; i ++) {
			if (parseInt(tabDureeTel[i].value) > 300) {
				tabDureeTel[i].setAttribute("disabled", "");
			}
			else {
				tabDureeTel[i].removeAttribute("disabled", "");
			}
		}
	}
	else if (momentTel.value == "journee") {
		for (let i = 0; i < tabDureeTel.length; i ++) {
			if (i == tabDureeTel.length - 1) {
				tabDureeTel[tabDureeTel.length - 1].setAttribute("disabled", "");
			}
			else {
				tabDureeTel[i].removeAttribute("disabled", "");
			}
		}
	}
	else {
		for (let i = 0; i < tabDureeTel.length; i ++) {
			if (i != tabDureeTel.length - 1) {
				tabDureeTel[i].setAttribute("disabled", "");
			}
			else {
				tabDureeTel[i].removeAttribute("disabled", "");
			}
		}
	}
});

dureeTel.addEventListener("change", function() {
	if (dateTel.value != "" && momentTel.value != "" && nombreDePersonneTel.value != "") {
		document.getElementsByClassName("sidebarTel")[0].style.display = "block";
		document.getElementById("dateTel").innerHTML = jour + "/" + mois + "/" + annee;
		document.getElementById("nombrePersonneTel").innerHTML = nombreDePersonneTel.value;
		document.getElementById("momentTel").innerHTML = momentTel.value;
		document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";
	}
	else {
		document.getElementById("nbrPersonne").innerHTML = "0";
	}

	if (nombreDePersonneTel.value != "") {
		coeff = ((dureeTel.value * 13) / nombreDePersonneTel.value) / 60;
		if (coeff < 0.5) {
			document.getElementById("alert").innerHTML = "Vous avez choisi une durée trop courte, nous vous conseillons de l'augmenter !";
			document.getElementById("cd-popup").setAttribute("class", "is-visible");

			for (let i = 0; i < tabDureeTel.length; i ++) {
				if (((tabDureeTel[i].value * 13) / nombreDePersonneTel.value) / 60 < 0.5) {
					tabDureeTel[i].setAttribute("disabled", "");
				}
			}
		}
		else if (coeff >= 0.5 && coeff <= 1) {
			dureePers = 30;

			for (let i = 0; i < tabDureeTel.length; i ++) {
				if (((tabDureeTel[i].value * 13) / nombreDePersonneTel.value) / 60 >= 0.5) {
					tabDureeTel[i].removeAttribute("disabled", "");
				}
			}
		}
		else {
			dureePers = 60;

			if (coeff >= 1.5 && coeff <= 2) {
				document.getElementById("alert").innerHTML = "En choisissant ces options, les activités d'attente vous sont offertes !";
				document.getElementById("cd-popup").setAttribute("class", "is-visible");

				document.getElementById("attenteTel").style.display = "none";
				document.getElementById("simulateur").style.display = "none";

				waitTel[1].checked = true;
			}
		}

		document.getElementById("duree2").innerHTML = dureePers + " minutes par personne";
	}
});

dateTel.addEventListener("change", function() {
	if (dureeTel.value != "" && momentTel.value != "" && nombreDePersonneTel.value != "") {
		document.getElementsByClassName("sidebarTel")[0].style.display = "block";
		document.getElementById("dateTel").innerHTML = jour + "/" + mois + "/" + annee;
		document.getElementById("nombrePersonneTel").innerHTML = nombreDePersonneTel.value;
		document.getElementById("momentTel").innerHTML = momentTel.value;
		document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";
	}
	else {
		document.getElementById("nbrPersonne").innerHTML = "0";
	}
});

momentTel.addEventListener("change", function() {
	if (dateTel.value != "" && dureeTel.value != "" && nombreDePersonneTel.value != "") {
		document.getElementsByClassName("sidebarTel")[0].style.display = "block";
		document.getElementById("dateTel").innerHTML = jour + "/" + mois + "/" + annee;
		document.getElementById("nombrePersonneTel").innerHTML = nombreDePersonneTel.value;
		document.getElementById("momentTel").innerHTML = momentTel.value;
		document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";
	}
	else {
		document.getElementById("nbrPersonne").innerHTML = "0";
	}
});

nombreDePersonneTel.addEventListener("change", function() {
	if (dateTel.value != "" && momentTel.value != "" && dureeTel.value != "") {
		document.getElementsByClassName("sidebarTel")[0].style.display = "block";
		document.getElementById("dateTel").innerHTML = jour + "/" + mois + "/" + annee;
		document.getElementById("nombrePersonneTel").innerHTML = nombreDePersonneTel.value;
		document.getElementById("momentTel").innerHTML = momentTel.value;
		document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";
	}
	else {
		document.getElementById("nbrPersonne").innerHTML = "0";
	}

	if (dureeTel.value != "") {
		coeff = ((dureeTel.value * 13) / nombreDePersonneTel.value) / 60;
		if (coeff < 0.5) {
			document.getElementById("alert").innerHTML = "Vous avez choisi une durée trop courte, nous vous conseillons de l'augmenter !";
			document.getElementById("cd-popup").setAttribute("class", "is-visible");

			for (let i = 0; i < tabDureeTel.length; i ++) {
				if (((tabDureeTel[i].value * 13) / nombreDePersonneTel.value) / 60 < 0.5) {
					tabDureeTel[i].setAttribute("disabled", "");
				}
			}
		}
		else if (coeff >= 0.5 && coeff <= 1) {
			dureePers = 30;

			for (let i = 0; i < tabDureeTel.length; i ++) {
				if (((tabDureeTel[i].value * 13) / nombreDePersonneTel.value) / 60 >= 0.5) {
					tabDureeTel[i].removeAttribute("disabled", "");
				}
			}
		}
		else {
			dureePers = 60;

			if (coeff > 1.3) {
				document.getElementById("alert").innerHTML = "En choisissant ces options, les activités d'attente vous sont offertes !";
				document.getElementById("cd-popup").setAttribute("class", "is-visible");

				document.getElementById("attenteTel").style.display = "none";
				document.getElementById("simulateur").style.display = "none";

				waitTel[1].checked = true;
			}
		}

		document.getElementById("duree2").innerHTML = dureePers + " minutes par personne";
	}
});

/* Séminaire téléphone */

let reunionTel = document.getElementById("reunionTel");
let tempsReunionTel = document.getElementById("tempsReunionTel");
let tempsPleniereTel = document.getElementById("tempsPleniereTel");

let reunionTel2 = document.getElementsByName("reunionTel");
let tempsReunionTel2 = document.getElementsByName("tempsReunionTel");
let tempsPleniereTel2 = document.getElementsByName("tempsPleniereTel");

tempsReunionTel.style.display = "none";
tempsPleniereTel.style.display = "none";
document.getElementById("seminaire2").style.display = "none";

let nombrePersonneReunionTel = nombreDePersonneTel.value;

nombreDePersonneTel.addEventListener("change", function() {
	if (nombreDePersonneTel.value < 25) {
		reunionTel2[1].removeAttribute("disabled", "");
	}
	else if (nombreDePersonneTel.value < 60) {
		reunionTel2[2].removeAttribute("disabled", "");
	}
});

reunionTel2[0].addEventListener("click", function() {
	tempsReunionTel.style.display = "none";
	tempsPleniereTel.style.display = "none";

	typeSeminaire = "";
	dureeSem = "";

	for (let i = 0; i != 2; i ++) {
		tempsReunionTel2[i].checked = false;
		tempsPleniereTel2[i].checked = false;
		tempsReunionTel2[i].removeAttribute("required", "");
		tempsPleniereTel2[i].removeAttribute("required", "");
	}
	
	nombrePersonneReunionTel = "";
	
	prixSeminaire = 0;
	document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";
});

reunionTel2[1].addEventListener("click", function() {

	if (nombreDePersonneTel.value > 25) {
		document.getElementById("alert").innerHTML = "La capacité maximale de notre salle de réunion est de 25 personnes, vous pouvez soit dimunuer le nombre de participants, soit opter pour le format séminaire.";
		document.getElementById("cd-popup").setAttribute("class", "is-visible");

		reunionTel2[1].setAttribute("disabled", "");
		reunionTel2[1].checked = false;
		tempsReunionTel.style.display = "none";
	}
	else {
		tempsReunionTel.style.display = "block";
	}

	document.getElementById("seminaire2").style.display = "table-row";
	tempsPleniereTel.style.display = "none";

	typeSeminaire = "réunion";

	for (let i = 0; i != 2; i ++) {
		tempsPleniereTel2[i].checked = false;
		tempsReunionTel2[i].setAttribute("required", "");
		tempsPleniereTel2[i].removeAttribute("required", "");
	}

	nombrePersonneReunionTel = nombreDePersonne.value;
});

reunionTel2[2].addEventListener("click", function() {

	if (nombreDePersonneTel.value > 60) {	
		document.getElementById("alert").innerHTML = "La capacité maximale de l'espace de séminaire en plénière est de 60 personnes.";
		document.getElementById("cd-popup").setAttribute("class", "is-visible");

		reunionTel2[1].setAttribute("disabled", "");
		reunionTel2[2].setAttribute("disabled", "");
		
		reunionTel2[2].checked = false;
		tempsPleniereTel.style.display = "none";
	}
	else {
		tempsPleniereTel.style.display = "block";
		reunionTel2[2].removeAttribute("disabled", "");		
	}

	document.getElementById("seminaire2").style.display = "table-row";
	tempsReunionTel.style.display = "none";
	typeSeminaire = "plénière";

	for (let i = 0; i != 2; i ++) {
		tempsReunionTel2[i].checked = false;
		tempsReunionTel2[i].removeAttribute("required", "");
		tempsPleniereTel2[i].setAttribute("required", "");
	}

	nombrePersonneReunionTel = nombreDePersonne.value;
});

tempsReunionTel2[0].addEventListener("click", function() {
	dureeSem = "1/2 journée";
	prixSeminaire = 100;
	document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";
});

tempsReunionTel2[1].addEventListener("click", function() {
	dureeSem = "1 journée";
	prixSeminaire = 150;
	document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";
});

tempsPleniereTel2[0].addEventListener("click", function() {
	dureeSem = "1/2 journée";
	prixSeminaire = 100;
	document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";
});

tempsPleniereTel2[1].addEventListener("click", function() {
	dureeSem = "1 journée";
	prixSeminaire = 150;
	document.getElementById("prixTel").innerHTML = (calculPrixTel(prixBase) + pTotal + prixSeminaire) + " € HT";
});

/* Popup téléphone */

let popupTel = document.getElementById("nombre_tel_id");

popupTel.addEventListener("change", function() {
	if (nombreDePersonneTel.value > 110) {
		document.getElementById("alert").innerHTML = "Pour une capacité de plus de 110 personnes, veuillez nous contacter pour un évènement sur-mesure !";
		document.getElementById("cd-popup").setAttribute("class", "is-visible");
	}
	else {
		if (dureeTel.value != "" && nombreDePersonneTel.value != "") {
			if (coeff < 0.5 && nombreDePersonneTel.value >= 30) {
				document.getElementById("alert").innerHTML =
				"A partir de trente personnes, le parc UPSIDE est privatisé." +
				"<br><br>Vous avez choisi une durée trop courte, nous vous conseillons de l'augmenter !";

				document.getElementById("cd-popup").setAttribute("class", "is-visible");
				document.getElementById("private").innerHTML = '<i class="material-icons">block</i>';
			}
		}
		else if (nombreDePersonneTel.value >= 30) {
			document.getElementById("alert").innerHTML = "A partir de trente personnes, le parc UPSIDE est privatisé.";
			document.getElementById("cd-popup").setAttribute("class", "is-visible");

			document.getElementById("private").innerHTML = '<i class="material-icons">block</i>';
		}
		else {
			document.getElementById("private").innerHTML = '<i class="material-icons">calendar_today</i>';
		}
	}
});

function removeFormTel2() {
	completeDevisTel();

	document.getElementsByClassName("sidebarTel")[0].style.display = "none";

	document.getElementById("tableau").style.display = "block";

	if (rgpd == true) {
		requeteSelectUser(nomTel.value, prenomTel.value, emailTel.value, telTel.value, dureeTel.value, momentTel.value, nombreDePersonneTel.value, remarqueTel.value,
			typeSeminaire, nombrePersonneReunionTel, dureeSem);
	}

	document.getElementsByClassName("sidebar")[0].style.display = "block";	

	form2Tel.remove(form2Tel);
}

function completeDevisTel() {
	let prixTpersonne = prixBase * nombreDePersonneTel.value;
	let prixTtraiteur = prixUtraiteur * nombreDePersonneTel.value;
	let prixTboisson = prixUboisson * nombreDePersonneTel.value;
	let prixTwait = prixUwait * nombreDePersonneTel.value;

	let prixT = prixTpersonne + prixTtraiteur + prixTboisson + prixTwait;
	let prixTVA = prixTpersonne * (20/100) + prixTtraiteur * (20/100) + prixTboisson * (20/100) + prixTwait * (20/100);
	let prixTTC = prixT + prixTVA;

	document.getElementsByClassName("sidebar")[0].innerHTML = '<div><p>Total HT : ' + prixT + '€</p><p>TVA : ' + prixTVA + ' €</p><p>Total TTC : ' + prixTTC + ' €</p>'
	+ '<button id="contact" class="btn" type="submit">Être rappelé</button></div>';

	document.getElementById("contact").addEventListener("click", function() {
		document.getElementById("alert").innerHTML = "Notre équipe à bien reçu votre demande.<br>Vous serez recontacté sous peu.<br>Merci !"
		document.getElementById("cd-popup").setAttribute("class", "is-visible");

		mail(nomTel.value, prenomTel.value);
	});

	let dureeEnHeure = (Math.trunc(dureeTel.value / 60)) + "h" + (dureeTel.value % 60);

	document.getElementById("duree").innerHTML = dureeEnHeure;

	document.getElementById("forfaitPersonne").innerHTML = '<i class="material-icons">person</i>';
	document.getElementById("nombrePersonne").innerHTML = nombreDePersonneTel.value;
	document.getElementById("prixUpersonne").innerHTML = prixBase + " €";
	document.getElementById("prixTpersonne").innerHTML = prixBase * nombreDePersonneTel.value + " €";

	document.getElementById("nombreSem").innerHTML = nombrePersonneReunionTel + " personnes"
	+ "<br>" + dureeSem;

	document.getElementById("formatSem").innerHTML = typeSeminaire;

	document.getElementById("prixSem").innerHTML = prixSeminaire + " €";
}

document.getElementById("ok").addEventListener("click", removeClass);
document.getElementById("annuler").addEventListener("click", removeClass);

function removeClass() {
	document.getElementById("cd-popup").removeAttribute("class", "is-visible");
}

document.getElementById("arrow_up").addEventListener("click", showSpec);

function showSpec() {
	document.getElementById("spec").style.display = "block";

	let elem = document.getElementsByClassName("sidebarTel");

	elem[0].animate([
	{
		bottom : "0%",
		top : "82%"
	},
	{
		bottom : "0%",
		top : "50%"
	}], 300);

	elem[0].style.top = "50%";

	document.getElementById("arrow_up").innerHTML = '<i class="material-icons">keyboard_arrow_down</i>';
	document.getElementById("arrow_up").removeEventListener("click", showSpec);
	document.getElementById("arrow_up").addEventListener("click", hideSpec);
}

function hideSpec() {
	document.getElementById("spec").style.display = "none";

	let elem = document.getElementsByClassName("sidebarTel");

	elem[0].animate([
	{
		bottom : "0%",
		top : "50%"
	},
	{
		bottom : "0%",
		top : "82%"
	}], 300);

	elem[0].style.top = "82%";

	document.getElementById("arrow_up").innerHTML = '<i class="material-icons">keyboard_arrow_up</i>';
	document.getElementById("arrow_up").removeEventListener("click", hideSpec);
	document.getElementById("arrow_up").addEventListener("click", showSpec);
}

//Partie générale

function callback(req) {
	console.log(req.responseText);
}

let side = document.getElementById("side");
side.style.display = "none";

document.getElementById("tableau").style.display = "none";

document.getElementById("spec").style.display = "none";

function mail(nom, prenom) {
	let url = "https://www.upside-vr.fr/DevisEnLigne/php/mail.php?nom=" + nom + "&prenom=" + prenom;
	let requete = new XMLHttpRequest();

	requete.open("POST", url, true);

	requete.addEventListener("load", function () {
		callback(requete);
	});

	requete.send(null);
}

/* Requête de sauvegarde des utilisateurs */

function requeteUser(nom, prenom, email) {
	requeteSaveUser(nom, prenom, email);
}

function requeteUser(nom, prenom, email, tel) {
	requeteSaveUser(nom, prenom, email, tel);
}

//Requête Ajax pour la création d'un utilisateur sans téléphone

function requeteSaveUser(nom, prenom, email) {

	let url = 'https://www.upside-vr.fr/DevisEnLigne/php/requeteUtilisateur.php?nom=' + nom + '&prenom=' + prenom + '&email=' + email;
	let requete = new XMLHttpRequest();

	requete.open('POST', url, true);

	requete.addEventListener('load', function () {
		callback(requete);
	});

	requete.send(null);
}

//Requête Ajax pour la création d'un utilisateur avec téléphone

function requeteSaveUser(nom, prenom, email, tel) {

	let url = 'https://www.upside-vr.fr/DevisEnLigne/php/requeteUtilisateur.php?nom=' + nom + '&prenom=' + prenom + '&email=' + email + '&tel=' + tel;
	let requete = new XMLHttpRequest();

	requete.open('POST', url, true);

	requete.addEventListener('load', function () {
		callback(requete);
	});

	requete.send(null);
}

//Requête Ajax pour la création des devis.

function requeteSaveDevis(user, duree, dureePers, date, moment, nombreDePersonne, remarque, typeSeminaire, nombreReunion, dureeSem, prixSeminaire, prixUpersonne
	, prixUtraiteur, prixUboisson, prixUwait, prixTpersonne, prixTtraiteur, prixTboisson, prixTwait, prixT, coeff, email, nom, prenom, prixTVA, prixTTC, tel) {
	let url = "https://www.upside-vr.fr/DevisEnLigne/php/requeteDevis.php?date=" + date + "&duree=" + duree + "&dureePers=" + dureePers + "&nombreDePersonne=" + nombreDePersonne
	+ "&remarque=" + remarque + "&user=" + user + "&typeSeminaire=" + typeSeminaire + "&nombreReunion=" + nombreReunion + "&dureeSem=" + dureeSem
	+ "&prixSeminaire=" + prixSeminaire + "&prixUpersonne=" + prixUpersonne + "&prixUtraiteur=" + prixUtraiteur + "&prixUboisson=" + prixUboisson
	+ "&prixUwait=" + prixUwait + "&prixTpersonne=" + prixTpersonne + "&prixTtraiteur=" + prixTtraiteur + "&prixTboisson=" + prixTboisson
	+ "&prixTwait=" + prixTwait + "&prixT=" + prixT + "&coeff=" + coeff + "&moment=" + moment + "&email=" + email + "&nom=" + nom + "&prenom=" + prenom
	+ "&prixTVA=" + prixTVA + "&prixTTC=" + prixTTC + "&tel=" + tel;

	let requete = new XMLHttpRequest();

	requete.open("POST", url, true);

	requete.addEventListener("load", function () {
		callback(requete);
	});

	requete.send(null);
}

function requeteSelectUser(nom, prenom, email, tel, duree, moment, nombreDePersonne, remarque, typeSeminaire, nombrePersonneReunion, dureeSem) {
	let url = "https://www.upside-vr.fr/DevisEnLigne/php/requeteSelectUser.php?nom=" + nom + "&prenom=" + prenom + "&email=" + email;
	let requete = new XMLHttpRequest();

	requete.open("POST", url, true);

	requete.addEventListener("load", function () {
		callback2(requete, nom, prenom, email, tel, duree, moment, nombreDePersonne, remarque, typeSeminaire, nombrePersonneReunion, dureeSem);
	});

	requete.send(null);
}

function callback2(req, nom, prenom, email, tel, duree, moment, nombreDePersonne, remarque, typeSeminaire, nombrePersonneReunion, dureeSem) {
	let prixTpersonne = prixBase * nombreDePersonne;
	let prixTtraiteur = prixUtraiteur * nombreDePersonne;
	let prixTboisson = prixUboisson * nombreDePersonne;
	let prixTwait = prixUwait * nombreDePersonne;

	let prixT = prixTpersonne + prixTtraiteur + prixTboisson + prixTwait;
	let prixTVA = prixTpersonne * (20/100) + prixTtraiteur * (20/100) + prixTboisson * (20/100) + prixTwait * (20/100);
	let prixTTC = prixT + prixTVA;

	let time = annee + "-" + mois + "-" + jour;
	let dureeEnHeure = (Math.trunc(duree / 60)) + "h" + (duree % 60);

	requeteSaveDevis(req.responseText, dureeEnHeure, dureePers, time, moment, parseInt(nombreDePersonne), remarque,
		typeSeminaire, nombrePersonneReunion, dureeSem, prixSeminaire, prixBase, prixUtraiteur, prixUboisson, prixUwait, prixTpersonne, prixTtraiteur,
		prixTboisson, prixTwait, prixT, coeff, email, nom, prenom, prixTVA, prixTTC, tel);
}

function calculPrix(prixBase) {
	return (duree.value/60) * 13 * prixBase;
}

function calculPrixTel(prixBase) {
	return (dureeTel.value/60) * 13 * prixBase;
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
	let url = "https://www.upside-vr.fr/DevisEnLigne/php/requeteSaveRobot.php?date=" + date + "&moment=" + moment + "&nombreDePersonne=" + nombreDePersonne +
	"&duree=" + duree + "&coeff=" + coeff + "&prix=" + prix;
	let requete = new XMLHttpRequest();

	requete.open("POST", url, true);

	requete.addEventListener("load", function () {
		callback(requete);
	});

	requete.send(null);
}*/