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


  //http://stackoverflow.com/questions/15485354/angular-http-post-to-php-and-undefined


  $idutente=$_GET['id'];


    include ('db.inc.php');

    $out1 = [];

    $MySql = "SELECT * FROM taumaturgie
      left join taumaturgie_main on taumaturgie_main.idtaum=taumaturgie.idtaum
          WHERE idutente = '$idutente'
      ORDER BY principale ASC";

    $Result = mysql_query($MySql);
    while ( $res = mysql_fetch_array($Result)   ) {

      $curtaum= $res['idtaum'];
      $nometaum= $res['nometaum'];
      $livello= $res['livello'];
      $out2 = [];

      $MySql2 = "SELECT * from taumaturgie2
        WHERE idtaum=$curtaum and livello=0";
      $Result2 = mysql_query($MySql2);

      if ( ! $res2=mysql_fetch_array($Result2) ) {

        $MySql3 = "SELECT * from taumaturgie2
          WHERE idtaum=$curtaum and livello <= $livello";

        $Result3 = mysql_query($MySql3);
        while ($res3=mysql_fetch_array($Result3, MYSQL_ASSOC)) {
          $out2 [] = $res3;
        }

      } else {

        if ( $livello == 1 ) {
          $out2 [] = [
            'idtaum2' => $res2['idtaum2'],
            'idtaum' => $res2['idtaum'],
            'livello' => 1,
            'nomnometaum2' => $res2['nometaum2']." 1"
          ];
        }
        if ( $livello > 1 && $livello <5) {
          $out2 [] = [
            'idtaum2' => $res2['idtaum2'],
            'idtaum' => $res2['idtaum'],
            'livello' => 1,
            'nomnometaum2' => $res2['nometaum2']." 1-".$livello
          ];
        }
        if ( $livello == 5) {
          $out2 [] = [
            'idtaum2' => $res2['idtaum2'],
            'idtaum' => $res2['idtaum'],
            'livello' => 1,
            'nomnometaum2' => $res2['nometaum2']." 1-4"
          ];
          $out2 [] = [
            'idtaum2' => $res2['idtaum2'],
            'idtaum' => $res2['idtaum'],
            'livello' => 5,
            'nomnometaum2' => $res2['nometaum2']." 5"
          ];
        }

      }


      $out1 [] = [
        'nometaum' => $nometaum,
        'xlivello' => $livello ,
        'poteri'  => $out2
      ];

    }

    $output = json_encode ($out1, JSON_UNESCAPED_UNICODE);
    echo $output;

?>
