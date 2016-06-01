
window.onload = function () {
   
    var values = localStorage.getItem("boxid");

    var xml = new XMLHttpRequest();
    xml.open("POST", "http://localhost:3001/openLock/" + values);
    xml.send(null);

    var xl = new XMLHttpRequest();
    xl.open("POST", "http://localhost:3001/closeLock/" + values);
    setInterval(xl.send(null), 10000);

    document.getElementById("boxid").innerHTML = "cubby"+values;
    var homeBtn = document.getElementById("homepage");
    homeBtn.addEventListener("click", buttonHome, false);
}

function buttonHome() {
    location.href = "home.html";

    var x = new XMLHttpRequest();
    x.open("PUT", "http://localhost:3000/post/add/5725 Agronomy Road");
    x.send(null);

}

