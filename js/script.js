let form = document.getElementById("form");
let form2 = document.getElementById("secondForm");

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
	form2.style.display = "flex";
});


function callback(req) {
	let tab = JSON.parse(req.responseText);
	let tab2 = [tab.length];

	for (let i = 0; i < tab.length; i ++) {
		tab2[i] = tab[i].name;
	}
}

function requeteUser(nom, prenom, email) {
	requeteAJAX(nom, prenom, email, callback);
}

function requeteUser(nom, prenom, email, tel) {
	requeteAJAX(nom, prenom, email, tel, callback);
}

function requeteAJAX(nom, prenom, email, callback) {

	let url = "php/requeteUtilisateur.php?nom=" + nom + "&prenom=" + prenom + "&email=" + email;
	let requete = new XMLHttpRequest();

	requete.open("GET", url, true);

	requete.addEventListener("load", function () {
		callback(requete);
		endLoadingAction();
	});

	requete.send(null);
}

function requeteAJAX(nom, prenom, email, tel, callback) {

	let url = "php/requeteUtilisateur.php?nom=" + nom + "&prenom=" + prenom + "&email=" + email + "&tel=" + tel;
	let requete = new XMLHttpRequest();

	requete.open("GET", url, true);

	requete.addEventListener("load", function () {
		callback(requete);
		endLoadingAction();
	});

	requete.send(null);
	
}

let popup = document.getElementById("nombre_id");

popup.addEventListener("change", function() {
	if (popup.value >= 30) {
		alert("En choisissant cette option, nous vous privatisons le parc.");
	}
});