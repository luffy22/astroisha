/* jce - 2.9.32 | 2022-11-01 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2022 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function(){var DOM=tinymce.DOM,each=tinymce.each,explode=tinymce.explode;tinymce.create("tinymce.plugins.TabFocusPlugin",{init:function(ed,url){function tabCancel(e){9!==e.keyCode||e.ctrlKey||e.altKey||e.metaKey||e.preventDefault()}function tabHandler(e){function find(direction){function canSelectRecursive(e){return"BODY"===e.nodeName||"hidden"!=e.type&&"none"!=e.style.display&&"hidden"!=e.style.visibility&&canSelectRecursive(e.parentNode)}function canSelect(el){return/INPUT|TEXTAREA|BUTTON/.test(el.tagName)&&tinymce.get(e.id)&&el.tabIndex!=-1&&canSelectRecursive(el)}if(el=DOM.select(":input:enabled,*[tabindex]:not(iframe)"),each(el,function(e,i){if(e.id==ed.id)return x=i,!1}),direction>0){for(i=x+1;i<el.length;i++)if(canSelect(el[i]))return el[i]}else for(i=x-1;i>=0;i--)if(canSelect(el[i]))return el[i];return null}var x,el,v,i;if(!(9!==e.keyCode||e.ctrlKey||e.altKey||e.metaKey||e.isDefaultPrevented())&&(v=explode(ed.getParam("tab_focus",ed.getParam("tabfocus_elements",":prev,:next"))),1==v.length&&(v[1]=v[0],v[0]=":prev"),el=e.shiftKey?":prev"==v[0]?find(-1):DOM.get(v[0]):":next"==v[1]?find(1):DOM.get(v[1]))){var focusEditor=tinymce.get(el.id||el.name);el.id&&focusEditor?focusEditor.focus():setTimeout(function(){tinymce.isWebkit||window.focus(),el.focus()},10),e.preventDefault()}}ed.onKeyUp.add(tabCancel),tinymce.isGecko?(ed.onKeyPress.add(tabHandler),ed.onKeyDown.add(tabCancel)):ed.onKeyDown.add(tabHandler)}}),tinymce.PluginManager.add("tabfocus",tinymce.plugins.TabFocusPlugin)}();