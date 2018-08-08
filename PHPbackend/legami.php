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

	$domitor = $request->domitor;
	$target = $request->target;



	$Mysql="SELECT * from legami  WHERE domitor=$domitor AND target=$target";
	$Result=mysql_query ($Mysql);
	if ($res = mysql_fetch_array($Result)) {
		$oldlivello=$res['livello'];
		if ($oldlivello==1) {
			$Mysql="UPDATE legami SET livello=2, dataultima=NOW() WHERE domitor=$domitor AND target=$target";
			$Result=mysql_query ($Mysql);
		} elseif ($oldlivello==2)  {
			$Mysql="UPDATE legami SET livello=3, dataultima=NOW() WHERE domitor=$domitor AND target=$target";
			$Result=mysql_query ($Mysql);
			$Mysql="DELETE FROM legami  WHERE domitor!=$domitor AND target=$target";
			$Result=mysql_query ($Mysql);
		} else {
			$Mysql="UPDATE legami SET  dataultima=NOW() WHERE domitor=$domitor AND target=$target";
			$Result=mysql_query ($Mysql);
		}
	} else {
		$Mysql="INSERT INTO legami ( domitor, target, dataultima, livello) VALUES ($domitor, $target, NOW(), 1 )";
		$Result=mysql_query ($Mysql);
	}





?>
