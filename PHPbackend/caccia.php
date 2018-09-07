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
	$recuperati=$_GET['recuperati'];
	$anim=$_GET['anim'];

 	$Mysql="SELECT * FROM personaggio
		LEFT JOIN statuscama ON personaggio.idstatus = statuscama.idstatus
		LEFT JOIN blood ON personaggio.bloodp = blood.bloodp
		WHERE idutente=$idutente";
	$Result=mysql_query ($Mysql);
	$res=mysql_fetch_array($Result);

	$PScorrenti=$res['PScorrenti'];
	$setetot=$res['sete']+$res['addsete'];
	$lastps=$res['lastps'];
	$nomepg=$res['nomepg'];

	$PScorrenti=$PScorrenti+$recuperati;
	if ($PScorrenti > $setetot) {
		$PScorrenti = $setetot;
	}

	if ( $anim == 0) {
		$Mysql="UPDATE personaggio SET PScorrenti = $PScorrenti , lastps=NOW() WHERE idutente=$idutente";
	} else {
		$Mysql="UPDATE personaggio SET PScorrenti = $PScorrenti , lastps=NOW() , lastcaccia=NOW() WHERE idutente=$idutente";
	}


	$Result=mysql_query ($Mysql);


	$testo=$nomepg." ha saziato la sua sete (".$recuperati ." livelli recuperati)";
	$xtesto=mysql_real_escape_string($testo);
	$Mysql="INSERT INTO dadi ( idutente, nomepg, Ora, Testo, Destinatario) VALUES ( 0, 'NARRAZIONE', NOW(), '$xtesto' , $idutente ) ";
	mysql_query($Mysql);

		// set post fields

	$Mysql="SELECT registrationID FROM utente WHERE idutente=$idutente";
	$Result=mysql_query($Mysql);
	$res=mysql_fetch_array($Result);

	if ($res['registrationID'] != "" ) {

		$fields= array(
			'to'=>$res['registrationID'],
			'data'=> [
				'message'=> $testo ,
				'title'=> 'NARRAZIONE',
				'image'=> 'icon'
			]
		);

	} else {

		$fields= array(
			'to'=>'/topics/userid'.$idutente,
			'data'=> [
				'message'=> $testo ,
				'title'=> 'NARRAZIONE',
				'image'=> 'icon'
			]
		);

	}


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


	if ( $anim == 1) {
		$out= [
			'lastcaccia' => date("Y-m-d H:i:s")
		];
			echo json_encode($out, JSON_UNESCAPED_UNICODE); 
	}
?>
