<?php
require_once ('Model.php');

class ModelRobot extends Model {

	protected static $object = "robot";

	private $NumeroTest;
	private $date;
	private $moment;
	private $duree;
	private $nombreDePersonne;
	private $coeff;
	private $prix;

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
		if (!is_null($data['date']) && !is_null($data['moment']) && !is_null($data['duree']) && !is_null($data['nombreDePersonne'])
			&& !is_null($data['coeff']) && !is_null($data['prix'])) {
	        
			$this->date = $data['date'];
			$this->moment = $data['moment'];
			$this->duree = $data['duree'];
			$this->nombreDePersonne = $data['nombreDePersonne'];
			$this->coeff = $data['coeff'];
			$this->prix = $data['prix'];
		}
	}
}
?>