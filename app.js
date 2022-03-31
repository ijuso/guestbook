// imports
var express = require('express')
var app = express()
var fs = require('fs');
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;


//staattiset filet
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/css'))

//hakee etusivun
app.get('', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})
//hakee vieraskirja datan
app.get('/guestbook', (req, res) => {
    
    var listdata = require(__dirname + '/public/data/lista.json');
     
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




//newmessgae
app.get('/newmessage', (req, res) => {
    res.sendFile(__dirname + '/views/newmessage.html')
})




//post juttu
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/kirjaudu", function (req, res) {
    console.log("ebin");
    

    var listdata = require(__dirname + '/public/data/lista.json');
    listdata.push({
        id: listdata.length + 1,
        username: req.body.username,
        country: req.body.country,
        message: req.body.message,
        date: new Date()
    });
    
       // Convert the JSON object to a string format
    var jsonStr = JSON.stringify(listdata);

  // Write data to a file
  fs.writeFile("./public/data/lista.json", jsonStr, err => {
    if (err) throw err;
    console.log("It's saved!");
  });
  res.send(
    "Saved the data to a file."
  );

    res.send("vittu jee" + username + country + message); 
});








//listen on port 3000
app.listen(PORT, () => console.info('Listening on port 3000'))