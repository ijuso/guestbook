// imports
var express = require('express')
var app = express()
var fs = require('fs')
var bodyParser = require("body-parser")
const PORT = process.env.PORT || 5000

//staattiset filet
app.use(express.static('public'))
//hakee etusivun
app.get('', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})
//hakee vieraskirja datan
app.get('/guestbook', (req, res) => {
    
  var listdata = require(__dirname + '/public/data/lista.json');
     
  //tulostaa taulukon sivulle vieraista
  var results = '<table border="1"> ';
    for (var i = 0; i < listdata.length; i++) {
    results +=
       '<tr>' +
       '<td>' + listdata[i].username + '</td>' +
       '<td>' + listdata[i].country + '</td>' +
       '<td>' + listdata[i].message + '</td>' +
       '</tr>';
   } 
   res.send(results);
});

//näyttää uusikirjaus formin
app.get('/newmessage', (req, res) => {
    res.sendFile(__dirname + '/views/newmessage.html')
})

//post juttu, tallentaa formiin laitetut jutut
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/kirjaudu", function (req, res) {
    
  var listdata = require(__dirname + '/public/data/lista.json');
  listdata.push({
    id: listdata.length + 1,
      username: req.body.username,
      country: req.body.country,
      message: req.body.message,
      date: new Date()
  });
  //muokataan json objekti stringi muotoon
  var jsonStr = JSON.stringify(listdata);

  //kirjoitetaan data tiedostoon
  fs.writeFile("./public/data/lista.json", jsonStr, err => {
    if (err) throw err;
    console.log("tallennettu");
  });
  res.send(
    "tallennettu."
  ); 
});

//kuunnellaan
app.listen(PORT, () => console.info('Listening on port ' + PORT))
