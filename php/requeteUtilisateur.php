<?php
	require_once('ModelUser.php');

	// récupération du contenu du champ, passé en get
	$data = array('nom' => $_GET['nom'],
				'prenom' => $_GET['prenom'],
				'email' => $_GET['email']);
	
	if (isset($_GET['tel'])) {
		$data['tel'] = $_GET['tel'];
	}


	// lancement de la requête SQL avec selectByName et
	// récupération du résultat de la requête SQL
	$resultat = ModelUser::saveUser($data);

	// affichage en format JSON du résultat précédent
	echo json_encode($resultat);
?>