
window.onload = function () {

    var checkButton = document.getElementById("checkHashTag");
    checkButton.addEventListener("click", buttonClickHandler, false);
    var ReturnBtn = document.getElementById("return");
    ReturnBtn.addEventListener("click", buttonReturn, false);

}
function buttonClickHandler() {
       
    /*
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
        */
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
                    localStorage.setItem("HashTag", hashtag)
                    location.href = "chooseBox.html"
                });
            }
        }
    };
    x.send(null);

}

function buttonReturn() {
    location.href = "main.html";
}

