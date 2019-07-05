<?php
defined('_JEXEC') or die;
if(isset($_GET['order']))
{
    $order      = $_GET['order'];
}
if(isset($_GET['ref']))
{
    $refemail   = $_GET['ref'];
}
//print_r($this->order);
//print_r($this->details);exit;
?>
<p class="text-right"><a href="<?php echo JUri::base(); ?>getorder?order=<?php echo $this->details->UniqueID ?>&ref=<?php echo $this->details->email; ?>"><i class="fas fa-shopping-cart"></i> Your Orders</a></p>
<div class="mb-3"></div>
    <div class="lead alert alert-dark">Order Details</div>
   <ul class="list-group">
    <li class="list-group-item">Order ID: <?php echo $this->details->UniqueID; ?></li>
    <li class="list-group-item">
      <?php
            if(isset($refemail) && $refemail==$this->details->email)
            {
      ?>
                Name: <?php echo $this->details->name; ?>
     <?php
            }
            else
            {
                echo "Name: Hidden To Protect Customer Privacy";
            }
            $date   = new DateTime(); $date->setTimestamp($this->details->dob_tob);
     ?>
    </li>
    <li class="list-group-item">Gender: <?php echo $this->details->gender; ?></li>
    <li class="list-group-item">Date Of Birth: <?php echo $date->format('d-m-Y'); ?></li>
    <li class="list-group-item">Time Of Birth: <?php echo $date->format('h:i:s a');?></li>
    <li class="list-group-item">Place Of Birth: <?php echo $this->details->pob; ?></li>
    <li class="list-group-item">Order Type: <?php if($this->details->order_type=="career"){echo "Career Report";}
                                                  else if($this->details->order_type=="marriage"){echo "Marriage Report";}
                                                  else if($this->details->order_type=="life"){echo "Life Report"; }
                                                  else if($this->details->order_type=="yearly"){echo "Yearly Report"; }
                                                  else if($this->details->order_type=="detailed"){echo "Detailed Answer"; }
                                                  else{echo "Detailed Report";} ?></li>
  </ul>
<div class="mb-4"></div>
<div class="lead alert alert-dark">Full Report</div>
<div clas="mb-4"></div>
<?php
if(empty($this->order[0]->order_full_text))
{
    echo "Not yet answered<br/><br/>";
}
else
{
    echo $this->order[0]->order_full_text;
}
?>
<div clas="mb-4"></div>
<div class="lead alert alert-dark">Other Queries</div>
<?php
if($this->details->order_type == "life")
{
    for($i=0;$i <3;$i++)
    {
?>
<div class="lead alert alert-dark">Question <?php echo $i+1; ?>: <?php echo ucfirst($this->order[$i]->query_about); ?></div>
<p>Question: <?php echo $this->order[$i]->query_explain; ?></p>
<div class="lead alert alert-dark">Answer</div>
<?php 
    if(empty($this->order[$i]->query_answer))
    {
        echo "Not yet answered<br/><br/>";
    }
    else
    {
        echo $this->order[$i]->query_answer; 
    }
?>
<div clas="mb-4"></div>
<?php
    }
}
else
{
?>
<div class="lead alert alert-dark">Question: <?php echo ucfirst($this->order[0]->query_about); ?></div>
<p>Question: <?php echo $this->order[0]->query_explain; ?></p>
<div class="lead alert alert-dark">Answer</div>
<?php 
    if(empty($this->order[0]->query_answer))
    {
        echo "Not yet answered<br/><br/>";
    }
    else
    {
        echo $this->order[0]->query_answer; 
    }
?>
<div clas="mb-4"></div>
<?php
}
unset($this->order);unset($this->details);
?>

