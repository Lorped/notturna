<?php

//http://stackoverflow.com/questions/18382740/cors-not-working-php
if (isset($_SERVER['HTTP_ORIGIN'])) {
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
    header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

  exit(0);
}



$diablerista=$_GET['diabl'];
$vittima=$_GET['vittima'];


  include ('db.inc.php');


		//controllo-aggiorno fdv

		$Mysql="SELECT * FROM personaggio WHERE idutente=$diablerista";
		$Result=mysql_query ($Mysql);
		$res=mysql_fetch_array($Result);

    $oldbloodp=$res['bloodp'];
    $oldgen=$res['generazione'];


    $Mysql="SELECT * FROM personaggio WHERE idutente=$vittima";
		$Result=mysql_query ($Mysql);
		$res=mysql_fetch_array($Result);

		$bloodp=$res['bloodp'];
    $gen=$res['generazione'];

    $newgen = $oldgen;
    if ( $gen < $oldgen ) {
      $newgen= $gen +1 ;
    }
    if ( $gen == $oldgen-1 ) {
      $newgen = $gen;
    }

    $newbloodp=$oldbloodp;
    if ( $bloodp > $oldbloodp ) {
      $newbloodp = $bloodp;
    }

    $Mysql="SELECT * FROM generazione WHERE generazione=$newgen";
    $Result=mysql_query($Mysql);
    $res=mysql_fetch_array($Result);

    if ( $newbloodp > $res['bloodpmax']   ) {
      $newbloodp = $res['bloodpmax'];
    }

    echo "<br>oldgen ".$oldgen;
    echo "<br>newgen ".$newgen;
    echo "<br>oldbloodp ".$oldbloodp;
    echo "<br>newbloodp ".$newbloodp;

?>
