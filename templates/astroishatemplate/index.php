<?php 
//error_reporting(0);       // uncomment on server 
defined( '_JEXEC' ) or die( 'Restricted access' );?>
<!DOCTYPE html>
<html lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
<meta name="robots" content="index, follow" />
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="shortcut icon" href="<?php echo $this->baseurl ?>/favicon.ico" type="image/x-icon" />
<link rel="icon" href="<?php echo $this->baseurl ?>/logo.png" type="image/x-icon">
<meta name="msvalidate.01" content="E689BB58897C0A89BDC88E5DF8800B2F" />
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/css/template.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/css/bootstrap.min.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/css/jquery-ui.min.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/css/jquery-ui.structure.min.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/css/jquery-ui.theme.min.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/css/all.min.css" type="text/css" />
<script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/js/jquery.min.js" type="text/javascript" language="javascript"></script>
<script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/js/jquery-ui.min.js" type="text/javascript" language="javascript"></script>
<script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/js/bootstrap.min.js"></script>
<script src="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/js/common.js" type="text/javascript" language="javascript"></script>
</head>
<body>
<?php
 // Get option and view
$option = JRequest::getVar('option');
$view = JRequest::getVar('view');
// Make sure it is a single article
if ($option == 'com_content' && $view == 'article'):
  $id = JRequest::getInt('id');
?>
<div id="<?php echo $id; ?>" class="accordion-id"></div>
<?php
endif;
?>
<div class="container-fluid">
    <h1 class="display-4"><a id="display-4" href="<?php echo JUri::base(); ?>" title="Navigate to Home Page"><img src="<?php echo JUri::base(); ?>/logo.png" title="Click to navigate to Home Page" />Astro Isha</a></h1>
<div class="row">
    <div class="col-md-9 col-sm-9 col-xs-8" id="main">
        <jdoc:include type="modules" name="sidemenu" />
        <jdoc:include type="modules" name="breadcrumb" />
        <jdoc:include type="component" />
        <jdoc:include type="modules" name="content1" />
        <jdoc:include type="modules" name="content2" />
    </div>
    <div class="col-md-3 col-sm-3 col-xs-4">
        <jdoc:include type="modules" name="right" />
    </div>
</div>
</div>
<jdoc:include type="modules" name="footer" />
<script async src="//www.instagram.com/embed.js"></script>
<script>
  window.fbAsyncInit = function() {FB.init({appId      : '220390744824296',xfbml      : true,version    : 'v2.4'});};
  (function(d, s, id){var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));
</script>
<?php
include_once (JPATH_ROOT.DS.'analyticstracking.php');
?>
</body>
</html>
