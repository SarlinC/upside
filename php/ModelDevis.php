<?php
require_once ('Model.php');

class ModelDevis extends Model {

	private $numeroDevis;
	private $numeroClient;
	private $duree;
	private $date;
	private $nombreDePersonne;
	private $traiteur;
	private $boisson;

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
	    // alors il prend la valeur par défaut, NULL dans notre cas
	public function __construct($data = NULL) {
		if (!is_null($data['numeroClient']) && !is_null($data['duree']) && !is_null($data['date']) && !is_null($data['nombreDePersonne'])
			&& !is_null($data['traiteur']) && !is_null($data['boisson'])) {
	        
			$this->numeroClient = $data['numeroClient'];
			$this->duree = $data['duree'];
			$this->date = $data['date'];
			$this->nombreDePersonne = $data['nombreDePersonne'];
			$this->traiteur = $data['traiteur'];
			$this->boisson = $data['boisson'];
		}
	}

	public static function saveDevis($data) {

		$value1 = "";
		$value2 = "";

		foreach ($data as $key => $value) {
			$value1 = $value1 . $key . ", ";
			$value2 = $value2 . " :" . $key . ", ";
		}

		$value1 = rtrim($value1, ", ");

		$value2 = rtrim($value2, ", ");

		try{
			$sql = "INSERT INTO Devis($value1) VALUES ($value2)";

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