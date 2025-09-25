var waitToSend;
var selectedCell;
var hiddenMenu = true;
var ProcessingFunction;
var ctrlDown = false;
const ctrlKey = 17,
	cmdKey = 91,
	vKey = 86,
	cKey = 67;

function plusOneDay(n){
	var dateVar = $('#calenderTable  th.darkGrayColor');
	if(n > 0){
		var dateText = dateVar.last().text();
		ProcessingFunction = insetCollumAtend;
	}else{
		//scipt the fist colum
		var dateText = dateVar.first().next().text();
		ProcessingFunction = insetCollumInfront;
	}
	
	$.get("./getday?date="+dateText+"&direction="+n, function(data, status){
		const obj = JSON.parse(data);
		if(obj.status == -1){
			showError();
		}else if(obj.status == 1){
			showInfo();
		}else{
			ProcessingFunction(obj);
			ProcessingFunction = -1;
		}
	}).fail(function(response) {
		showError();
	});
}
function insetCollumAt(dayData, n){
	appendCollum(dayData, n);
}

function insetCollumInfront(dayData){
	insetCollumAt(dayData, 0);
}

function insetCollumAtend(dayData){
	insetCollumAt(dayData);
}

function appendCollum(data, n){
	 var table = $('#calenderTable');
	 let cellSeparator = ['td', 'th'];
	 var rowCounter = -2; //this way we skip the tow header rows
	 var dayCounter = 0;
	 table.find('tr').each(function(){
			if(n !== undefined){n = 0;}
			for(let i = 0; i < cellSeparator.length; i++){
				var rowStr = cellSeparator[i];
				if(n !== undefined){
					//n can be replaced by the number after which column you want to add new column
					var tableRow = $(this).find(rowStr).eq(n);
				}else{
					var tableRow = $(this).find(rowStr +':last-child');
				}
				if(tableRow.length != 0){
					break;
				}
			}
			if(n == 0){
				var classList = tableRow.next().next().attr('class');
				var contenteditableFlag = tableRow.next().next().attr('contenteditable');
			}else{
				var classList = tableRow.attr('class');
				var contenteditableFlag = tableRow.attr('contenteditable');
			}
			if(contenteditableFlag == 'true'){
				contenteditableFlag = `' contenteditable='`+contenteditableFlag;
			}else{
				contenteditableFlag = ``;
			}
			if(rowCounter == -2){
				rowTextString = data.newDate;
			}
			else if(rowCounter == -1){rowTextString = data.weekDay;}
			else{
				if(rowCounter % (data.numberOfRow + 1) != 0){
					classList += data.dayContent[dayCounter][0];
					rowTextString = data.dayContent[dayCounter][1];
					dayCounter++;
				}else{
					if(n == 0){
						rowStr = cellSeparator[1]; // fix problem with fixed fist collum
					}
					rowTextString = ``;
				}
			}
			tableRow.after(`<`+rowStr+` class='`+ classList + contenteditableFlag+`'>`+rowTextString+`</`+rowStr+`>`);
            rowCounter++;
			if(n == 0){
				tableRow = tableRow.next().next(); //next -> next becasue just one next takes the new cell that has no events
			}
			var events = $._data(tableRow.get(0), 'events');
			if(events){
				if(n != 0){
					var $other_element = tableRow.next();
				}else{
					var $other_element = tableRow.prev(); //prev becasue the new cell should be selected
				}
				for(var eventType in events){
					for(var idx in events[eventType]){
						// this will essentially do $other_element.click( fn ) for each bound event
						$other_element[eventType](events[eventType][idx].handler);
					}
				}
			}
	   });
		/**
		$('td:first-child').css('background','red');
		$('td:last-child').css('background','blue');
		$('td:first').css('font-weight','bold');
		$('td:last').css('font-style','italic');
		//http://jsfiddle.net/DFXJ3/1/
		*/
}

function scrollToTableEnd(){
	 var table = $('#calenderTable');
	 $(window).scrollLeft(table.width());
}
function scrollToTableBegin(){
	 $(window).scrollLeft(0);
}


function saveData(cell, date, cellRow){
	result = processData(cell, date, cellRow);
	// ... ajax ...
    $.post("."+window.location.pathname, {contetnt: result}, function(result){
		const obj = JSON.parse(result);
		if(obj.status == -1){
			showError();
		}
    }).fail(function(response) {
		showError();
	});
}

function processData(cell, date, cellRow){
	if(cell.classList.length > 2){
		var customCellStyle = [];
		for(let i = 2; i < cell.classList.length; i++){
			customCellStyle[i-2] = cell.classList[i];
		}
	}else{
		var customCellStyle = [''];
	}
	var cellContent = cell.innerText;
	cellRow -= 2; //skip the weekdays and dates rows
	return JSON.stringify({customStyle: customCellStyle,
                             cellRow: cellRow,
                             rowID: date,
							 cellText:cellContent});
}

function hideMenu(e){
	if(!hiddenMenu){
		var menu = $('#menu');
		/*mx = e.pageY;
		my = e.pageX;
		divy = menu.offset().left;
		divx = menu.offset().top;
		divh = menu.height();
		divw = menu.width();
		if(mx > divx && mx < divx+divh && my> divy && my < divy+divw){*/
		if(e.pageY > menu.offset().top && e.pageY < menu.offset().top + menu.height() && e.pageX > menu.offset().left && e.pageX < menu.offset().left + menu.width()){
			return;
			//if the click is in the menu do nothing else hide it.
		}else{
			menu.hide();
			hiddenMenu = true;
		}
	}
}

function stretchTabel(){
	if ($(window).width() > $('#calenderTable').width()) {
		plusOneDay(1);
		setTimeout(stretchTabel, 200);
	}else{
		$('#wrapper').hide(); //this hides the flicker when adding new collum on page loading
	}
}

function addTableCellHandler(){
	$('#calenderTable td.editbleText').keypress(function(e){
		if (e.which !== 0 && e.charCode !== 0 && !e.ctrlKey && !e.metaKey && !e.altKey) {
			processKeyPresses(this);
		}
	});
	$('#calenderTable td.editbleText').keydown(function(e){
		if (e.keyCode == 8 || e.keyCode == 46) {
			//keyCode ==  8 is backspace
			//keyCode == 46 is delete
			processKeyPresses(this);
		}
	});
	
    $('#calenderTable td.editbleText').keydown(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = true;
    }).keyup(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey) ctrlDown = false;
    });
	
	$('#calenderTable td.editbleText').keydown(function(e) {
        if (ctrlDown && (e.keyCode == vKey)){
			processKeyPresses(this);
		}
    });
}

function processKeyPresses(cell){
	var col = $(cell).parent().children().index($(cell));
	var row = $(cell).parent().parent().children().index($(cell).parent());
	var dateMonth = $('#calenderTable').find('th.darkGrayColor').eq(col).text();
	$(cell).data('timer', waitToSend);
	clearTimeout($.data(cell, 'timer'));
	waitToSend = setTimeout(saveData, 500, cell, dateMonth, row); // delay after user types
}

function addContexMenu(){
	//https://electrictoolbox.com/jquery-modify-right-click-menu/
	$('#calenderTable td.editbleText').bind('contextmenu', function(e){
		selectedCell = this;
		var WinSizeW = $(window).width()
		var WinSizeH = $(window).height()
		var menu = $('#menu');
		var posY, posX;

		if(e.pageY + menu.outerHeight(true) > WinSizeH || e.pageX + menu.outerWidth(true) > WinSizeW){
			if(e.pageY + menu.height() > WinSizeH){
				posY = e.pageY - menu.outerHeight(true);
			}else{
				posY = e.pageY;
			}
			if(e.pageX + menu.width() > WinSizeW){
				posX = e.pageX - menu.outerWidth(true);
			}else{
				posX = e.pageX;
			}
		}else{
			posX = e.pageX
			posY = e.pageY;
		}
		
		menu.css({
			top: posY+'px',
			left: posX+'px'
		}).show();
		
		if(selectedCell.classList.contains('italicText')){
			$('#italic').prop('checked', true);
		}else{
			$('#italic').prop('checked', false);
		}
		if(selectedCell.classList.contains('boldText')){
			$('#bold').prop('checked', true);
		}else{
			$('#bold').prop('checked', false);
		}
		if(selectedCell.classList.contains('underText')){
			$('#underline').prop('checked', true);
		}else{
			$('#underline').prop('checked', false);
		}
		if(selectedCell.classList.contains('strikethroughText')){
			$('#strikethrough').prop('checked', true);
		}else{
			$('#strikethrough').prop('checked', false);
		}
		if(selectedCell.classList.contains('boxTop')){
			$('#boxtop').prop('checked', true);
		}else{
			$('#boxtop').prop('checked', false);
		}
		if(selectedCell.classList.contains('boxMiddle')){
			$('#boxmiddle').prop('checked', true);
		}else{
			$('#boxmiddle').prop('checked', false);
		}
		if(selectedCell.classList.contains('boxBottom')){
			$('#boxbottom').prop('checked', true);
		}else{
			$('#boxbottom').prop('checked', false);
		}
		if(selectedCell.classList.contains('boxFull')){
			$('#boxfull').prop('checked', true);
		}else{
			$('#boxfull').prop('checked', false);
		}
		hiddenMenu = false;
		return false;
	});
	
	$('#menu').bind('contextmenu', function(e){
		hideMenu(e);
	});
	$(document).bind('contextmenu', function(e) {
		hideMenu(e);
	});
	$(document).click(function(e) {
		hideMenu(e);
	});
}

function addMenuEvents(){
	$('#italic').change(function() {
		if(this.checked) {
			selectedCellAddClass('italicText');
		}else{
			selectedCellDelClass('italicText');
		}
	});
	$('#bold').change(function() {
		if(this.checked) {
			selectedCellAddClass('boldText');
		}else{
			selectedCellDelClass('boldText');
		}
	});
	$('#underline').change(function() {
		if(this.checked) {
			selectedCellAddClass('underText');
		}else{
			selectedCellDelClass('underText');
		}
	});
	$('#strikethrough').change(function() {
		if(this.checked) {
			selectedCellAddClass('strikethroughText');
		}else{
			selectedCellDelClass('strikethroughText');
		}
	});
	$('#boxtop').change(function() {
		if(this.checked) {
			selectedCellAddClass('boxTop');
		}else{
			selectedCellDelClass('boxTop');
		}
	});
	$('#boxmiddle').change(function() {
		if(this.checked) {
			selectedCellAddClass('boxMiddle');
		}else{
			selectedCellDelClass('boxMiddle');
		}
	});
	$('#boxbottom').change(function() {
		if(this.checked) {
			selectedCellAddClass('boxBottom');
		}else{
			selectedCellDelClass('boxBottom');
		}
	});
	$('#boxfull').change(function() {
		if(this.checked) {
			selectedCellAddClass('boxFull');
		}else{
			selectedCellDelClass('boxFull');
		}
	});
}

function selectedCellAddClass(newClass){
	selectedCell.classList.add(newClass);
	processKeyPresses(selectedCell);
}
function selectedCellDelClass(newClass){
	selectedCell.classList.remove(newClass);
	processKeyPresses(selectedCell);
}

function showError(){
	 $('#errorBar').show();
}
function showInfo(){
	 $('#infoBar').show();
}

function focusTodaysFisrtCell(){
	 var counter = 0;
	 var col = $('#currentDateColor').parent().children().index($('#currentDateColor'));
	 var table = $('#calenderTable');
	 table.find('tr').each(function(){
		 if(counter == 3){//fisrt eitable row
			this.children[col].focus();
		 }
		 counter++;
	});
}