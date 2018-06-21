<?php
defined('_JEXEC') or die();
//print_r($this->data);exit;
$planets        = array("sun","moon","mercury","venus","mars","jupiter","saturn","rahu","ketu","uranus","neptune","pluto");
?>
<div class="container-fluid">
    <table class="table table-bordered table-hover">
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
                $date   = new DateTime($this->data['dob']);
            echo $date->format('dS F Y'); ?></td>
        </tr>
        <tr>
            <th>Time Of Birth</th>
            <td><?php echo $this->data['tob']; ?></td>
        </tr>
        <tr>
            <th>Place Of Birth</th>
            <td><?php echo $this->data['pob']; ?></td>
        </tr>
        <tr>
            <th>Latitude</th>
            <td><?php echo $this->data['lat']; ?></td>
        </tr>
        <tr>
            <th>Longitude</th>
            <td><?php echo $this->data['lon']; ?></td>
        </tr>
        <tr>
            <th>Timezone</th>
            <td><?php echo "GMT&nbsp;".$this->data['tmz']; ?></td>
        </tr>
        <tr>
        <th>Daylight Savings</th>
        <td><?php if($this->data['dst'] == '00:00:00')
                    { echo "None"; }
                  else
                  { echo $this->data['dst']; } ?></td>
        </tr>
    </table>
    <div class="mb-2"></div>
    <table class="table table-hover table-responsive">
        <tr class="bg-info">
            <th>Planets</th>
            <th>Sign</th>
            <th>Sign Lord</th>
            <th>Distance</th>
            <th>Nakshatra</th>
            <th>Nakshatra Lord</th>
        </tr>
    <?php 
           for($i=0;$i<13;$i++)
           {
                $sign    = $planets[$i]."_sign";
                $sign_lord       = $planets[$i]."_sign_lord";
                $dist    = $planets[$i]."_dist";
                $nakshatra       = $planets[$i]."_nakshatra";
                $nakshatra_lord  = $planets[$i]."_nakshatra_lord";
    ?>
        <tr>
            <td><?php echo ucfirst($planets[$i]);  ?></td>
            <td><?php echo $this->data[$i][$sign]; ?></td>
            <td><?php echo $this->data[$i][$sign_lord]; ?></td>
            <td><?php echo $this->data[$i][$dist]; ?></td>
            <td><?php echo $this->data[$i][$nakshatra]; ?></td>
            <td><?php echo $this->data[$i][$nakshatra_lord]; ?></td>
        </tr>
    <?php
           }
    ?>
    </table>
    <?php unset($this->data); ?>
</div>