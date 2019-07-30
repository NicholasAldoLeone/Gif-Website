var gifOptions = ["Cats", "Dogs", "Hamsters"];
var maxNumOfGifs = 12;

function clearPreviousGifs() {
    $("img").remove();
}

$("#setNumber").on("click", function(){
    maxNumOfGifs = $("#numberOfGifs").val();

    $("#numberOfGifs").val("");
    
})

$(document).on("click", ".optionBtn", displayGifs);

function displayGifs() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=" + maxNumOfGifs;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        clearPreviousGifs();
        console.log(response);
        var result = response.data;

        for(var i = 0; i < result.length; i++) {
            var image = $("<img>")
            var animate = result[i].images.fixed_height.url;
            var still = result[i].images.fixed_height_still.url;

            image.attr("id", "gif");
            image.attr("data-still", still);
            image.attr("data-animate", animate);
            image.attr("data-state", "still");

            image.attr("src", still);


            $("#imageBox").append(image);
        }
    });
}

function renderButtons() {
    $("#buttonsBox").empty();

    for(var i = 0; i < gifOptions.length; i++) {
        var a = $("<button>");

        a.addClass("optionBtn");
        a.attr("data-name", gifOptions[i]);
        a.text(gifOptions[i]);

        $("#buttonsBox").append(a);

        $("#inputBox").val("");
    }
}

$("#inputButton").on("click", function(event){
    event.preventDefault();
    var userInput = $("#inputBox").val()

    if (userInput === "") {
        console.log("There is nothing in the box")

    }
    else {
        gifOptions.push(userInput);
        renderButtons();

    }
});


renderButtons();

$(document).on("click", "#gif", function(){
    var state = $(this).attr("data-state");

    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    }
    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

    }
})