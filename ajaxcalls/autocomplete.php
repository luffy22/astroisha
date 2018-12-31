<?php
header('Content-type: application/json');
$host   = "localhost";$user = "root";
$pwd    = "Desai_1985";$db   = "astroisha";
$mysqli = new mysqli($host, $user, $pwd, $db);
/* check connection */
if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
}
else
{
	//echo "calls ajaxcomplete";exit;
    $search     = ucfirst($_GET['term']);
    ///$query	= "SELECT jv_location.country,jv_location.state, jv_location.city, jv_location.latitude, jv_location.longitude, jv_timezone.tmz_words FROM jv_location, jv_timezone WHERE "
            // "     city LIKE '$search%' OR state LIKE '$search%' AND jv_location.timezone = jv_timezone.tmz_id LIMIT 1";
    $query	= "SELECT * FROM jv_location LEFT JOIN jv_timezone ON jv_location.timezone = jv_timezone.tmz_id WHERE city LIKE '$search%' OR state LIKE '$search%' LIMIT 5";
    $result	= mysqli_query($mysqli, $query);
    
    while($row  = mysqli_fetch_array($result))
    {
        if($row['state'] == 'none' || $row['state']=='')
        {
            $city       = $row['city'].", ".$row['country'];
        }
        else
        {
            $city       = $row['city'].", ".$row['state'].", ".$row['country'];
        }
        $lat            = $row['latitude'];
        $lon            = $row['longitude']; 
        $tmz            = $row['tmz_words'];
        if(empty($tmz))
        {
            $tmz        = "none";
        }
        $json[]             = array('label'=>$city, 'lat'=>$lat, 'lon'=>$lon, 'tmz'=>$tmz);
 
   }
    $data       = json_encode($json);
    echo $data; 
}
?>
