<?php
defined('_JEXEC') or die();
//echo JPATH_COMPONENT.DS.'script/horoscope.js';exit;
//print_r($this->data);exit;
$gender = $this->data['gender'];if($gender == "male"){$planet = "Venus";}else if($gender == "female"){$planet = "Jupiter";}
if($gender == "male"){$spouse = "wife";}else if($gender == "female"){$spouse = "husband";}
$text = $this->data['spouse_text'];
$house  = $this->data['house'];
switch($house) {
    case "1":$house = "First";break;case "2":$house = "Second";break;case "3":$house = "Third";break;
    case "4":$house = "Fourth";break;case "5":$house = "Fifth";break;case "6":$house = "Sixth";break;
    case "7":$house = "Seventh";break;case "8":$house = "Eight";break;case "9":$house = "Ninth";break;
    case "10":$house = "Tenth";break;case "11":$house = "Eleventh";break;case "12":$house = "Twelfth";break;
}
$chart_id = $_GET['chart'];
?>
<div class="mb-3"></div>
<div class="lead alert alert-dark"><strong>How & Where To find Spouse</strong></div>
<div class="container">
    
<table class="table table-bordered table-hover table-striped">

	<tr>
		<th>Name</th>
		<td><?php echo $this->data['fname']; ?></td>
	</tr>
	<tr>
		<th>Gender</th>
		<td><?php echo ucfirst($this->data['gender']); ?></td>
	</tr>
	<tr>
		<th>Date Of Birth</th>
		<td><?php 
			$date   = new DateTime($this->data['dob_tob'], new DateTimeZone($this->data['timezone']));
			echo $date->format('dS F Y'); ?></td>
	</tr>
	<tr>
		<th>Time Of Birth</th>
		<td><?php echo $date->format('H:i:s'); ?></td>
	</tr>
	<tr>
		<th>Place Of Birth</th>
		<td><?php echo $this->data['pob']; ?></td>
	</tr>
	<tr>
            <th>Latitude</th>
            <td><?php 
                if(substr($this->data['lat'],0,1) == "-")
                {
                    $this->data['lat'] = str_replace("-","",$this->data['lat']);
                    echo $this->data['lat']."&deg; S";
                }
                else
                {
                    echo $this->data['lat']."&deg; N"; 
                }
                ?>
            </td>
        </tr>
        <tr>
            <th>Longitude</th>
            <td>
                <?php
                if(substr($this->data['lon'],0,1) == "-")
                {
                    $this->data['lon'] = str_replace("-","",$this->data['lon']);
                    echo $this->data['lon']."&deg; W";
                }
                else
                {
                    echo $this->data['lon']."&deg; E"; 
                }
                ?>
            </td>
        </tr>
	<tr>
		<th>Timezone</th>
		<td><?php echo "GMT".$date->format('P'); ?></td>
	</tr>
	<tr>
        <th>Apply DST</th>
        <td><?php if($date->format('I') == '1')
                    { echo "Yes"; }
                  else
                  { echo "No"; } ?></td>
	</tr>
</table>
<div class="mb-3"></div>
    <p class="lead">For <?php echo $gender.'s' ?> position of <?php echo $planet ?> is used to know more about future <?php echo $spouse ?>. <?php echo $planet ?> is located in your <?php echo trim($house) ?> House counted from ascendant(First House).</p>
    <div class="mb-3"></div>  
    <?php echo str_replace("planet", $planet, $text); ?>
<div class="mb-2"></div>
    <p class="lead strong">Portfolio's associated with <?php echo trim($house); ?> House are the deciding factor for your future <?php echo $spouse ?> to choose you over others.</p>
</div>
<?php unset($this->data); ?>