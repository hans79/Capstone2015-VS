var responseText;

    window.onload = function () {
                    var checkButton = document.getElementById("checkcode");
                    checkButton.addEventListener("click", buttonClickHandler, false);
                    var courrierButton = document.getElementById("courrierbtn");
            
                    var homepageButton = document.getElementById("homepage");
                    homepageButton.addEventListener("click", homepageBtn, false);
    }

    function buttonClickHandler(eventInfo) {
        /*parse
        Parse.initialize("66cwJB2R2fW0wG2Va44hzWajskfe7tEsFKvIXnFc", "64tImPApRrsLJknYLbyHjRgKFbqW8dkk51POZSyr");
        var code = document.getElementById("codeInput").value;
        var boxid = Parse.Object.extend("Recipients");
        var query = new Parse.Query(boxid);
        query.equalTo("password", code);
        query.first({
            success: function (object) {
                // Successfully retrieved the object
                try {
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
        });
        */
        // mysql version
        var code = document.getElementById("codeInput").value;
        var x = new XMLHttpRequest();
        var output = "";
        x.open("GET", "http://localhost:3000/recipients/"+code);
        x.onload = function () {
            if (x.status == 200) {       
                responseText = JSON.parse(x.responseText);
                if (responseText.error == 0) {
                    var id = responseText.Box[0].box_id;
                    localStorage.setItem("boxid", id);
                    location.href = "boxid.html";
                }
                /*error message*/
                else {
                    /*output += "<h2>" + "Sorry, this is a wrong password." + "</h2>";
                    output += "<h2>" + "Please enter the password again." + "</h2>";*/
                    document.getElementById("list-posts").innerHTML = "<h2>" + "Sorry, this is a wrong password." + "</h2>";
                    document.getElementById("errorm").innerHTML = "<h2>" + "Please enter the password again." + "</h2>";
                }
            }
            
        }		

        x.send(null);
       }
    
    

        function buttonCourrierHandler(eventInfo) {
            location.href = "courrier.html";
        }

        /*function buttonGobackHandler(eventInfo) {
            location.href = history.back(-1);
        }*/

        function homepageBtn() {
            location.href = "home.html";
        }
