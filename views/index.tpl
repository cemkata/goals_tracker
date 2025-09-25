<!DOCTYPE html>
<html xmlns='http://www.w3.org/TR/REC-html40'>

<head>
<title>{{pageTranslation[0]}}</title>
<meta http-equiv=Content-Type content='text/html; charset=utf-8'>
<link rel=Stylesheet href='./static/css/stylesheet.css'>
<link rel=Stylesheet href='./static/css/newStyle.css'>
<script src='./static/js/jquery-3.6.4.min.js'></script>
<script src='./static/js/scripts.js'></script>
<script>
	$(document).ready(function(){
		addTableCellHandler();
		addContexMenu();
		addMenuEvents();
		stretchTabel();
		focusTodaysFisrtCell();
	});
</script>
</head>

<body>
<div id="wrapper"></div>
<table id='calenderTable'>
 <tr>
  <th class='darkGrayColor size34 cellwidth'>{{pageTranslation[1]}}</th>
% for row in pageContent['dateRow']:
  %if len(row) == 2:
  <th id='currentDateColor' class='darkGrayColor size34 cellwidth'>{{row[0]}}</th>
  %else:
  <th class='darkGrayColor size34 cellwidth'>{{row}}</th>
  % end #end of if len(row) == 2: 
% end #end of for row in dateRow:
 </tr>
 <tr>
  <th class='firstCell headerRow lightGrayColor size24 headerRow'>{{pageTranslation[2]}}</th>
% for row in pageContent['dayRow']:
  <th class='lightGrayColor headerRow'>{{row}}</th>
% end
 </tr>
% for i in range(len(pageContent['categories'])):
 <tr>
  <td class='cellStayOnTop'><div class='{{pageContent['categories'][i]['color']}} boldText size12'>{{pageContent['categories'][i]['text']}}</div></td>
  % for row in pageContent['dayRow']:
  <th class='{{pageContent['categories'][i]['color']}} size12'></th>
  % end
 </tr>
 %for k in range(len(pageContent['goal'][i])):
 <tr>
  <td class='cellStayOnTop'><div class='grayColor size12 {{pageContent['goal'][i][k]['format']}}'>{{!pageContent['goal'][i][k]['text']}}</div></td>
 % for j in range(len(pageContent['dayRow'])):
 % try:
  % if j < len(pageContent['daysContent'][i][k]):
  <td class='editbleText whiteColor {{pageContent['daysContent'][i][k][j]['format']}}' contenteditable='true'>{{pageContent['daysContent'][i][k][j]['text']}}</td>
  % else:
  <td class='editbleText whiteColor' contenteditable='true'></td>
  % end # of if j < len(pageContent['daysContent'][i][k]):
  % except IndexError:
  <td class='editbleText whiteColor' contenteditable='true'></td>
  % end # of try/except IndexError:
 % end # of for j in range(len(pageContent['dayRow'])):
 </tr>
 % end # of %for k in len(pageContent['goal'][i]):
% end # of %for i in len(pageContent['categories']):
</table>

<a class="prev" onclick="plusOneDay(-1); setTimeout(scrollToTableBegin, 150);">&#10094;</a>
<a class="next" onclick="plusOneDay(1); setTimeout(scrollToTableEnd, 150);">&#10095;</a>

<div id='menu'>
 <fieldset>
  <legend>Text decoration:</legend>
  <div>
    <input type="checkbox" id="italic" name="italic">
    <label for="italic">Italic</label>
  </div>
  <div>
    <input type="checkbox" id="bold" name="bold">
    <label for="bold">Bold</label>
  </div>
  <div>
    <input type="checkbox" id="underline" name="underline">
    <label for="underline">Underline</label>
  </div>
  <div>
    <input type="checkbox" id="strikethrough" name="strikethrough">
    <label for="strikethrough">Strikethrough</label>
  </div>
 </fieldset>
</div>
<div id="errorBar" class="bar error floating">
  <div class="close" onclick="this.parentElement.style.display='none'">X</div>
  <i class="ico">&#9747;</i> {{pageTranslation[3]}}
</div>
<div id="infoBar" class="bar info floating">
  <div class="close" onclick="this.parentElement.style.display='none'">X</div>
  <i class="ico">&#9747;</i> {{pageTranslation[4]}}
</div>
</body>
</html>
