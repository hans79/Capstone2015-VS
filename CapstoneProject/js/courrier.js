
window.onload = function () {

    var checkButton = document.getElementById("checkHashTag");
    checkButton.addEventListener("click", buttonClickHandler, false);
    var ReturnBtn = document.getElementById("return");
    ReturnBtn.addEventListener("click", buttonReturn, false);
    var receipientBtn = document.getElementById("receipient");
    
 
}
function buttonClickHandler() {

    /*parse version
        var hashtag = document.getElementById("codeInput").value;
        Parse.initialize("66cwJB2R2fW0wG2Va44hzWajskfe7tEsFKvIXnFc", "64tImPApRrsLJknYLbyHjRgKFbqW8dkk51POZSyr");
        var clientEmail = Parse.Object.extend("Recipients");
        var query = new Parse.Query(clientEmail);
        query.equalTo("Hashtag", hashtag);
        query.first({
            success: function (object) {
                // Successfully retrieved the object
                try{
                    var email = object.get("Email");
                    var size = object.get("size");
                    var hashtag = object.get("Hashtag")
                    var password = generatePassword();
                    object.set("password", password);
                    object.save();
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
                    }).done(function (response) {
                        console.log(response);
                        localStorage.setItem("itemSize", size);
                        localStorage.setItem("HashTag",hashtag)
                        location.href = "chooseBox.html"
                    });
                }catch(exception){}
    
    
            },
            error: function (error) {
                alert("please tyry again");
            }
        });
        */

    /* mysql version(old)
    var hashtag = document.getElementById("codeInput").value;
    var x = new XMLHttpRequest();
    x.open("GET", "http://localhost:3000/recipientsInfo/" + hashtag);
    x.onload = function () {
        if (x.status == 200) {
            responseText = JSON.parse(x.responseText);
            if (responseText.error == 0) {
                var email = responseText.Box[0].email;
                var size = responseText.Box[0].size;
                var hashtag = responseText.Box[0].hashtag;
                var password = generatePassword();
                var xml = new XMLHttpRequest();
                xml.open("PUT", "http://localhost:3000/recipients/password/" + hashtag + "/" + password);
                xml.send(null);
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
                }).done(function (response) {
                    console.log(response);
                    localStorage.setItem("itemSize", size);
                    localStorage.setItem("HashTag", hashtag)
                    location.href = "chooseBox.html"
                });
            }
        }
    };
    x.send(null);
    

}
*/
    //mysql version(new)
    var hashtag = document.getElementById("codeInput").value;
    localStorage.setItem("HashTag", hashtag);
    var x = new XMLHttpRequest();
    var output = "";
    x.open("GET", "http://localhost:3000/userinfo/"+hashtag);
    x.onload = function () {
        if (x.status == 200) {
            responseText = JSON.parse(x.responseText);
            if (responseText.error == 0) {
                var email = responseText.Box[0].email;
                localStorage.setItem("email", email);
                var hashtag = responseText.Box[0].hashtag;
                var password = generatePassword();
                localStorage.setItem("password", password);
                var xml = new XMLHttpRequest();
                xml.open("POST", "http://localhost:3000/recipients/" + email + "/" + hashtag + "/" + password);
                xml.send(null);
                location.href = "chooseBox.html"
            }
            /*error message*/
            else {
                /*output += "<h2>" + "Sorry, this is a wrong hashtag." + "</h2>";
                output += "<h2>" + "Please enter the hashtag again." + "</h2>";
                $("#list-posts").html(output);*/
                document.getElementById("error").innerHTML = "<h2>" + "Sorry, this is a wrong hashtag." + "</h2>";
                document.getElementById("again").innerHTML = "<h2>" + "Please enter the hashtag again." + "</h2>";
            }
        }
       

    }
    x.send(null);
}
    

function buttonReturn() {
    location.href = "home.html";
}

function receipientClickHandler() {
    location.href = "main.html";
}


function generatePassword() {
    var length = 8,
        charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}