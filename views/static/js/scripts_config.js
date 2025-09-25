//var manageradiorel = $("input:radio[name ='color_select']:checked").val();
//alert(manageradiorel);

function addColorTableEvents(){
	$('input[type=radio]').change(function() {
		var prevCell = $('td:first', $(this).parents('tr'));
		prevCell.removeClass('whiteColor');
		prevCell.removeClass('blueColor');
		prevCell.removeClass('limeGreenColor');
		prevCell.removeClass('darkGreen');
		prevCell.removeClass('orangeColor');
		prevCell.removeClass('purpleColor');
		prevCell.removeClass('redColor');
		prevCell.addClass('newColor');
		prevCell.addClass(this.value);
	});
	$('#addCategory td.editbleText').keypress(function(e){
		if (e.which !== 0 && e.charCode !== 0 && !e.ctrlKey && !e.metaKey && !e.altKey) {
			processConfigKeys(this);
		}
	});
	$('#addCategory td.editbleText').keydown(function(e){
		if (e.keyCode == 8 || e.keyCode == 46) {
			//keyCode ==  8 is backspace
			//keyCode == 46 is delete
			processConfigKeys(this);
		}
	});
	$('#addCategory tr.catRows').each(function(){
		var tableRow = $(this);
		var radioGroupName = $(this).attr('name');
		var elems = tableRow.children();
		var color = elems[0].classList;
		color = color[color.length-1];
		for(let i = 1; i < elems.length; i++){
			//todo
			tmpElm = $(elems[i]).find(`input[type=radio][name='`+radioGroupName+`']`);
			tmpElm.change(function() {
				processConfigKeys(elems[0]);
			});
			if(tmpElm.val() == color){
				tmpElm.prop("checked", true);
			}
		}
	});
}

function processConfigKeys(cell){
	var col = $(cell).parent().children().index($(cell));
	var row = $(cell).parent().parent().children().index($(cell).parent());
	var dateMonth = -1001;
	$(cell).data('timer', waitToSend);
	clearTimeout($.data(cell, 'timer'));
	waitToSend = setTimeout(saveData, 500, cell, dateMonth, row); // delay after user types
}