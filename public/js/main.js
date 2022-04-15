window.onload = event => {
  var nappula = document.getElementById("nappula");

  nappula.addEventListener("click", () => {
    var username = document.getElementById("username").value;
    var country = document.getElementById("country").value;
    var message = document.getElementById("message").value;

    console.log(username, country, message);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("div1").innerHTML = this.responseText;
        console.log(this.responseText);
      }
    };

    xmlhttp.open("POST", "/guestbook", true);
    xmlhttp.setRequestHeader(
      "Content-type",
      "application/x-www-form-urlencoded"
    );
    xmlhttp.send("username=" + username + "&country=" + country
    + "&message=" + message);
    document.getElementById("div1").innerHTML = "username=" + username + "&country=" + country
    + "&message=" + message





  });
};