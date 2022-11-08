/* jce - 2.9.32 | 2022-11-01 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2022 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function(){function getAttributes(node){var i,attrs=node.attributes,attribs={};for(i=attrs.length-1;i>=0;i--){var name=attrs[i].name;"_"!==name.charAt(0)&&name.indexOf("-mce-")===-1&&(attribs[name]=node.getAttribute(name))}return attribs}var languageValues={Afrikaans:"af",Albanian:"sq","Arabic (Algeria)":"ar-DZ","Arabic (Bahrain)":"ar-BH","Arabic (Egypt)":"ar-EG","Arabic (Iraq)":"ar-IQ","Arabic (Jordan)":"ar-JO","Arabic (Kuwait)":"ar-KW","Arabic (Lebanon)":"ar-LB","Arabic (Libya)":"ar-LY","Arabic (Morocco)":"ar-MA","Arabic (Oman)":"ar-OM","Arabic (Qatar)":"ar-QA","Arabic (Saudi Arabia)":"ar-SA","Arabic (Syria)":"ar-SY","Arabic (Tunisia)":"ar-TN","Arabic (U.A.E.)":"ar-AE","Arabic (Yemen)":"ar-YE",Basque:"eu",Belarusian:"be",Bulgarian:"bg",Catalan:"ca","Chinese (Hong Kong)":"zh-HK","Chinese (PRC)":"zh-CN","Chinese (Singapore)":"zh-SG","Chinese (Taiwan)":"zh-TW",Croatian:"hr",Czech:"cs",Danish:"da","Dutch (Belgium)":"nl-BE","Dutch (Standard)":"nl",English:"en","English (Australia)":"en-AU","English (Belize)":"en-BZ","English (Canada)":"en-CA","English (Ireland)":"en-IE","English (Jamaica)":"en-JM","English (New Zealand)":"en-NZ","English (South Africa)":"en-ZA","English (Trinidad)":"en-TT","English (United Kingdom)":"en-GB","English (United States)":"en-US",Estonian:"et",Faeroese:"fo",Farsi:"fa",Finnish:"fi","French (Belgium)":"fr-BE","French (Canada)":"fr-CA","French (Luxembourg)":"fr-LU","French (Standard)":"fr","French (Switzerland)":"fr-CH","Gaelic (Scotland)":"gd","German (Austria)":"de-AT","German (Liechtenstein)":"de-LI","German (Luxembourg)":"de-LU","German (Standard)":"de","German (Switzerland)":"de-CH",Greek:"el",Hebrew:"he",Hindi:"hi",Hungarian:"hu",Icelandic:"is",Indonesian:"id",Irish:"ga","Italian (Standard)":"it","Italian (Switzerland)":"it-CH",Japanese:"ja",Korean:"ko","Korean (Johab)":"ko",Kurdish:"ku",Latvian:"lv",Lithuanian:"lt","Macedonian (FYROM)":"mk",Malayalam:"ml",Malaysian:"ms",Maltese:"mt",Norwegian:"no","Norwegian (Bokm\xe5l)":"nb","Norwegian (Nynorsk)":"nn",Polish:"pl","Portuguese (Brazil)":"pt-BR","Portuguese (Portugal)":"pt",Punjabi:"pa","Rhaeto-Romanic":"rm",Romanian:"ro","Romanian (Republic of Moldova)":"ro-MD",Russian:"ru","Russian (Republic of Moldova)":"ru-MD",Serbian:"sr",Slovak:"sk",Slovenian:"sl",Sorbian:"sb","Spanish (Argentina)":"es-AR","Spanish (Bolivia)":"es-BO","Spanish (Chile)":"es-CL","Spanish (Colombia)":"es-CO","Spanish (Costa Rica)":"es-CR","Spanish (Dominican Republic)":"es-DO","Spanish (Ecuador)":"es-EC","Spanish (El Salvador)":"es-SV","Spanish (Guatemala)":"es-GT","Spanish (Honduras)":"es-HN","Spanish (Mexico)":"es-MX","Spanish (Nicaragua)":"es-NI","Spanish (Panama)":"es-PA","Spanish (Paraguay)":"es-PY","Spanish (Peru)":"es-PE","Spanish (Puerto Rico)":"es-PR","Spanish (Spain)":"es","Spanish (Uruguay)":"es-UY","Spanish (Venezuela)":"es-VE",Swedish:"sv","Swedish (Finland)":"sv-FI",Thai:"th",Tsonga:"ts",Tswana:"tn",Turkish:"tr",Ukrainian:"ua",Urdu:"ur",Venda:"ve",Vietnamese:"vi",Welsh:"cy",Xhosa:"xh",Yiddish:"ji",Zulu:"zu"},each=tinymce.each,extend=tinymce.extend;tinymce.create("tinymce.plugins.AttributesPlugin",{init:function(ed,url){function isRootNode(node){return node==ed.getBody()||tinymce.util.isFakeRoot(node)}function openDialog(){var mediaApi,cm=ed.controlManager,node=ed.selection.getNode(),nodeAttribs=getAttributes(node),attribsMap={id:"",title:"",class:"",lang:"",dir:""},custom=[];ed.plugins.media&&(mediaApi=ed.plugins.media),mediaApi&&mediaApi.isMediaObject(node)&&(nodeAttribs=mediaApi.getMediaData()),each(nodeAttribs,function(value,name){if(name in attribsMap)attribsMap[name]=value;else{var attr={};value&&(0==name.indexOf("on")&&(value=ed.dom.getAttrib(node,"data-mce-"+name)||value),attr[name]=value,custom.push(attr))}});var form=cm.createForm("attributes_form");each(["title","id"],function(name){form.add(cm.createTextBox("attributes_"+name,{label:ed.getLang("attributes.label_"+name,name),name:name}))});var stylesList=cm.createStylesBox("attributes_class",{label:ed.getLang("attributes.label_class","Classes"),onselect:function(){},name:"class"});form.add(stylesList);var langList=cm.createListBox("attributes_lang",{label:ed.getLang("attributes.label_lang","Language"),onselect:function(v){},name:"lang",filter:!0});langList.add("--",""),each(languageValues,function(value,name){langList.add(name,value)}),form.add(langList);var dirList=cm.createListBox("attributes_dir",{label:ed.getLang("attributes.label_dir","Text Direction"),onselect:function(v){},name:"dir"});dirList.add(ed.getLang("common.not_set","-- Not set --"),""),each(["ltr","rtl"],function(value){dirList.add(ed.getLang("attributes.label_dir_"+value,value),value)}),form.add(dirList);var repeatable=cm.createRepeatable("attributes_custom_repeatable",{label:"Other",name:"custom",item:{type:"CustomValue",id:"attributes_custom",settings:{}}});form.add(repeatable),ed.windowManager.open({title:ed.getLang("attributes.title","Attributes"),items:[form],size:"mce-modal-landscape-large",open:function(){form.update(attribsMap),repeatable.value(custom)},buttons:[{title:ed.getLang("common.cancel","Cancel"),id:"cancel"},{title:ed.getLang("common.update","Update"),id:"insert",onsubmit:function(e){var node=ed.selection.getNode(),selection=ed.selection,data=form.submit();data.custom&&(each(data.custom,function(item){data=extend(data,item)}),delete data.custom),each(data,function(value,name){"onclick"!=name&&"ondblclick"!=name||(delete data[name],data["data-mce-"+name]=value,delete nodeAttribs["data-mce-"+name]),delete nodeAttribs[name]});var isTextSelection=!selection.isCollapsed()&&selection.getContent()==selection.getContent({format:"text"});isRootNode(ed,node)||isTextSelection?ed.formatter.apply("attributes",data):(each(nodeAttribs,function(val,name){data[name]=null,"onclick"!=name&&"ondblclick"!=name||(data["data-mce-"+name]=null)}),mediaApi&&mediaApi.isMediaObject(node)?mediaApi.updateMedia(data):ed.dom.setAttribs(node,data)),tinymce.dom.Event.cancel(e)},classes:"primary",autofocus:!0}]})}ed.onPreInit.add(function(){ed.formatter.register({attributes:{inline:"span",remove:"all",onformat:function(elm,fmt,vars){each(vars,function(value,key){ed.dom.setAttrib(elm,key,value)})}}})}),ed.addButton("attribs",{title:"attributes.desc",onclick:openDialog}),ed.onNodeChange.add(function(ed,cm,n,co){cm.setDisabled("attributes",n&&isRootNode(n)&&co)})}}),tinymce.PluginManager.add("attributes",tinymce.plugins.AttributesPlugin)}();