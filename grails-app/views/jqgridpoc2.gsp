<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Demonstration how to fill local data with sorting and paging</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.7/themes/redmond/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="http://www.ok-soft-gmbh.com/jqGrid/jquery.jqGrid-3.8.2/css/ui.jqgrid.css" />
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
    <script type="text/javascript" src="http://www.ok-soft-gmbh.com/jqGrid/jquery.jqGrid-3.8.2/js/i18n/grid.locale-en.js"></script>
    <script type="text/javascript" src="http://www.ok-soft-gmbh.com/jqGrid/jquery.jqGrid-3.8.2/js/jquery.jqGrid.min.js"></script>

    <script type="text/javascript">
    //<![CDATA[
    var lastSel;
    
        jQuery(document).ready(function () {
        	 window.appContext = '${request.contextPath}';
        	    
            $("#list").jqGrid({
            	 url:window.appContext + '/jqgrid/index',
            	 jsonReader :{ root :"gridList",
            		  repeatitems: false, 
            	      cell: "",
                 },
                 datatype: "json",
                 colNames:[ 'First Name','Last Name','PlaceFrom','Employee Number'],
                 :[
                    {name:'fname',index:'fname', width:120,sortable:false},  
                    {name:'lname',index:'lname', width:120},
                    {name:'placefrom',index:'placefrom', width:120, sortable:false},
                    {name:'enumber',index:'enumber', width:100, sortable:false}
                ],
                rowNum:10,
                rowList:[5,10,20],
                pager: '#pager',
                sortname: 'lname',
                viewrecords: true,
                sortorder: "desc",
                caption:"Employee Records",
                height: "200%",
                    onSelectRow: function(id){ 
                          if(id && id!==lastSel){ 
                             jQuery(this).restoreRow(lastSel); 
                             lastSel=id;
                          } 
                          jQuery(this).editRow(id, true); 
                       }
            }).jqGrid('navGrid','#pager',{add:false,edit:false,del:false});
        });
    //]]>
    </script>
</head>
<body>
<table id="list"><tr><td/></tr></table>
<div id="pager"/>
</body>
</html>