$(document).ready(function() {
        var topics = ["bird", "cat", "dog"];


        var newTopic = ""; // new topic that will be added via the input field 

        // function to create new buttons from the topics array
        function renderButtons() {
            for (i = 0; i < topics.length; i++) {
                var button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-primary").attr("data", topics[i]);
                $("#buttons-view").append(button);
            };
        }
        renderButtons();
        //button click calls api request 
        $("button").click(function() {
            var object = $(this).attr("data");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + object + "&apikey=mkQotfiluXKtDSWmQN3Q4j80PZH1UOMP&limit=10";

            $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    console.log(response);
                    console.log(queryURL);
                    // takes api request and creates div on html to place images called with rating heading
                    var results = response.data
                    for (var i = 0; i < results.length; i++) {

                        var imageDiv = $("<div>");
                        var p = $("<p>").text("Rating: " + results[i].rating);
                        var gifPic = $("<img>");
                        gifPic.attr("src", results[i].images.fixed_height_still.url);
                        gifPic.attr("data-still", results[i].images.fixed_height_still.url);
                        gifPic.attr("data-animate", results[i].images.fixed_height.url);
                        gifPic.attr("data-state", "still");
                        gifPic.addClass("gif")
                        imageDiv.append(p);
                        imageDiv.append(gifPic);
                        $("#images-view").prepend(imageDiv);
                        $(".gif").on("click", function(event) {
                            event.preventDefault();
                            var state = $(this).attr("data-state");
                            if (state === "still") {
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            } else {
                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still");
                            }
                        })
                        console.log(this);
                    }
                })
                // creates new butttons for user input on text box interface
            function renderNewButtons() {
                for (var i = 0; i < topics.length; i++) {
                    var imageButton = $("<button>");
                    imageButton.addClass("image");
                    imageButton.attr("data-name", images[i]);
                    imageButton.text(images[i]);
                    $("#buttons-view").append(imageButton);
                }
            }
            $("#add-image").click(function(event) {
                event.preventDefault();
                var image = $("#image-input").val().trim();
                topics.push(image);
                renderNewButtons();
            })
        })
    })
    //take user input