$(document).ready(function() {

    function displayTerms() {
        $('#topics').html('');
        $.each( topics, function( i, l ) {
            $('#topics').append('<button class="btn topic-btn" data-topic="' + l + '">' + l + '</button>');
        });

        $('.topic-btn').on('click', function() {
            var topic = $(this).data('topic');
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
            $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
            
                var results = response.data;

                console.log(results);

                $('#gifsAppearHere').html('');
              
                for (var i = 0; i < results.length; i++) {
                    var topicDiv = $('<div class="gif">');
                    var p = $('<p>').text("Rating: " + results[i].rating);
                    var topicImage = $('<img data-state="still">');

                    var still = results[i].images.fixed_height.url;
                    still = still.substring(0, still.length - 4) + "_s.gif";

                    topicImage.attr('data-animate', results[i].images.fixed_height.url);
                    topicImage.attr('data-still', still);
                    topicImage.attr('src', still);

                    topicDiv.append(p);
                    topicDiv.append(topicImage);
                    $('#gifsAppearHere').prepend(topicDiv);
                }
                    $(".gif img").on("click", function() {
						// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
						var state = $(this).attr("data-state");
						// If the clicked image's state is still, update its src attribute to what its data-animate value is.
						// Then, set the image's data-state to animate
						// Else set src to the data-still value
						if (state === "still") {
							$(this).attr("src", $(this).attr("data-animate"));
							$(this).attr("data-state", "animate");
						} else {
							$(this).attr("src", $(this).attr("data-still"));
							$(this).attr("data-state", "still");
						}
					});
            });
        });

    };

    var topics = ['obama', 'trump', 'hillary', 'terminator'];

    displayTerms();

    $('#newTermBtn').on('click', function() {
        var newTerm = $('#newTermText').val();

        if(newTerm) {
            topics.push(newTerm);
            displayTerms();
            $('#newTermText').val('');
            $('button[data-topic="'+ newTerm + '"]:first').click();
        }
    });
});