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

	$postdata = file_get_contents("php://input");
  $request = json_decode($postdata);

  $idutente = $request->idutente;
	$pot = $request->potere;
	$livellopot = $request->livello;
	$aDisciplina = $request->aDisciplina;

 	$Mysql="SELECT  nomepg FROM personaggio WHERE idutente=$idutente";
	$Result=mysql_query ($Mysql);
	$res=mysql_fetch_array($Result);

	$nomepg=$res['nomepg'];
	$xnomepg=mysql_real_escape_string($nomepg);

	$Mysql="SELECT  nomedisc FROM discipline_main WHERE iddisciplina=$aDisciplina";
	$Result=mysql_query ($Mysql);
	$res=mysql_fetch_array($Result);

	$nomedisc=$res['nomedisc'];



	if ( $livellopot == 5) {
		$Mysql="UPDATE personaggio SET PScorrenti = PScorrenti-2 , lastps=NOW() WHERE idutente=$idutente";
	} else {
		$Mysql="UPDATE personaggio SET PScorrenti = PScorrenti-1 , lastps=NOW() WHERE idutente=$idutente";
	}


	$Result=mysql_query ($Mysql);

	$testo="Ha utilizzato ".$nomedisc.".".$livellopot." ".$pot;
	$xtesto=mysql_real_escape_string($testo);
	$Mysql="INSERT INTO dadi ( idutente, nomepg, Ora, Testo, Destinatario) VALUES ( $idutente, '$xnomepg', NOW(), '$xtesto' , $idutente ) ";
	mysql_query($Mysql);


	$fields =  array(
		'to' => '/topics/master',
		'data'=> [
			'message'=> $testo ,
			'title'=> $nomepg,
			'image'=> 'icon'
		]
	);


	$api_key="AAAAxERgxJ4:APA91bGb0CqFmwPOIV1tN9BSOG7yucKmCpymJf0Pp1YRXlX3wIn8RlbYqMYjnDavyLP4-j9uSzVAlLwB0e7oYzwsaJa2H_yTE3LjzXL1UoOaf-EO00MewK9VyHbOeyvezg-2CTyRulba";
	$ch = curl_init('https://fcm.googleapis.com/fcm/send');

	$headers = array (
		'Authorization: key=' . $api_key,
		'Content-Type: application/json'
	);

		//die( print_r($headers));

	$post=json_encode($fields, JSON_UNESCAPED_SLASHES);

	//die (print_r($post));

	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

	curl_setopt($ch, CURLOPT_POSTFIELDS, $post );
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		// Disabling SSL Certificate support temporarly
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

	// execute!
	$response = curl_exec($ch);

	// close the connection, release resources used
	curl_close($ch);

	// do anything you want with your response

	//die(print_r($response));


	// Imposto PS
	if ($livellopot == 5 ) {
		$out1=array('ps' => 2);
	} else {
		$out1=array('ps' => 1);
	}
	$output = json_encode ($out1, JSON_UNESCAPED_UNICODE);
	echo $output;
	die();

?>