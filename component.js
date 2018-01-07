$my_query= __({
	el:"my_query"
});
$btn_down= __({
	el:"btn_down"
});
$btn_clear= __({
	el:"btn_clear"
});
$btn_search= __({
	el:"btn_search"
});
$my_filter= __({
	el:"my_filter",
	index:0
});
$btn_no_filter= __({
	el:"btn_no_filter"
});
$display_total= __({
	el:"display_total"
});

function loading()
{
	return '<div class="cssload-thecube" id="my_load"> <div class="cssload-cube cssload-c1"></div> <div class="cssload-cube cssload-c2"></div> <div class="cssload-cube cssload-c4"></div> <div class="cssload-cube cssload-c3"></div> </div>'; 
}

$my_query.focus();