<?php
	// Un destinataire
$to  = "devis@upside-vr.fr";

    // Sujet
$subject = 'Contacte';

    // message
$message = 'Le client ' . $_GET['nom'] . ' ' . $_GET['prenom'] . ' aimerait être recontacter au plus vite !';

    // Pour envoyer un mail HTML, l'en-tête Content-type doit être défini
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset="utf-8"';

    // En-têtes additionnels
$headers[] = 'From: Upside <devis@upside-vr.fr>';

	// lancement de la requête SQL avec selectByName et
	// récupération du résultat de la requête SQL

$resultat = mail($to, $subject, $message, implode("\r\n", $headers));

	// affichage en format JSON du résultat précédent
echo json_encode($resultat);
?>