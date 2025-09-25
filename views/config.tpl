<!DOCTYPE html>
<html xmlns='http://www.w3.org/TR/REC-html40'>

<head>
<title>{{pageTranslation[0]}}</title>
<meta http-equiv=Content-Type content='text/html; charset=utf-8'>
<link rel=Stylesheet href='./static/css/stylesheet.css'>
<link rel=Stylesheet href='./static/css/config_stylesheet.css'>
<link rel=Stylesheet href='./static/css/newStyle.css'>
<script src='./static/js/jquery-3.6.4.min.js'></script>
<script src='./static/js/scripts.js'></script>
<script src='./static/js/scripts_config.js'></script>
<script>
	$(document).ready(function(){
		addTableCellHandler();
		addContexMenu();
		addMenuEvents();
		addColorTableEvents();
	});
</script>
</head>

<body>


<div class="grid-container">
  <div class="grid-child left">
   <table id='calenderTable'>
    <tr>
     <th class='cellStayOnTop darkGrayColor size34 cellwidth'>{{pageTranslation[1]}}</th>
    </tr>
    <tr><td></td></tr><!-- pading to use the same post js function -->
   % for i in range(len(pageContent['categories'])):
    <tr>
     <td class='editbleText'  contenteditable='true'><div class='{{pageContent['categories'][i]['color']}} boldText size12'>{{pageContent['categories'][i]['text']}}</div></td>
    </tr>
    %for k in range(len(pageContent['goal'][i])):
    <tr>
     <td class='editbleText whiteColor {{pageContent['goal'][i][k]['format']}}'  contenteditable='true'>{{!pageContent['goal'][i][k]['text']}}</td>
    </tr>
    % end # of %for k in len(pageContent['goal'][i]):
   % end # of %for i in len(pageContent['categories']):
   </table>
  </div>
  <div class="grid-child right">

    <table id='addCategory'>
    <tr>
     <th class='cellStayOnTop darkGrayColor size34 cellwidth'>{{pageTranslation[2]}}</th>
     <th class='cellStayOnTop darkGrayColor size34 cellwidth' colspan="7">{{pageTranslation[3]}}</th>
    </tr>
	<tr><td></td></tr><!-- pading to use the same post js function -->
   % for i in range(len(pageContent['categories'])):
    <tr class="catRows" name="color_select{{i}}">
    <td class='editbleText oldColor {{pageContent['categories'][i]['color']}}' contenteditable='true'><div class=' boldText size12'>{{pageContent['categories'][i]['text']}}</div></td>
    <td class = "blueColor midCell"><input type="radio" name="color_select{{i}}" value="blueColor"></td>
    <td class = "limeGreenColor midCell"><input type="radio" name="color_select{{i}}" value="limeGreenColor"></td>
    <td class = "darkGreen midCell"><input type="radio" name="color_select{{i}}" value="darkGreen"></td>
    <td class = "orangeColor midCell"><input type="radio" name="color_select{{i}}" value="orangeColor"></td>
    <td class = "purpleColor midCell"><input type="radio" name="color_select{{i}}" value="purpleColor"></td>
    <td class = "redColor midCell"><input type="radio" name="color_select{{i}}" value="redColor"></td>
    <td class = "whiteColor midCell"><input type="radio" name="color_select{{i}}" value="whiteColor"></td>
	</tr>
   % end # of %for i in len(pageContent['categories']): 
   %if pageContent['newCat']:
	%for i in range(pageContent['newCat']):
	% cellId = 1000 + i*1000
    <tr class="catRows" name="color_select{{cellId}}">
    <td class="editbleText newColor whiteColor " contenteditable="true"><div class=' boldText size12'> </div></td>
    <td class = "blueColor midCell"><input type="radio" name="color_select{{cellId}}" value="blueColor"></td>
    <td class = "limeGreenColor midCell"><input type="radio" name="color_select{{cellId}}" value="limeGreenColor"></td>
    <td class = "darkGreen midCell"><input type="radio" name="color_select{{cellId}}" value="darkGreen"></td>
    <td class = "orangeColor midCell"><input type="radio" name="color_select{{cellId}}" value="orangeColor"></td>
    <td class = "purpleColor midCell"><input type="radio" name="color_select{{cellId}}" value="purpleColor"></td>
    <td class = "redColor midCell"><input type="radio" name="color_select{{cellId}}" value="redColor"></td>
    <td class = "whiteColor midCell"><input type="radio" name="color_select{{cellId}}" value="whiteColor"></td>
    </tr>
    % end # for i in range(pageContent['newCat']):
   % end # if pageContent['newCat']:
   </table>
  </div>
</div>

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
  <div>
    <input type="checkbox" id="boxtop" name="boxtop">
    <label for="boxtop">Box top</label>
  </div>
  <div>
    <input type="checkbox" id="boxmiddle" name="boxmiddle">
    <label for="boxmiddle">Box middle</label>
  </div>
  <div>
    <input type="checkbox" id="boxbottom" name="boxbottom">
    <label for="boxbottom">Box bottom</label>
  </div>
  <div>
    <input type="checkbox" id="boxfull" name="boxfull">
    <label for="boxfull">Box</label>
  </div>
 </fieldset>
</div>
<div id="errorBar" class="bar error floating">
  <div class="close" onclick="this.parentElement.style.display='none'">X</div>
  <i class="ico">&#9747;</i> {{pageTranslation[4]}}
</div>
</body>
</html>
