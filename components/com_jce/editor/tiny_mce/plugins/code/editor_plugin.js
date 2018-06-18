/* jce - 2.6.30 | 2018-06-05 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2018 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function(){function clean(s){return s=s.replace(/^(\/\/ <!\[CDATA\[)/gi,""),s=s.replace(/(\n\/\/ \]\]>)$/g,""),s=s.replace(/^(<!--\n)/g,""),s=s.replace(/(\n-->)$/g,"")}var each=tinymce.each,JSON=tinymce.util.JSON,Node=tinymce.html.Node,VK=(tinymce.html.Entities,tinymce.VK),BACKSPACE=VK.BACKSPACE,DELETE=VK.DELETE;tinymce.create("tinymce.plugins.CodePlugin",{init:function(ed,url){function isCode(n){return ed.dom.is(n,'.mce-item-script, .mce-item-style, .mce-item-php, .mcePhp, style[data-mce-type="text/css"]')}var self=this;this.editor=ed,this.url=url,ed.onNodeChange.add(function(ed,cm,n,co){ed.dom.removeClass(ed.dom.select(".mce-item-selected"),"mce-item-selected"),isCode(n)&&ed.dom.addClass(n,"mce-item-selected")}),ed.onKeyDown.add(function(ed,e){e.keyCode!==BACKSPACE&&e.keyCode!==DELETE||self._removeCode(e)}),ed.onPreInit.add(function(){ed.getParam("code_style")&&ed.schema.addValidChildren("+body[style]"),ed.getParam("code_script")&&(ed.settings.allow_script_urls=!0),ed.parser.addNodeFilter("script",function(nodes){for(var i=0,len=nodes.length;i<len;i++)self._serializeSpan(nodes[i])}),ed.parser.addNodeFilter("noscript",function(nodes){for(var i=0,len=nodes.length;i<len;i++)self._serializeNoScript(nodes[i])}),ed.parser.addNodeFilter("pre",function(nodes){for(var i=0,len=nodes.length;i<len;i++){var node=nodes[i],cls=node.attr("class");/mce-item-curlycode/.test(cls)&&node.unwrap()}}),ed.serializer.addNodeFilter("script,div,span,pre",function(nodes,name,args){for(var i=0,len=nodes.length;i<len;i++){var node=nodes[i],cls=node.attr("class");"span"==name&&/mce-item-script/.test(cls)&&self._buildScript(node),"span"==name&&/mce-item-style/.test(cls)&&self._buildStyle(node),"pre"===name&&/mce-item-shortcode/.test(cls)&&node.unwrap(),"div"==name&&"noscript"==node.attr("data-mce-type")&&self._buildNoScript(node)}}),ed.serializer.addNodeFilter("style",function(nodes,name,args){for(var node,value="",i=0,len=nodes.length;i<len;i++){node=nodes[i],node.attr("type",node.attr("data-mce-type")||"text/css"),node.firstChild&&(value=node.firstChild.value,value=clean(value),node.empty());var text=new Node("#text",3);text.raw=!0,text.value=tinymce.trim(value),node.append(text)}}),ed.plugins.clipboard&&ed.onPastePreProcess.add(function(ed,o){ed.settings.preformat_code_on_paste&&(o.content=o.content.replace(/<(script|style)([^>]+)>([\s\S]+?)<\/\1>/gi,function(a,b){return a=a.replace(/<br\/?>/gi,"\n"),"<pre>"+ed.dom.encode(a)+"</pre>"}),o.content=o.content.replace(/<\?(php)?([\s\S]+?)\?>/gi,function(a,b,c){return a=a.replace(/<br\/?>/gi,"\n"),"<pre>"+ed.dom.encode(a)+"</pre>"}))})}),ed.onInit.add(function(){ed.theme&&ed.theme.onResolveName&&ed.theme.onResolveName.add(function(theme,o){var cls=o.node.className;"span"===o.name&&(/mce-item-script/.test(cls)&&(o.name="script"),/mce-item-style/.test(cls)&&(o.name="style"),/mce-item-php/.test(cls)&&(o.name="php")),"pre.mce-item-shortcode"===o.name&&(o.name="shortcode")}),ed.settings.content_css!==!1&&ed.dom.loadCSS(url+"/css/content.css")}),ed.onBeforeSetContent.add(function(ed,o){if(ed.settings.code_protect_shortcode&&(o.content=o.content.replace(/\{([\w-]+)([^\}]*?)\}(?:([\s\S]+?)\{\/\1\})?/g,function(match,tag,attribs,content){var data="{"+tag+attribs+"}";return content&&(/</.test(content)&&(content=ed.dom.encode(content)),data+=content,data+="{/"+tag+"}"),'<pre class="mce-item-shortcode">'+data+"</pre>"})),/<(\?|script|style)/.test(o.content)){if(ed.getParam("code_script")||(o.content=o.content.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,"")),ed.getParam("code_style")||(o.content=o.content.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi,"")),ed.getParam("code_php")||(o.content=o.content.replace(/<\?(php)?([\s\S]*?)\?>/gi,"")),o.source)return;o.content=o.content.replace(/\="([^"]+?)"/g,function(a,b){return b=b.replace(/<\?(php)?(.+?)\?>/gi,function(x,y,z){return"{php:start}"+ed.dom.encode(z)+"{php:end}"}),'="'+b+'"'}),/<textarea/.test(o.content)&&(o.content=o.content.replace(/<textarea([^>]*)>([\s\S]*?)<\/textarea>/gi,function(a,b,c){return c=c.replace(/<\?(php)?(.+?)\?>/gi,function(x,y,z){return"{php:start}"+ed.dom.encode(z)+"{php:end}"}),"<textarea"+b+">"+c+"</textarea>"})),o.content=o.content.replace(/<([^>]+)<\?(php)?(.+?)\?>([^>]*?)>/gi,function(a,b,c,d,e){return" "!==b.charAt(b.length)&&(b+=" "),"<"+b+'data-mce-php="'+d+'" '+e+">"}),o.content=o.content.replace(/<\?(php)?([\s\S]+?)\?>/gi,'<span class="mcePhp" data-mce-type="php"><!--$2--> </span>'),o.content=o.content.replace(/<script([^>]+)><\/script>/gi,"<script$1> </script>"),o.content=o.content.replace(/<(script|style)([^>]*)>/gi,function(a,b,c){if(c.indexOf("data-mce-type")===-1)if(c.indexOf("type")===-1){var type="script"===b?"javascript":"css";c+=' data-mce-type="text/'+type+'"'}else c=c.replace(/type="([^"]+)"/i,'data-mce-type="$1"');return"<"+b+c+">"})}}),ed.onPostProcess.add(function(ed,o){o.get&&!o.source&&(/(mce-item-php|mcePhp|data-mce-php|\{php:start\})/.test(o.content)&&(o.content=o.content.replace(/\{php:\s?start\}([^\{]+)\{php:\s?end\}/g,function(a,b){return"<?php"+ed.dom.decode(b)+"?>"}),o.content=o.content.replace(/<textarea([^>]*)>([\s\S]*?)<\/textarea>/gi,function(a,b,c){return/&lt;\?php/.test(c)&&(c=ed.dom.decode(c)),"<textarea"+b+">"+c+"</textarea>"}),o.content=o.content.replace(/data-mce-php="([^"]+?)"/g,function(a,b){return"<?php"+ed.dom.decode(b)+"?>"}),o.content=o.content.replace(/<span class="mcePhp"><!--([\s\S]*?)-->(&nbsp;|\u00a0)?<\/span>/g,function(a,b,c){return"<?php"+ed.dom.decode(b)+"?>"})),o.content=o.content.replace(/<(script|style)([^>]*)>/gi,function(a,b,c){return c=c.replace(/\s?data-mce-type="[^"]+"/gi,""),"<"+b+c+">"}))})},_removeCode:function(e){var ed=this.editor,s=ed.selection,n=s.getNode();ed.dom.is(n,'.mce-item-script, .mce-item-style, .mce-item-php, .mce-item-php, style[data-mce-type="text/css"]')&&(ed.undoManager.add(),ed.dom.remove(n),e&&e.preventDefault())},_buildScript:function(n){var v,node,text,p;this.editor;if(n.parent)return n.firstChild&&(v=n.firstChild.value),p=JSON.parse(n.attr("data-mce-json"))||{},p.type=n.attr("data-mce-type")||p.type||"text/javascript",node=new Node("script",1),v&&(v=tinymce.trim(v),v&&(text=new Node("#text",3),text.raw=!0,"text/javascript"===p.type&&(v=clean(tinymce.trim(v))),text.value=v,node.append(text))),each(p,function(v,k){"type"===k&&(v=v.replace(/mce-/,"")),node.attr(k,v)}),node.attr("data-mce-type",p.type),n.replace(node),!0},_buildStyle:function(n){var v,node,text,p;this.editor;if(n.parent)return n.firstChild&&(v=n.firstChild.value),p=JSON.parse(n.attr("data-mce-json"))||{},p.type||(p.type="text/css"),node=new Node("style",1),v&&(v=tinymce.trim(v),v&&(text=new Node("#text",3),text.raw=!0,v=clean(tinymce.trim(v)),text.value=v,node.append(text))),each(p,function(v,k){"type"===k&&(v=v.replace(/mce-/,"")),node.attr(k,v)}),node.attr("data-mce-type",p.type),n.replace(node),!0},_buildNoScript:function(n){var p,node;this.editor;if(n.parent)return p=JSON.parse(n.attr("data-mce-json"))||{},node=new Node("noscript",1),each(p,function(v,k){node.attr(k,v)}),n.wrap(node),n.unwrap(),!0},_serializeSpan:function(n){var v,ed=this.editor,p=(ed.getDoc(),ed.dom,{});if(n.parent){each(n.attributes,function(at){at.name.indexOf("data-mce-")===-1&&(p[at.name]=at.value)});var span=new Node("span",1);if(span.attr("class","mce-item-"+n.name),span.attr("data-mce-json",JSON.serialize(p)),span.attr("data-mce-type",n.attr("data-mce-type")||p.type),v=n.firstChild?n.firstChild.value:"",v.length){var text=new Node("#comment",8);text.value=clean(v),span.append(text)}span.append(new tinymce.html.Node("#text",3)).value=" ",n.replace(span)}},_serializeNoScript:function(n){var ed=this.editor,p=(ed.dom,{});if(n.parent){each(n.attributes,function(at){"type"!=at.name&&(p[at.name]=at.value)});var div=new Node("div",1);div.attr("data-mce-json",JSON.serialize(p)),div.attr("data-mce-type",n.name),n.wrap(div),n.unwrap()}}}),tinymce.PluginManager.add("code",tinymce.plugins.CodePlugin)}();