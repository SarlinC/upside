<?php
require_once('ModelRobot.php');

// récupération du contenu du champ, passé en get
$data = array('Date' => $_GET['date'],
	'Moment' => $_GET['moment'],
	'NombreDePersonne' => $_GET['nombreDePersonne'],
	'Duree' => $_GET['duree'],
	'Coeff' => $_GET['coeff'],
	'Prix' => $_GET['prix']);

// lancement de la requête SQL avec selectByName et
// récupération du résultat de la requête SQL
$resultat = ModelRobot::save($data);

// affichage en format JSON du résultat précédent
echo json_encode($resultat);
?>