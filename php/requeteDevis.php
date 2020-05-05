<?php
	require_once('Model.php');

	static $object = "devis";

	$duree = 0;

	if ($_GET["moment"] = "matinee" || $_GET["moment"] = "apresmidi" || $_GET["moment"] = "soiree") {
		$duree = 4;
	}
	else if ($_GET["moment"] = "journee") {
		$duree = 8;
	}
	else {
		$duree = 12;
	}

	$req = ModelUser::selectUser($_GET['nom'], $_GET['prenom'], $_GET['email']);

	// récupération du contenu du champ, passé en get
	$data = array('numeroClient' => $req,
				'duree' => $duree,
				'date' => = $_GET['date'];
				'nombreDePersonne' => $_GET['nombreDePersonne'],
				'traiteur' => $_GET['traiteur'],
				'boisson' => $_GET['boisson']);


	// lancement de la requête SQL avec selectByName et
	// récupération du résultat de la requête SQL
	$resultat = ModelDevis::saveDevis($data);

	// affichage en format JSON du résultat précédent
	echo json_encode($resultat);
?>