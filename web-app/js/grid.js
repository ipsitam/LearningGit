/**
 * Reusable jqGrid implementation 
 */
var grid = (function () { 
	
	"use strict";

	var instance = {}; 

	/**
	 * Initializes the jqGrid using the parameters passed. 
	 */
	instance.gridInit = function (gridId, paginationId,gridProps) {
		var gridid = '#' + gridId
		var commonParams = {
			hidegrid:false,
			mtype: 'GET',
			width:'100%',
			height:'100%',
			pager: '#' + paginationId,
			pginput:true,
			caption : '',
			recordtext : 'Displaying {0} - {1} of {2} records',
			emptyrecords : '',
			loadtext:'',
			rowNum : '10',
			multiselect : false,
		    onPaging :function(pgButton) {
		    	//fired for any pagination related action
		    	//reset to page 1
		    	$(gridid).setGridParam({page:1});
		    },
		    multiselectWidth : 43,
		    onSortCol:function(index, iCol, sortorder) {
		    	//fired on sorting
		    },
			rowList:['10','20','30','10000'],
			viewrecords: true,
			gridview: true,
			ajaxSelectOptions: { cache: false }
		}
		
		$.each( commonParams, function( key, value ) {  
			gridProps[key] = value
		});
		$(gridid).jqGrid(gridProps);
		$('#' + paginationId + ' option[value="10000"]').text('All');
		
		$(gridid + "_toppager").children().remove()
		// move Row list select box to the top and add a label
		$("<label class='ui-pg-selbox-label'>Results per page: </label>").appendTo(gridid + "_toppager")
    	$('#' + paginationId + "_center table tr td:last select").appendTo(gridid + "_toppager")
    	
    	// display record text information on the top of grid
    	$('#' + paginationId + ' table tr td#' + paginationId + '_right').appendTo(gridid + "_toppager")
		
		//remove page number input box
		$('#' + paginationId +' #' + paginationId +'_center td:has(input)').attr('id','pager');
	    $('#' + paginationId +' #' + paginationId +'_center #pager').html('');
	    
	    // position the pager in the center
	    $('#' + paginationId + ' table tr td#' + paginationId + '_left').remove()
	};
	
	/**
	 * Removes the hyperlinks on non-sortable columns.
	 */
	instance.formatUnsortableColumns = function(gridId) {
		var gridid = '#' + gridId
		var colModel = $(gridid).jqGrid('getGridParam','colModel')
        $.each(colModel , function(i, val) {
        	if (val.sortable == false) {
        		var colId = "#jqgh_" + gridId + "_" + val.name
        		$(colId).css("cursor", "default");
  			}
        });
	}
	
	/**
	 * Displays or hides the pagination bar based on the number of records.
	 */
	instance.showOrHidePager = function(gridId, paginationId, emptyRecMsg) {
		var gridid = '#' + gridId
		$('#msg').hide()
		$('.grid-container').show()
		var recordCount = $(gridid).jqGrid('getGridParam', 'records')
		var rowNum = $(gridid).jqGrid('getGridParam','rowNum')
		if (recordCount == 0) {
			$('#msg').show()
			$('#msg').text(emptyRecMsg)
			$('.grid-container').hide()
		} else if(rowNum == '10000' || recordCount <= rowNum) {
			$('.grid-container').show()
			$('#' + paginationId).hide()
		}  else {
			grid.jqgridCreatePager(paginationId, gridId, 9, 5)
			$('.grid-container').show()
			$('#' + paginationId).show()
		}
	}
	
	/**
	 * Builds the numeric pager for jqGrid.
	 * parameters:
	 * pagernav - ID of the pagination div
	 * navgrid - ID of the jqgrid
	 * pages - default number of pages to displayed minus 1(current page)
	 * limit - number of pages to be displayed before and after the current page  
	 */
	instance.jqgridCreatePager = function(pagernav, navgrid, pages , limit) {
	    var page = parseInt(jQuery("#"+navgrid).jqGrid('getGridParam','page'))
	    var lastPage = parseInt(jQuery("#"+navgrid).jqGrid('getGridParam','lastpage'))
	    var text='';
	    // to display Page 1 link
	    if(page-pages >= 1 || page-limit > 1){
	    	text+=jqgridCreatePageLink(navgrid,1)
	        text+= ' ... '
	    }
	    // display page links less than the current page 
	    if(page >= limit + 1) {
	    	 for(var i=0;i <pages;i++){
	    		 if(page-limit+i < page)
			            text+=jqgridCreatePageLink(navgrid,page-limit+i)
	    	 }
	    } else {
	    	for(var i=0;i <pages;i++){
	    		if(page-pages+i >=1)
		            text+=jqgridCreatePageLink(navgrid,page-pages+i)
	    	 }
	    }
	    //display current page
	    text +=jqgridCreatePageLink(navgrid,page,true);
	    
	    // display page links greater than the current page 
	    var finalVal
	    if(page < limit  + 1) {
	    	for(var i=0;i <pages;i++){
	    		if(page+i+1 <= lastPage && page+i+1 <= pages+1) {
	    			text +=jqgridCreatePageLink(navgrid,page+i+1)
	    			finalVal = page+i+1 
	    		}
	    	}
	    } else {
	    	for(var i=0;i <pages;i++){
	 	    	if(page+i+1 <= page + limit && page+i+1 <= lastPage) {
	 	           text +=jqgridCreatePageLink(navgrid,page+i+1)
	 	           finalVal = page+i+1
	 	    	}
	 	    }
	    }
	    // display last page link
	    if(finalVal < lastPage){
	        text+= ' ... '
	        text+=jqgridCreatePageLink(navgrid,lastPage)
	    }
	    var td = $('#'+pagernav+' #'+pagernav+'_center #pager').html(text);
	    $('#' + pagernav + '_center').show();
	}

	/**
	 * Creates a link for each page to be displayed on the pager.
	 */
	var jqgridCreatePageLink = function(navgrid,page,current){
	    if (!current)
	    	return '<a href="#" class="pagination-number" onclick="jQuery(\'#'+navgrid+'\').jqGrid(\'setGridParam\',{page:'+page+'}).trigger(\'reloadGrid\');$.cookie(\''+navgrid + '_page\', '+ page +');$.cookie(\''+navgrid + '_rowNum\', $(\'#'+navgrid+'\').jqGrid(\'getGridParam\', \'rowNum\'));">'+page+'</a>';
	    return '<span class="pagination-number pagination-number-selected">'+page+'</span>'
	}
	
	return instance;
	
})();