
window.onload = function () {
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
   
    function SelectCubbyHandler(eventInfo) {
        Parse.initialize("66cwJB2R2fW0wG2Va44hzWajskfe7tEsFKvIXnFc", "64tImPApRrsLJknYLbyHjRgKFbqW8dkk51POZSyr");
        var Recipients = Parse.Object.extend("Recipients");
        var query = new Parse.Query(Recipients);
        var tag = localStorage.getItem("HashTag");
        query.equalTo("Hashtag",tag);
        query.first({
            success: function(object){
                object.set("BoxID" , "11");
                object.save();
                location.href = "main.html";
            },
            error:function(error){
                    alert("Error: " + error.code + " " + error.message);
                }        
            });
    }
    var CubbyBtn = document.getElementsByClassName("cubbies");
    for (var i = 0; i < CubbyBtn.length; i++) {
        CubbyBtn[i].addEventListener("click", SelectCubbyHandler, false);
    }
}