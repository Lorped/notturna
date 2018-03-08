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
header('Content-Type: text/html; charset=utf-8');
	
	include ('db.inc.php');



	$last=$_GET['last'];
	
	$userid=$_GET['userid'];
	
	
	if ($last=="") $last=0;
	if ($userid=="") $userid=0;

// inizio output XML
	

	
	
	$MySql = "SELECT count(*) FROM dadi  ";
	$Result = mysql_query($MySql);
	$rs=mysql_fetch_row($Result);

	$output='<?xml version="1.0" encoding="utf-8" ?>';

	$output.= '<chat>';


	if ( $rs['0'] == 0 ) { 
		

		$output.= '<status>0</status>';	 // vuota o svuotata
		$output.= '<post></post>';	 // vuota o svuotata
		
		
	} else {

		if ($last == 0 ) {

			$output.= '<status>-1</status>';	//gestione reverse
			
			$MySql = "SELECT * FROM dadi  WHERE destinatario=-1 ORDER BY ID DESC LIMIT 0, 20 ";
			
			if ( $userid ==  -1 ) {
				$MySql = "SELECT * FROM dadi  ORDER BY ID DESC LIMIT 0, 20 ";
				$MySql = "SELECT dadi.ID, dadi.nomepg, Ora, Testo, Destinatario, personaggio.nomepg AS Nomedest FROM dadi LEFT JOIN personaggio ON dadi.destinatario = personaggio.idutente ORDER BY ID DESC LIMIT 0 , 20 ";
			} elseif ( $userid != 0 ) {
				$MySql = "SELECT * FROM dadi WHERE destinatario=-1 OR destinatario=$userid  ORDER BY ID DESC LIMIT 0, 20 ";
			}

			$Result = mysql_query($MySql);
			
		} else {
	
			$output.= '<status>1</status>';	//gestione normale

			$MySql = "SELECT * FROM dadi WHERE ID > '$last' WHERE  destinatario=-1 ORDER BY ID ASC";
			
			if ( $userid == -1 ) {
				$MySql = "SELECT dadi.ID, dadi.nomepg, Ora, Testo, Destinatario, personaggio.nomepg AS Nomedest FROM dadi LEFT JOIN personaggio ON dadi.destinatario = personaggio.idutente WHERE ID > '$last' ORDER BY ID DESC LIMIT 0 , 20 ";
			} elseif ( $userid != 0) {
				$MySql = "SELECT * FROM dadi WHERE ID > '$last' AND ( destinatario=-1 OR destinatario=$userid ) ORDER BY ID DESC LIMIT 0, 20 ";
			}
			
			$Result = mysql_query($MySql);
			
		}

		while ($rs=mysql_fetch_array($Result) ) {
			if ($rs['ID'] > $last) {	
				$last = $rs['ID'];
			}
			$output.= '<post>';
			$output.= '<pg>'.$rs['nomepg'].'</pg>';
			
			$output.= '<testo>'.htmlspecialchars($rs['Testo'],ENT_QUOTES).'</testo>';
			
			if ( $rs['Nomedest'] != "" ) {
				$output.= '<dest> a '.htmlspecialchars($rs['Nomedest'],ENT_QUOTES).'</dest>';
			} else {
				$output.= '<dest>+</dest>';
			}
			
			
			$output.= '<ora>'.strftime("%H:%M", strtotime($rs['Ora'])).'</ora>';
			$output.= '<data>'.strftime("%d/%m/%Y", strtotime($rs['Ora'])).'</data>';
			$output.= '</post>';
		}
		$output.= '<row>'.$last.'</row>';
		
	}
	$output.= '</chat>';

	
	$xml = simplexml_load_string($output);
	$json = json_encode($xml,JSON_UNESCAPED_SLASHES);
	
	
	echo $json;

?>
