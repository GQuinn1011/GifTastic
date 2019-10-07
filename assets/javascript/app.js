$(document).ready(function() {
        var topics = ["Jack-O-Lanterns", "Ghosts", "Vampires", "Halloween", "Spiders", "Scary"];

        function renderButtons() {
            $("buttons-view").empty();
            for (i = 0; i < topics.length; i++) {
                var button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-secondary").attr("data", topics[i]);
                $("#buttons-view").append(button);
            };
        }
        $("#add-image").click(function(event) {
            event.preventDefault();
            $("#buttons-view").empty();
            var userInput = $("#image-input").val().trim();
            topics.push(userInput);
            renderButtons();
        })
        renderButtons();

        $(document).on("click", ".gif", function(event) {
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
            //button click calls api request 
        $(document).on("click", "button", function() {
            var object = $(this).attr("data");
            console.log(object)
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + object + "&apikey=mkQotfiluXKtDSWmQN3Q4j80PZH1UOMP&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(this);
                // takes api request and creates div on html to place images called with rating heading
                var results = response.data
                for (var i = 0; i < results.length; i++) {

                    var imageDiv = $("<div>").addClass("col");
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



                    //console.log(this);
                }

                // creates new butttons for user input on text box interface


            })
        })
    })
    //take user input