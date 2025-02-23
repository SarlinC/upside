<?php
require_once ('Model.php');

class ModelDevis extends Model {

	protected static $object = "devis";

	private $numeroDevis;
	private $numeroClient;
	private $duree;
	private $date;
	private $nombreDePersonne;
	private $dureeParPersonne;
	private $moment;
	private $remarque;
	private $typeSeminaire;
	private $nombreDePersonneEnSeminaire;
	private $prixSeminaire;
	private $prixUpersonne;
	private $prixUtraiteur;
	private $prixUboisson;
	private $prixUwait;
	private $prixTpersonne;
	private $prixTtraiteur;
	private $prixTboisson;
	private $prixTwait;
	private $prixT;
	private $coeff;

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
			&& !is_null($data['dureeParPersonne']) && !is_null($data['moment'])) {
	        
			$this->numeroClient = $data['numeroClient'];
			$this->duree = $data['duree'];
			$this->date = $data['date'];
			$this->nombreDePersonne = $data['nombreDePersonne'];
			$this->dureeParPersonne = $data['dureeParPersonne'];
			$this->moment = $data['moment'];
		}
	}
}
?>