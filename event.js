
$my_filter.when("change",$=>{
	var filter_name = ($my_filter.getValue);
	/*
	$all_filter_element.removeAttr("class");
	$all_filter_element.setAttr({
		key:"class",
		value:filter_name
	});
	*/
	_saveStorage("filter_name",filter_name);
	_refresh();
});

$btn_clear.when("click",$=>{
	$my_query.clearValue();
	$my_query.focus();
});

$btn_search.when("click",$=>{
	searchImage();
});

$btn_no_filter.when("click",$=>{
	_saveStorage("filter_name","1");
	_refresh();
});

function enterSearchImage(e){
	if (e.keyCode==13)
	{
		searchImage();
	}
};
function goUp()
{
	_scrollTo({
		el:"garuda_app"
	});
}
$btn_down.when("click",$=>{
	_scrollTo({
		x:23500000000,
		y:23500000000
	});
});