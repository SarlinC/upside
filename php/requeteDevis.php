<?php
	require_once('ModelUser.php');
	require_once('ModelDevis.php');

	$req = ModelUser::selectUser($_GET['nom'], $_GET['prenom'], $_GET['email']);

	// récupération du contenu du champ, passé en get
	$data = array('numeroClient' => $req,
				'duree' => $_GET['duree,'],
				'date' => $_GET['date'],
				'nombreDePersonne' => $_GET['nombreDePersonne'],
				'traiteur' => $_GET['traiteur'],
				'boisson' => $_GET['boisson'],
				'remarque' => $_GET['remarque']);


	// lancement de la requête SQL avec selectByName et
	// récupération du résultat de la requête SQL
	$resultat = ModelDevis::saveDevis($data);

	// affichage en format JSON du résultat précédent
	echo json_encode($resultat);
?>