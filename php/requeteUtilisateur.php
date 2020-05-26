<?php
	require_once('ModelUser.php');

	// récupération du contenu du champ, passé en get
	$data = array('Nom' => $_GET['nom'],
				'Prenom' => $_GET['prenom'],
				'Email' => $_GET['email']);
	
	if (isset($_GET['tel'])) {
		$data['Telephone'] = $_GET['tel'];
	}


	// lancement de la requête SQL avec selectByName et
	// récupération du résultat de la requête SQL
	$resultat = ModelUser::save($data);

	// affichage en format JSON du résultat précédent
	echo json_encode($resultat);
?>