$(document).ready(function() {
	$(document).on('keyup','.jquery_filter',function(){
		// data attrubutes:
		// 1. data-search-item-div 
		// 2. data-search-classes : Comma separated classes 
		// 			in the search item div class1,class2 
		// Example : 
		// <input type="text" class="jquery_filter" 
		// placeholder="Enter Search Text " 
		// data-search-items-wrapper-id="#institutes_list"
		// data-search-item-class=".list-card"
		// data-search-classes=".card-title,.address,.subject_badge" >
		var debug = false;
		if (debug){
			console.log(" **** NEW SEARCH BEGINS **** ")
		}
		var $wrapper = $($(this).attr('data-search-items-wrapper-id'));
		var $search_item_div = $wrapper.find($(this).attr('data-search-item-class'));
		if ($.trim($(this).val()) == ""){
			// If the current search text is empty, show all the elements
			// This will cover the scenario when the user
			// writes something and then deletes.
			$search_item_div.removeClass('hidden');
			$wrapper.find('.not_found_div').remove();
		}
		else{
			// split the search text in to tokens 
			var search_tokens = $.trim($(this).val()).split(' ');
			if (debug){
				console.log("Search Tokens : " + search_tokens);
			}
			// Find all the classes inside the item box which 
			// contains the data that we have to index.
			var search_classes = $(this).attr('data-search-classes').split(',');

			// Maintain the number of matches in matching_count variable.
			var matching_count = 0;
			
			// Loop over all the search item elements
			$search_item_div.each(function(){
				var cur_div = $(this);
				var div_str = "";
				// loop over all the search classes
				// and construct a long string with all the strings to search
				$.each(search_classes,function(index,value){
					if (debug){
						console.log("Search Class = " + value);
						console.log("Search Class Value = " + cur_div.find(value).text());
					}
					div_str += " " + cur_div.find(value).text();
				});
				if (debug){
					console.log("Div Str : "+ div_str);
				}
				
				// Now loop through the tokens to test for match
				$.each(search_tokens,function(index,value){
					if (value){
						var re = new RegExp(value, "i");
						if (re.test(div_str)){
							// Token matches ? unhide the search item element
							cur_div.removeClass('hidden');	
							matching_count += 1;
						}
						else{
							// No match ?  hide the current search item element
							cur_div.addClass('hidden');
						}
					}
				});

				// if (matching_count == 0 ){
				// 	$wrapper.find('.not_found_div').remove();
				// 	$wrapper.append("<div class='not_found_div' style='color:#888; text-align:center; font-size:18px; margin-top:40px;'> Not Found ! </div>");
				// }
				// else{
				// 	$wrapper.find('.not_found_div').remove();
				// }
				if (debug){
					console.log("Matching Count : " + matching_count);
				}
				if (matching_count == 0 ){

					// If no match is found, display the "Not Found" message.
					if ($wrapper.find('.not_found_div').length > 0){
						$wrapper.find('.not_found_div').removeClass("hidden");
					}else{
						$wrapper.append("<div class='not_found_div' style='color:#888; text-align:center; font-size:18px; margin-top:40px;'> Not Found ! </div>");	
					}
				}
				else{
					// if any of the element matches, hide the "Not Found" Message.
					$wrapper.find('.not_found_div').addClass("hidden");
				}
				
			});
		}
	});
});