<?php
require_once ('Model.php');

class ModelUser extends Model {

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

		$sql = "SELECT numeroClient from Professionnel WHERE $nom = :nom AND $prenom = :prenom AND $email = :email";
	    // Préparation de la requête
		$req_prep = Model::$pdo->prepare($sql);

		$values = array("nom" => $nom,
			"prenom" => $prenom,
			"eamil" => $email);

		$req_prep->execute($values);

		$req_prep->setFetchMode(PDO::FETCH_CLASS, $class_name);

		$tab_voit = $req_prep->fetchAll();
	    // Attention, si il n'y a pas de résultats, on renvoie false
		if (empty($tab_voit))
			return false;
		return $tab_voit[0];
	}

	public static function saveUser($data) {

		$value1 = "";
		$value2 = "";

		foreach ($data as $key => $value) {
			$value1 = $value1 . $key . ", ";
			$value2 = $value2 . " :" . $key . ", ";
		}

		$value1 = rtrim($value1, ", ");

		$value2 = rtrim($value2, ", ");

		try{
			$sql = "INSERT INTO $Professionnel($value1) VALUES ($value2)";

			$req_prep = Model::$pdo->prepare($sql);

			$req_prep->execute($data);
		}
		catch(PDOException $e) {
			if($e->getCode() == 23000) {
				return false;
			}
		}
		return true;
	}
}
?>