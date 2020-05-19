<?php
require_once ('Model.php');

class ModelUser extends Model {

	protected static $object = "professionnel";

	private $numeroClient;
	private $nom;
	private $prenom;
	private $email;
	private $tel;

		//getter générique
	public function get($nom_attribut){
		return $this->$nom_attribut;
	}

	    //setter générique
	public function set($nom_attribut,$value){
		$this->$nom_attribut = $value;
	}

	    // un constructeur
	    // La syntaxe ... = NULL signifie que l'argument est optionel
	    // Si un argument optionnel n'est pas fourni,
	    //   alors il prend la valeur par défaut, NULL dans notre cas
	public function __construct($data = NULL) {
		if (!is_null($data['numeroClient']) && !is_null($data['nom']) && !is_null($data['prenom']) && !is_null($data['email'])) {
	        // Si aucun de $m, $c et $i sont nuls,
	        // c'est forcement qu'on les a fournis
	        // donc on retombe sur le constructeur à 3 arguments
			$this->numeroClient = $data['numeroClient'];
			$this->nom = $data['nom'];
			$this->prenom = $data['prenom'];
			$this->email = $data['email'];
			$this->tel = $data['tel'];
		}
	}

	public static function selectUser($nom, $prenom, $email) {

		$sql = "SELECT numeroClient from Professionnel WHERE nom = :nom AND prenom = :prenom AND email = :email";
	    // Préparation de la requête
		$req_prep = Model::$pdo->prepare($sql);

		$values = array("nom" => $nom,
			"prenom" => $prenom,
			"email" => $email);

		$req_prep->execute($values);

            // On récupère les résultats comme précédemment
		$req_prep->setFetchMode(PDO::FETCH_CLASS, 'ModelUser');
		$tab_user = $req_prep->fetchAll();
            // Attention, si il n'y a pas de résultats, on renvoie false
		if (empty($tab_user))
			return false;
		return $tab_user[0];
	}
}
?>