<?php
require_once('ModelDevis.php');

	// récupération du contenu du champ, passé en get
$data = array('numeroClient' => $_GET['user'],
	'Duree' => $_GET['duree'],
	'DureeParPersonne' => $_GET['dureePers'],
	'Date' => $_GET['date'],
	'Moment' => $_GET['moment'],
	'NombreDePersonne' => $_GET['nombreDePersonne'],
	'Remarque' => $_GET['remarque'],
	'TypeSeminaire' => $_GET['typeSeminaire'],
	'NombrePersonneEnSeminaire' => $_GET['nombreReunion'],
	'DureeSeminaire' => $_GET['dureeSem'],
	'PrixSeminaire' => $_GET['prixSeminaire'],
	'PrixUPersonne' => $_GET['prixUpersonne'],
	'PrixUTraiteur' => $_GET['prixUtraiteur'],
	'PrixUBoisson' => $_GET['prixUboisson'],
	'PrixUWait' => $_GET['prixUwait'],
	'PrixTPersonne' => $_GET['prixTpersonne'],
	'PrixTTraiteur' => $_GET['prixTtraiteur'],
	'PrixTBoisson' => $_GET['prixTboisson'],
	'PrixTWait' => $_GET['prixTwait'],
	'PrixT' => $_GET['prixT'],
	'Coeff' => $_GET['coeff']);

$menu = "";

if ($_GET['prixUtraiteur'] != 0) {
	if ($_GET['prixUtraiteur'] == 15) {
		$menu = "entree/plat";
	}
	else if ($_GET['prixUtraiteur'] == 20) {
		$menu = "plat/dessert";
	}
	else {
		$menu = "entree/plat/dessert";
	}
}

$private = "";

if ($_GET['nombreDePersonne'] >= 20) {
	$private = "privatisation";
}

$nombreBoisson = "";

if ($_GET['prixUboisson'] != 0) {
	if ($_GET['prixUboisson'] == 3) {
		$nombreBoisson = "1";
	}
	else if ($_GET['prixUboisson'] == 5.5) {
		$nombreBoisson = "2";
	}
	else {
		$nombreBoisson = "3";
	}
}

$nombreWait = "";

if ($_GET['prixUwait'] != 0) {
	if ($_GET['prixUwait'] == 5) {
		$nombreWait = "1";
	}
	else if ($_GET['prixUwait'] == 10) {
		$nombreWait = "2";
	}
	else {
		$nombreWait = "3";
	}
}

	 // Un destinataire
$to  = $_GET['email'];

     // Sujet
$subject = 'Votre devis';

     // message
$message = '
<html>
	<head>
		<meta charset="utf-8">
		<title>Devis de votre événement</title>
	</head>
	<body>
		<p>Bonjour ' . $_GET['prenom'] . '</p>
		<p>Vous avez demandé un devis pour un événement chez UPSIDE et nous vous en remercions.</p>
		<p>Voici le détail de votre demande :</p>
		<p>
			<ul>
				<li>Date : ' . $_GET['date'] . '</li>
				<li>Durée de l\'événement : ' . $_GET['duree'] . ' minutes</li>
				<li>Nombre de participants : ' . $_GET['nombreDePersonne'] . '</li>
				<li>Temps de jeu par personne : ' . $_GET['dureePers'] . ' minutes</li>
				<li>Forfait boisson : ' . $nombreBoisson . ' par personne & ' . $_GET['prixUboisson'] . ' € par personne</li>
				<li>Simulateurs : ' . $nombreWait . ' & ' . $_GET['prixUwait'] . ' € par personne</li>
				<li>Traiteur : ' . $menu . ' & ' . $_GET['prixUtraiteur'] . ' € par personne</li>
				<li>Salle de séminaire : ' . $_GET['nombreReunion'] . ' & ' . $_GET['typeSeminaire'] . ' & ' . $_GET['prixSeminaire'] . '</li>
				<li>Simulateurs : ' . $nombreWait . ' & ' . $_GET['prixUwait'] . ' € par personne</li>
			</ul>
		</p>
		<p>
			<ul>
				<li>Total HT : ' . $_GET['prixT'] . ' €</li>
				<li>TVA : ' . $_GET['prixTVA'] . ' €</li>
				<li>Total TTC : ' . $_GET['prixTTC'] . ' €</li>
			</ul>
		</p>
	</body>
</html>
';

     // Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset="utf-8"';

     // En-têtes additionnels
$headers[] = 'From: devis@upside-vr.fr';

     // Envoi
mail($to, $subject, $message, implode("\r\n", $headers));

$subject2 = "Réservation";

$message2 = '
<html>
	<head>
		<title>Devis d\'un événement</title>
	</head>
	<body>
		<p>Nom :' . $_GET['nom'] . ' Prenom : ' . $_GET['prenom'] . ' Adresse : ' . $_GET['email'] . ' Numéro de téléphone : ' . $_GET['tel'] . '</p>
		<p>Vous a demandé un devis pour un événement chez UPSIDE.</p>
		<p>Voici le détail de sa demande :</p>
	<p>
		<ul>
			<li> Date : ' . $_GET['date'] . ' </li>
			<li>Durée de l\'événement : ' . $_GET['duree'] . ' minutes</li>
			<li>Nombre de participants : ' . $_GET['nombreDePersonne'] . '</li>
			<li>Coeff : ' . $_GET['coeff'] . '</li>
			<li>Temps de jeu par personne : ' . $_GET['dureePers'] . ' minutes</li>
			<li>Forfait boisson : ' . $nombreBoisson . ' par personne & ' . $_GET['prixUboisson'] . ' € par personne</li>
			<li>Simulateurs : ' . $nombreWait . ' & ' . $_GET['prixUwait'] . ' € par personne</li>
			<li>Traiteur : ' . $menu . ' & ' . $_GET['prixUtraiteur'] . ' € par personne</li>
			<li>Salle de séminaire : ' . $_GET['nombreReunion'] . ' & ' . $_GET['typeSeminaire'] . ' & ' . $_GET['prixSeminaire'] . '</li>
			<li>Simulateurs : ' . $nombreWait . ' & ' . $_GET['prixUwait'] . ' € par personne</li>
		</ul>
	</p>
	<p>
		<ul>
			<li>Total HT : ' . $_GET['prixT'] . ' €</li>
			<li>TVA : ' . $_GET['prixTVA'] . ' €</li>
			<li>Total TTC : ' . $_GET['prixTTC'] . ' €</li>
		</ul>
	</p>
	</body>
</html>
';

mail("devis@upside-vr.fr", $subject2, $message2, implode("\r\n", $headers));

	// lancement de la requête SQL avec selectByName et
	// récupération du résultat de la requête SQL
$resultat = ModelDevis::save($data);

	// affichage en format JSON du résultat précédent
echo json_encode($resultat);
?>