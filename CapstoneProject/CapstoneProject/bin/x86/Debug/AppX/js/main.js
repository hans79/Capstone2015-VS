var responseText;

    window.onload = function () {
                    var checkButton = document.getElementById("checkcode");
                    checkButton.addEventListener("click", buttonClickHandler, false);
                    var courrierButton = document.getElementById("courrierbtn");
                    courrierButton.addEventListener("click", buttonCourrierHandler, false);
                }
    function buttonClickHandler(eventInfo) {
        
        /*Parse.initialize("66cwJB2R2fW0wG2Va44hzWajskfe7tEsFKvIXnFc", "64tImPApRrsLJknYLbyHjRgKFbqW8dkk51POZSyr");
        var code = document.getElementById("codeInput").value;
        var boxid = Parse.Object.extend("Recipients");
        var query = new Parse.Query(boxid);
        query.equalTo("Hashtag", code);
        query.first({
            success: function (object) {
                // Successfully retrieved the object
                try{
                    var id = object.get("BoxID");
                    localStorage.setItem("boxid", id);
                    location.href = "boxid.html";
                } catch (e) {
                    alert("no such code exist!")
                }
            },
            error: function (error) {
                alert("please tyry again");
            }
        });*/
        var code = document.getElementById("codeInput").value;
        var x = new XMLHttpRequest();
        x.open("GET", "http://localhost:3000/recipients/"+code);
        x.onload = function () {
            if (x.status == 200) {       
                responseText = JSON.parse(x.responseText);
                if (responseText.error == 0) {
                    document.getElementById("testing").innerHTML = responseText.Box[0].boxid;
                    var id = responseText.Box[0].boxid;
                    localStorage.setItem("boxid", id);
                    location.href = "boxid.html";
                }
            }		
        }		

        x.send(null);
    }
    

        function buttonCourrierHandler(eventInfo) {
            location.href = "courrier.html";

        }
