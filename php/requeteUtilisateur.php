<?php
	require_once('Model.php');

	static $object = "professionnel";

	// récupération du contenu du champ, passé en get
	$data = array('nom' => $_GET['nom'],
				'prenom' => $_GET['prenom'],
				'email' => $_GET['email']);
	
	if (isset($_GET['tel'])) {
		$data['tel'] = $_GET['tel'];
	}


	// lancement de la requête SQL avec selectByName et
	// récupération du résultat de la requête SQL
	$resultat = Model::save($data);

	// affichage en format JSON du résultat précédent
	echo json_encode($resultat);
?>