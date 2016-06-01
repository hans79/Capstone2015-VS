
window.onload = function () {
    var homepageBtn = document.getElementById("homepage");
    homepageBtn.addEventListener("click", buttonHomepage, false);

    /*parse
    Parse.initialize("66cwJB2R2fW0wG2Va44hzWajskfe7tEsFKvIXnFc", "64tImPApRrsLJknYLbyHjRgKFbqW8dkk51POZSyr");
  
    var ItemSize = localStorage.getItem("itemSize");
    var Cubbies = Parse.Object.extend("Box2");
    var query = new Parse.Query(Cubbies);
    query.equalTo("size", ItemSize);
    query.find({
        success: function (results) {
            alert("Successfully retrieved " + results.length + " scores.");
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                var object = results[i].get("CubbyId");
                document.getElementById(object).style.visibility = "visible";
            }
            
        },
        error: function (error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
   */

    //mysql version(old)
    var x = new XMLHttpRequest();
    x.open("GET", "http://localhost:3000/boxinfo");
    x.onload = function () {
        if (x.status == 200) {
            responseText = JSON.parse(x.responseText);
            for (var i = 0; i < responseText.Box.length; i++) {
                var object = responseText.Box[i].cubby_id;
                if (responseText.Box[i].occupied == "False") {
                    document.getElementById(object).style.visibility = "visible";
                    document.getElementById(object).innerHTML = "cubby" + object + "(" + responseText.Box[i].length +"X"+ responseText.Box[i].height +"X"+ responseText.Box[i].width +")"
                }
            }
        }
    }
    x.send(null);

    function SelectCubbyHandler(eventInfo) {
        var target = event.target || event.srcElement;
        var test = target.id;
        var tag = localStorage.getItem("HashTag");

        var x = new XMLHttpRequest();
        x.open("POST", "http://localhost:3001/openLock/" + test);
        x.send(null);

        var mlx = new XMLHttpRequest();
        mlx.open("POST", "http://localhost:3001/closeLock/" + test);
        setInterval(mlx.send(null), 10000);

        /*
        Parse.initialize("66cwJB2R2fW0wG2Va44hzWajskfe7tEsFKvIXnFc", "64tImPApRrsLJknYLbyHjRgKFbqW8dkk51POZSyr");
        var Recipients = Parse.Object.extend("Recipients");
        var query = new Parse.Query(Recipients);
        var tag = localStorage.getItem("HashTag");
        query.equalTo("Hashtag",tag);
        query.first({
            success: function(object){
                object.set("BoxID" , test);
                object.save();
       
            },
            error:function(error){
                    alert("Error: " + error.code + " " + error.message);
                }        
        });
        */

        //mysql version
        
        var password = localStorage.getItem("password");

        var xml = new XMLHttpRequest();
        xml.open("PUT", "http://localhost:3000/recipients/boxid/" + password + "/" + test);
        xml.send(null);
    }

    var CubbyBtn = document.getElementsByClassName("cubbies");
    for (var i = 0; i < CubbyBtn.length; i++) {
        CubbyBtn[i].addEventListener("click", SelectCubbyHandler, true);
    }

    function buttonHomepage() {

        var x = new XMLHttpRequest();
        x.open("PUT", "http://localhost:3000/post/5725 Agronomy Road");
        x.send(null);

        var email = localStorage.getItem("email");
        var password = localStorage.getItem("password");
        $.ajax({
            type: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
                'key': 'AMRv8MoHRI87th94jyAkpw',
                'message': {
                    'from_email': 'no-reply@parseapps.com',
                    'to': [
                        {
                            'email': email,
                            'name': 'hi',
                            'type': 'to'
                        }
                    ],
                    'autotext': 'true',
                    'subject': 'Your package has arrived',
                    'html': 'your password is ' + password
                }
            }
        });
        location.href = "home.html";
    }
}