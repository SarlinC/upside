<?php
	require_once('ModelDevis.php');

	// récupération du contenu du champ, passé en get
	$data = array('numeroClient' => $_GET['user'],
				'Duree' => $_GET['duree'],
				'Date' => $_GET['date'],
				'NombreDePersonne' => $_GET['nombreDePersonne'],
				'Traiteur' => $_GET['traiteur'],
				'Bar' => $_GET['boisson'],
				'Remarque' => $_GET['remarque'],
				'PrixUPersonne' => $_GET['prixUpersonne'],
				'PrixUTraiteur' => $_GET['prixUtraiteur'],
				'PrixUBoisson' => $_GET['prixUboisson'],
				'PrixUWait' => $_GET['prixUwait'],
				'PrixTPersonne' => $_GET['prixTpersonne'],
				'PrixTTraiteur' => $_GET['prixTtraiteur'],
				'PrixTBoisson' => $_GET['prixTboisson'],
				'PrixTWait' => $_GET['prixTwait'],
				'PrixT' => $_GET['prixT']);


	// lancement de la requête SQL avec selectByName et
	// récupération du résultat de la requête SQL
	$resultat = ModelDevis::save($data);

	// affichage en format JSON du résultat précédent
	echo json_encode($resultat);
?>