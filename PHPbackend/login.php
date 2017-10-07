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
 


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$username = $request->username;
$password = $request->password;

//$username = "user";
//$password = "secret"; 


if (isset($postdata) && $username != "" && $password !="" ) {
    
  include ('db.inc.php');
	
	// pulizia periodica
	$MM="DELETE FROM dadi WHERE DATE_ADD( Ora , INTERVAL 4 HOUR )<NOW()";
	mysql_query($MM);	
	//
 
  $MySql = "SELECT idutente FROM utente WHERE nome = '".addslashes($username)."' AND password = '".addslashes($password)."'";
    $Result = mysql_query($MySql);
  if ( $res = mysql_fetch_array($Result)   ) {
    
    $idutente = $res['idutente'];
	  

	  
		//controllo-aggiorno fdv
		
		$Mysql="SELECT fdv,fdvmax,lastfdv FROM personaggio WHERE idutente=$idutente";
		$Result=mysql_query ($Mysql);
		$res=mysql_fetch_array($Result);

		$fdv=$res['fdv'];
		$fdvmax=$res['fdvmax'];
		$lastfdv=$res['lastfdv'];

		if ( $fdv == $fdvmax ) {  // tutto ok 

			$Mysql="UPDATE personaggio SET lastfdv=NOW()  WHERE idutente=$idutente";
			$Result=mysql_query ($Mysql);
		} else {
	
			$base=strtotime("2017-01-01 18:00:00");	
			$qlastftv=strtotime($lastfdv);	
			$now=time();
	
			$tramonti0=floor( ($qlastftv - $base)/( 24*60*60 )) ;
			$tramonti1=floor(($now - $base) / ( 24*60*60 ) );
	
			$difftramonti=$tramonti1-$tramonti0;
	
	
			if ( $difftramonti > 0 ) {
		
				$newfdv=$fdv+$difftramonti;
				if ($newfdv > $fdvmax)  {$newfdv=$fdvmax ;}
		
				$newlastfdv=$base + $tramonti1*( 24*60*60 )+1;
		
				$newlastfdvstring=date("Y-m-d H:i:s",$newlastfdv );
		
				$Mysql="UPDATE personaggio SET fdv = $newfdv , lastfdv = '$newlastfdvstring' WHERE idutente=$idutente";
				$Result=mysql_query ($Mysql);
			
			} else {
				// echo "<br>da quando ho controlato fdv non è passato un tramonto";
			}	

		}// fine controllo fdv
	  
		  
	  
	  
    
    $MySql = "SELECT *  FROM personaggio 
          LEFT JOIN clan ON personaggio.idclan=clan.idclan 
          LEFT JOIN statuscama ON personaggio.idstatus=statuscama.idstatus 
          LEFT JOIN sentieri ON personaggio.idsentiero=sentieri.idsentiero
          LEFT JOIN generazione ON personaggio.generazione=generazione.generazione
          WHERE idutente = '$idutente' ";
    
    $Result = mysql_query($MySql);
    if ( $res = mysql_fetch_array($Result,MYSQL_ASSOC)   ) {
      $output = json_encode($res);
      echo $output;
    } else {
        header("HTTP/1.1 404 Not Found");
    }   
  } else {    
    header("HTTP/1.1 401 Unauthorized");
  } 
} else {
    header("HTTP/1.1 401 Unauthorized");
}
?>