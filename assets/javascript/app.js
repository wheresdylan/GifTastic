$(document).ready(function(){

    //declaring variables
    var word;
    var newDiv;
    var clickedWord;
    var newImage;

    //creating the buttons and adding a text
    function addText(){
        event.preventDefault();
        
        word = $("#text-input").val().trim();

        newDiv = $('<button>');
        newDiv.addClass("buttons");
        newDiv.attr("text-word",word);

        newDiv.text(word);

        $('.buttonClicks').append(newDiv);

        $("#text-input").val("")
    }

    //adding the gifs on button click
    function onClick(){
        $(".images").html("");
        clickedWord = ($(this).attr("text-word"));

        addGifs(clickedWord);
    }

    //function that takens in a word, brings up Gifs and displays them
    function addGifs(newGif){

        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + newGif + "&api_key=sHZSxDX03G4XeU7saH3rQgebkmWqqiia&limit=10";

        $.ajax({
            url:queryUrl,
            method:"GET"
        }).then(function(response){
          
         

            var giphs = response.data;
        

            for (var i = 0; i < giphs.length;i++){
                newImage = $("<img>");
                newImage.addClass("newGif");
                newImage.attr("src", giphs[i].images.fixed_height_still.url);

                console.log(giphs[i].rating);
               

                $(".images").append(newImage);
            }
            
            $(".newGif").on("click", function(){
                          
                var src = $(this).attr("src");


                if(src.includes("200.gif"))
                    $(this).attr('src', src.replace('.gif', '_s.gif'));
                else if(src.includes("200_s.gif"))
                    $(this).attr('src', src.replace('_s.gif', '.gif'));
            });
        });
}



    //button clicks
    $("#add-text").on("click", addText);
    $(document).on("click", ".buttons", onClick)


    
});