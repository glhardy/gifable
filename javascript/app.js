$(document).ready(function() {
	
	function displayTerms() {
		$('#topics').html('');
		$.each( topics, function ( i, l) {
            $('#topics').append('<button class="btn btn-primary topic-btn" data-topic="' + l + '">' + l + '</button>');
		});

		$('.topic-btn').on('click', function(){
			var topic = $(this).data('topic');
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
			$.ajax({
				url: queryURL,
				method: 'GET'	
			})	
			.done(function(response) {
				var results = response.data;

				$('#gifsAppearHere').html('');

				for (var i = 0; i < results.length; i++) {
					var topicDiv = $('<div class="col-sm-12 col-md-3">');
					var p = $('<p>').text("Rating: " + results[i]rating);
				}
			})
		})	
		
	}

});