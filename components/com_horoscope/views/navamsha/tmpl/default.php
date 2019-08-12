<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_users
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
defined('_JEXEC') or die();
//print_r($this->data);exit;
//$chart          = $this->data['chart'];
$a = 0;
?>
<html>
 <head>
<style type="text/css">
#navamsha_canvas{width: 100%;height: auto;}@media (min-width: 768px) {#navamsha_canvas{width:65%}}
</style>
 </head>
 <body onload="javascript:draw_horoscope();getNavamsha();">
 <?php $chart_id = $_GET['chart']; ?>
<div class="mb-3"></div>
<canvas id="navamsha_canvas" height="260">
Your browser does not support the HTML5 canvas tag.
</canvas><div class="mb-3"></div>
<p class="float-sm-right">Vargottama planet gives good results in its <a href="<?php echo JURi::base() ?>getvimshottari?chart=<?php echo $chart_id ?>" title="Vimsottari Dasha">Vimshottari Dasha</a> Period</p>
<div class="table-responsive">
<table class="table table-bordered table-striped">
    <tr>
        <th>Planet</th>
        <th>Sign</th>
        <th>Navamsha</th>
        <th>Vargottama</th>
    </tr>
<?php 
   foreach($this->data['nav_data'] as $key => $data)
    {
        if(($a % 2) == 0)
        {
            $new_key1   = $key;
            $new_val1   = $data;
?>
    <tr>
        <td><?php echo $new_key1; ?></td>
        <td><?php echo $new_val1; ?></td>
        
<?php
        }
        else if((($a % 2) == 1))
        {
            $new_key2   = $key;
            $new_val2   = $data;
?>
        
        <td id="<?php echo strtolower($new_key1) ?>_sign" value="<?php echo $new_val2; ?>"><?php echo $new_val2; ?></td>
<?php 
        $new_key2    = str_replace("_navamsha_sign","",$new_key2);
        if($new_key1 == "Ascendant"||$new_key1=="Uranus"||
                $new_key1=="Neptune"||$new_key1=="Pluto")
        {
?>
        <td>-</td>
<?php            
        }
        else if(($new_key2 == $new_key1)&&($new_val2 == $new_val1))
        {
?>
        <td><?php echo "Yes"; ?></td>
<?php
        }
        else{
?>
         <td><?php echo "No"; ?></td>
        <?php
        }
        ?>
    </tr>
<?php
        }
        $a++;
    }
?>
</table>
</div>
<form>
<?php
    foreach($this->data['main'] as $key=>$value)
    {
  
?>
    <input type="hidden" name="<?php echo strtolower(trim($key)); ?>_sign" id="<?php echo strtolower(trim($key)); ?>_sign" value="<?php echo $value; ?>" />
<?php
    }
?>
</form>
<?php
if($this->data['main']['chart_type'] == "north")
{
?>
<script type="text/javascript"  src="<?php echo JUri::base().'components'.DS.'com_horoscope'.DS.'script/horoscope_n.js' ?>">
</script>
<?php
}
else
{
?>
<script type="text/javascript"  src="<?php echo JUri::base().'components'.DS.'com_horoscope'.DS.'script/horoscope_s.js' ?>">
</script>
<?php 
}
unset($this->data); ?>
 </body>