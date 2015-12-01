﻿
window.onload = function () {

    var checkButton = document.getElementById("checkHashTag");
    checkButton.addEventListener("click", buttonClickHandler, false);
    var ReturnBtn = document.getElementById("return");
    ReturnBtn.addEventListener("click", buttonReturn, false);

}
function buttonClickHandler() {
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
                                'html': 'your password is ' + hashtag
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
        
}

function buttonReturn() {
    location.href = "main.html";
}
