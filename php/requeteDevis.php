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

$boisson = "";
$traiteur = "";
$simulateur = "";
$seminaire = "";

if (!($nombreBoisson == "")) {
	$boisson = '<tr><td>Forfait boisson : </td><td>' . $nombreBoisson . ' boissons par personne</td><td>' . $_GET['prixUboisson'] . ' €</td><td>' . $_GET['prixTboisson'] . ' €</td></tr>';
}

if (!($menu == "")) {
	$traiteur = '<tr><td>Traiteur : </td><td>' . $menu . '</td><td>' . $_GET['prixUtraiteur'] . ' €</td><td>' . $_GET['prixTtraiteur'] . ' €</td></tr>';
}

if (!($nombreWait == "")) {
	$simulateur = '<tr><td>Simulateurs : </td><td>' . $nombreWait . ' par personne</td><td>' . $_GET['prixUwait'] . ' €</td><td>' . $_GET['prixTwait'] . ' €</td></tr>';
}

if (!($_GET['nombreReunion'] == "")) {
	$seminaire = '<tr><td>Salle de séminaire de type : ' . $_GET['typeSeminaire'] . '</td><td>' . $_GET['nombreReunion'] . ' participants</td><td></td><td>' . $_GET['prixSeminaire'] . '</td></tr>';
}

     // message
$message = '
<html>
	<head>
		<meta charset="utf-8">
		<title>Devis de votre événement</title>

		<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
		
		<style type="text/css">

	         table, tr, td {

	            border: 2px solid #635D5D !important;

	            border-collapse: collapse;

	            padding: 2% 1%;

	            text-align: center;

	            width: 80%;

	            margin: auto;

	        }

	        thead {
	        	background-color: #D03838;

	        	text-align: center;

	        	padding: 2% 1%;

	        	color: white;
	        }

	        tbody {
	        	background-color: #E3D4D4;

	        	text-align: center;

	        	padding: 2% 1%;

	        	color: black;
	        }

	        p {
	        	color: white;
	        	text-align: left;
	        	display: flex;
	        }

	        td{

	            width: 25%;

	        }

	        h1, h2, h3, h4 {

	            text-align: center;

	        }	 

	        .wrapper{

	            text-align: center;

	        }

	        .logo{

	            width: 4em;

	            margin: 1% 2%;

	        }

	        b {

	        	color: #51CDB4;
	        	
	        }

	        .prix {
	        	background-color: #3D3A3A;
	        	color: white;
	        	width: 80%;
	        	margin: auto;
	        	text-align: right;
	        	display: flex;
	        }

	        .pspe {
	        	text-align: left;
	        	margin-left: 2%;
	        }
    	</style>
	</head>
	<body>
		<div style="max-width:800px;margin:10; font-family: "Montserrat", sans-serif;">

	        <div style="text-align: center;">
		        <a href="https://www.upside-vr.fr">
		        	<img style="width: 60%;" src="https://www.cypher-vr.com/media/logo/logo-upside" alt="UPSIDE" border="0">
		        </a>
	        </div>

	        <div class="wrapper">

				<h2>Bonjour ' . $_GET['prenom'] . '</h2>
				<h4>Vous avez demandé un devis pour un événement chez UPSIDE et nous vous en remercions.</h4>
				<h3>Voici les détails de votre demande pour le ' . $_GET['date'] . ' d\'une durée de ' . $_GET['duree'] . ' pour un temps de jeu de ' . $_GET['dureePers'] . ' minutes par personne.</h3>

				<table>
					<thead>
						<tr>
							<td>
								Désignation :
							</td>

							<td>
								Quantitée :
							</td>

							<td>
								Prix Unitaire :
							</td>

							<td>
								Total HT :
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								Nombre de participants :
							</td>

							<td>
								' . $_GET['nombreDePersonne'] . '
							</td>

							<td>
								' . $_GET['prixUpersonne'] . ' €
							</td>

							<td>
								' . $_GET['prixTpersonne'] . ' €
							</td>
						</tr>
							' . $boisson . '
							' . $traiteur . '
							' . $simulateur . '
							' . $seminaire . '
					</tbody>
				</table>

				<br>
				
				<div class="prix">
					<div style="width: 100%;">
					</div>

					<div style="text-align: -webkit-center; width: 40%;">
						<h1>Détail du prix :</h1>

						<h2>
							<div style="display: flex;"><p style="text-align: right; display: block; width: 50%;">Total HT : </p><p class="pspe"><b>' . $_GET['prixT'] . '</b> €</p></div>

							<div style="display: flex;"><p style="text-align: right; display: block; width: 50%;">TVA : </p><p class="pspe"><b>' . $_GET['prixTVA'] . '</b> €</p></div>
							
							<div style="display: flex;"><p style="text-align: right; display: block; width: 50%;">Total TTC : </p><p class="pspe"><b>' . $_GET['prixTTC'] . '</b> €</p></div>
						</h2>
					</div>
				</div>
			</div>
		</div>

		<br>
		<br>

		 <div style="border: 2px solid #51CDB4; width: 80%; margin: auto;">

            <h3 style="text-align: center; color: black;">

                <strong>UPSIDE s\'engage pour vous accueillir dans les meilleures conditions :</strong>

            </h3>

            <ul>

                <li>Gel hydro alcoolique à votre disposition</li>

                <li>Nettoyage et désinfection systématique des équipements entre les sessions</li>

                <li>Animateurs équipés de masques ou visières de protection</li>

                <li>Marquage au sol pour respecter la distanciation physique</li>

                <li>Locaux nettoyés et désinfectés quotidiennement</li>

            </ul>

            <p style="text-align: center; color: black;">

                <strong>Cliquez

                    <a href="https://www.upside-vr.fr/hygiene">ici</a> pour visiter notre page dédiée.

                </strong>

            </p>

        </div>
	</body>
</html>
';

     // Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset="utf-8"';

     // En-têtes additionnels
$headers[] = 'From: Upside <devis@upside-vr.fr>';

     // Envoi
mail($to, $subject, $message, implode("\r\n", $headers));

$subject2 = "Réservation";

$message2 = '
<html>
	<head>
		<title>Devis d\'un événement</title>

		<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">

		<style type="text/css">

	        table, tr, td {

	            border: 2px solid #635D5D !important;

	            border-collapse: collapse;

	            padding: 2% 1%;

	            text-align: center;

	            width: 80%;

	            margin: auto;

	        }

	        thead {
	        	background-color: #D03838;

	        	text-align: center;

	        	padding: 2% 1%;

	        	color: white;
	        }

	        tbody {
	        	background-color: #E3D4D4;

	        	text-align: center;

	        	padding: 2% 1%;

	        	color: black;
	        }

	        p {
	        	color: white;
	        	text-align: left;
	        	display: flex;
	        }

	        td{

	            width: 25%;

	        }

	        h1, h2, h3, h4 {

	            text-align: center;

	        }	 

	        .wrapper{

	            text-align: center;

	        }

	        .logo{

	            width: 4em;

	            margin: 1% 2%;

	        }

	        b {

	        	color: #51CDB4;
	        	
	        }

	        .prix {
	        	background-color: #3D3A3A;
	        	color: white;
	        	width: 80%;
	        	margin: auto;
	        	text-align: right;
	        	display: flex;
	        }

	        .pspe {
	        	text-align: left;
	        	margin-left: 2%;
	        }
    	</style>
	</head>
	<body>
		<div style="max-width:800px;margin:10; font-family: "Montserrat", sans-serif;">

	        <div style="text-align: center;">
		        <a href="https://www.upside-vr.fr">
		        	<img style="width: 60%;" src="https://www.cypher-vr.com/media/logo/logo-upside" alt="UPSIDE" border="0">
		        </a>
	        </div>

	        <div class="wrapper">

				<h2>Nom :' . $_GET['nom'] . ' Prenom : ' . $_GET['prenom'] . ' Adresse : ' . $_GET['email'] . ' Numéro de téléphone : ' . $_GET['tel'] . '</h2>
				<h4>Vous a demandé un devis pour un événement chez UPSIDE.</h4>
				<h3>Voici les détails de sa demande pour le ' . $_GET['date'] . ' d\'une durée de ' . $_GET['duree'] . ' pour un temps de jeu de ' . $_GET['dureePers'] . ' minutes par personne.</h3>

				<table>
					<thead>
						<tr>
							<td>
								Désignation :
							</td>

							<td>
								Quantitée :
							</td>

							<td>
								Prix Unitaire :
							</td>

							<td>
								Total HT :
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								Nombre de participants :
							</td>

							<td>
								' . $_GET['nombreDePersonne'] . '
							</td>

							<td>
								' . $_GET['prixUpersonne'] . ' €
							</td>

							<td>
								' . $_GET['prixTpersonne'] . ' €
							</td>
						</tr>
							' . $boisson . '
							' . $traiteur . '
							' . $simulateur . '
							' . $seminaire . '
					</tbody>
				</table>

				<br>
				
				<div class="prix">
					<div style="width: 100%;">
					</div>
					
					<div style="text-align: -webkit-center; width: 40%;">
						<h1 style="text-align: left;">Détail du prix :</h1>

						<h2>
							<div style="display: flex;"><p style="text-align: right; display: block; width: 50%;">Total HT : </p><p class="pspe"><b>' . $_GET['prixT'] . '</b> €</p></div>

							<div style="display: flex;"><p style="text-align: right; display: block; width: 50%;">TVA : </p><p class="pspe"><b>' . $_GET['prixTVA'] . '</b> €</p></div>
							
							<div style="display: flex;"><p style="text-align: right; display: block; width: 50%;">Total TTC : </p><p class="pspe"><b>' . $_GET['prixTTC'] . '</b> €</p></div>
						</h2>
					</div>
				</div>
			</div>
		</div>

		<br>
		<br>

		 <div style="border: 2px solid #51CDB4; width: 80%; margin: auto;">

            <h3 style="text-align: center; color: black;">

                <strong>UPSIDE s\'engage pour vous accueillir dans les meilleures conditions :</strong>

            </h3>

            <ul>

                <li>Gel hydro alcoolique à votre disposition</li>

                <li>Nettoyage et désinfection systématique des équipements entre les sessions</li>

                <li>Animateurs équipés de masques ou visières de protection</li>

                <li>Marquage au sol pour respecter la distanciation physique</li>

                <li>Locaux nettoyés et désinfectés quotidiennement</li>

            </ul>

            <p style="text-align: center; color: black;">

                <strong>Cliquez

                    <a href="https://www.upside-vr.fr/hygiene">ici</a> pour visiter notre page dédiée.

                </strong>

            </p>

        </div>
	</body>
</html>
';

//mail("devis@upside-vr.fr", $subject2, $message2, implode("\r\n", $headers));

	// lancement de la requête SQL avec selectByName et
	// récupération du résultat de la requête SQL
$resultat = ModelDevis::save($data);

	// affichage en format JSON du résultat précédent
echo json_encode($resultat);
?>