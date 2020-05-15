<?php
	require_once('ModelUser.php');

	// lancement de la requête SQL avec selectByName et
	// récupération du résultat de la requête SQL
	$resultat = ModelUser::selectUser($_GET['nom'], $_GET['prenom'], $_GET['email']);

	// affichage en format JSON du résultat précédent
	echo json_encode($resultat);
?>