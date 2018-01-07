const get_filter =  _getStorage("filter_name") ? _getStorage("filter_name") : '';
$all_filter_element = __({
	el:"#"+get_filter
});

const save_search = _getStorage("query_search_save") ? _getStorage("query_search_save") : undefined;

function searchImage(v){

	var query,check;
	if (v)
	{
		check =true;
	}else{
		check = _required($my_query);
	}
	if (check)
	{
		query = (v) ? v : $my_query.getValue;
		const key = '7599603-4809957d2ae3fd7db52f26911';
		let $url = "https://pixabay.com/api/?key="+key+"&q="+query+"&image_type=photo&pretty=true";
		
		$get = __({
		    el:"result_disp",
		    url:$url,
		    method:"get"
		});
		reloadTitle(query);
		$get.setContent(loading());
		_saveStorage("query_search_save",query);
		$get.request($response=>{
				try{
					 $response = JSON.parse($response);
				     if ($response)
				     {
						var total = $response.total;
						if (total==0)
						{
							$display_total.setContent("Total : 0");
							$get.setContent(
								'<div class="notification is-danger"> <button class="delete"></button>{ '+query+' } Result Not Found</div>'
								);
							return false;
						}
						let tmplate = '';
						let data = $response.hits;
						var total_display=0;
						for (var i = 0; i < data.length; i++) 
						{
							let likes = data[i].likes;
							let user = data[i].user;
							let img   = data[i].webformatURL;
							let comments   = data[i].comments;
							let downloads   = data[i].downloads;
							let tags   = data[i].tags;


							let userImageURL   = (data[i].userImageURL) ? data[i].userImageURL : 'asset/no.png';
							tmplate +='<div class="card"> <div class="card-image">'
									  +'<figure class="image is-square">'
									  +'<img src="'+img+'" width="100" height="100" class="card-image '+get_filter+'"> </figure>'
									  +'</div> <div class="card-content"> <div class="media"> <div class="media-left">'
									  +'<figure class="image is-32x32"> <img src="'+userImageURL+'" alt="Placeholder image">'
									  +'</figure> </div> <div class="media-content"> <p class="title is-4">'+user+'</p>'
									  +'<p class="subtitle is-6">@'+user+'</p> </div> </div> <div class="content">'
									  +'Likes : '+likes+' , Comments : '
										+comments+', Download : '+downloads+' '
									  +'<br>'
									  +' </div><button id="'+i+'" name="'+img+'" '
									  +'onclick="downloadImage(this);" class="button is-danger">Download</button> </div> </div><br><br>';
							total_display++;
						}
						$display_total.setContent("Total : "+total_display);
						$get.setContent(
							tmplate+'<hr><button class="button is-secondary" onclick="goUp();">Go Up</button>'
						);
				     }
				}catch(e)
				{
					_writeLog(e);
				}
		});
	}
	$my_query.focus();
};

if (save_search===undefined)
{
	searchImage(_randomStr(2));
}else{
	$my_query.setValue(save_search);
	searchImage(save_search);
	$my_query.focus();
}

function downloadImage(obj)
{
	let url = obj.name;
	let desc = _randomStr();
	let x=new XMLHttpRequest();
	x.open("GET", url, true);
	x.responseType = 'blob';
	x.onload=function(e){
		download(x.response, desc+".jpg", "image/jpg" );
	 }
	x.send();
};



function selectOption()
{
	$select_option = __({
		el:get_filter
	});

	$select_option.setAttr({
		key:"selected",
		value:""
	});
}


selectOption();

function reloadTitle(d)
{
	(d===undefined) ? _setTitle("Search Image { "+save_search+" } | Garuda Javascript 2") : _setTitle("Search Image { "+d+" } | Garuda Javascript 2");
}
reloadTitle();