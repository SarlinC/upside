<?php

require_once "Conf.php";

class Model {
  public static $pdo;
   
  static public function Init() {

    $hostname = Conf::getHostname();
    $database = Conf::getDatabase();

    try {
      // Connexion à la base de données            
      // Le dernier argument sert à ce que toutes les chaines de caractères 
      // en entrée et sortie de MySql soit dans le codage UTF-8
      self::$pdo = new PDO("mysql:host=$hostname;dbname=$database", Conf::getLogin(), Conf::getPassword(),
                           array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
         
      // On active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
      self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch (PDOException $e) {
      if (Conf::getDebug()) {
        echo $e->getMessage(); // affiche un message d'erreur
      } else {
        echo 'Une erreur est survenue <a href=""> retour a la page d\'accueil </a>';
      }
      die();
    }
  }

  public static function update($data) {
    $table_name = ucfirst(static::$object);

    $class_name = "Model" . ucfirst($table_name);

    $primary_key = static::$primary;

    $Value = "";
    
    foreach ($data as $key => $value) {
      $Value = $Value . $key . " = :" . $key . ", ";
    }

    $Value = rtrim($Value, ", ");

    $sql = "UPDATE $table_name SET $Value
            WHERE $primary_key = :$primary_key ";

    $req_prep = Model::$pdo->prepare($sql);

    $req_prep->execute($data);
  }

  public static function save($data) {
    $table_name = ucfirst(static::$object);

    $value1 = "";
    $value2 = "";

    foreach ($data as $key => $value) {
      $value1 = $value1 . $key . ", ";
      $value2 = $value2 . " :" . $key . ", ";
    }

    $value1 = rtrim($value1, ", ");

    $value2 = rtrim($value2, ", ");

      try{
        $sql = "INSERT INTO $table_name($value1) VALUES ($value2)";

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
Model::Init();
?>