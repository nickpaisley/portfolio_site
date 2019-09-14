var req = new XMLHttpRequest();
var url = "https://api.nasa.gov/planetary/apod?api_key=";
var api_key = "Fwh7Etm7HXFczX2kUYbl3AwQzirxygOrA2HZWgma&";
var date = "date=2019-09-3";

req.open("GET", url + api_key, true);
req.send();

req.addEventListener("load", function () {
    if (req.status == 200 && req.readyState == 4) {
        var response = JSON.parse(req.responseText);
        document.getElementById("title").textContent = response.title;
        document.getElementById("date").textContent = response.date;
        document.getElementById("pic").src = response.hdurl;
        document.getElementById("vid").src = response.url;
        document.getElementById("explanation").textContent = response.explanation;

        // This hides the image box if media_type is video
        var img = document.getElementById("pic");
        img.onerror = function () {
            this.style.display = "none";
        }

        // Use JQUERY to check for CrossOrigin pic request, if media_type is Image, this hides the iframe
        if (response.media_type == "image") {
            $("#vid").css("display", "none");
            $("#pic").attr("src", response.hdurl);
        }

    }

})

// Get the modal
var modal = document.getElementById("picModal");

// Get the image and insert it inside the modal - the "alt" as the caption
var img = document.getElementById("pic");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}

//get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//When the user clicks on the <span> (x), close the modal
span.onclick = function(){
    modal.style.display = "none";
}