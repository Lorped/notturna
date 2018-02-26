<?php

	header("Access-Control-Allow-Origin: *");
	
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
 



    
	include ('db.inc.php');
	
 	$idutente=$_GET['id'];
 	
 	$Mysql="SELECT PScorrenti, ps, lastps FROM personaggio LEFT JOIN generazione ON personaggio.generazione = generazione.generazione WHERE idutente=$idutente";
	$Result=mysql_query ($Mysql);
	$res=mysql_fetch_array($Result);
		
	$PScorrenti=$res['PScorrenti'];
	$ps=$res['ps'];
	$lastps=$res['lastps'];
		
	if ($ps > $PScorrenti ) {
		$Mysql="UPDATE personaggio SET PScorrenti = $PScorrenti+1  WHERE idutente=$idutente";
		$Result=mysql_query ($Mysql);
	}
	

  
    

?>
