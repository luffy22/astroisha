/* jce - 2.6.30 | 2018-06-05 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2018 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function($,Wf){Wf.preferences={init:function(){$("#tabs, #tabs-access-permissions").tabs().find(".nav-tabs > li:first-child, .tab-content > .tab-pane:first-child").addClass("active"),$(".hasTip").removeClass("hasTip"),$('input[name="task"]').val("apply"),$("#apply, #save").click(function(){"save"==$(this).attr("id")&&$('input[name="task"]').val("save"),$("form").submit()}),$("#cancel").click(function(e){var win=window.parent;return"undefined"!=typeof win.SqueezeBox?win.SqueezeBox.close():(this.close(),void e.preventDefault())})},close:function(){this.init(),window.setTimeout(function(){window.parent.document.location.href="index.php?option=com_jce&view=cpanel"},1e3)}}}(jQuery,Wf);