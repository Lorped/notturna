<?
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

	
// header('Content-type: text/xml; charset="utf-8"');

	
	include ('db.inc.php');



$postdata = file_get_contents("php://input");
$request = json_decode($postdata);



$idrubrica = $request->idrubrica;
$contatto = mysql_real_escape_string($request->contatto);
$email = $request->email;
$cell = $request->cell;
$note = mysql_real_escape_string($request->note);




// inizio output XML
	

	
	
	$MySql = "UPDATE rubrica SET  contatto='$contatto' ,cell=$cell, email=$email, note='$note' WHERE idrubrica=$idrubrica  ";
	$Result = mysql_query($MySql);
	if (mysql_errno()) die ( mysql_errno().": ".mysql_error()."+". $Mysql );


?>
