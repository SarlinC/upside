<?php
	require_once('Model.php');

	static $object = "devis";

	// récupération du contenu du champ, passé en get
	$data = array('date' => $_GET['date'],
				'moment' => $_GET['moment'],
				'nombreDePersonne' => $_GET['nombreDePersonne'],
				'traiteur' => $_GET['traiteur'],
				'boisson' => $_GET['boisson']);


	// lancement de la requête SQL avec selectByName et
	// récupération du résultat de la requête SQL
	$resultat = Model::save($data);

	// affichage en format JSON du résultat précédent
	echo json_encode($resultat);
?>