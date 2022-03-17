const fs = require("fs");
const path = require("path");
const { getImageName, printTextOnImage } = require("./base.utils");

var express = require('express');
var app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(express.static('public'));

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/setPNG/donator/:name', async function (req, res) {

    const donatorName = (req.params.name) ? req.params.name : "none";
    console.log("donatorName:", donatorName);
    // const imageSrc = __dirname + "/assets/SaveUkraine_NFT.png";
    const imageSrc = "/assets/SaveUkraine_NFT.png";
    const imageSrcNew = await printTextOnImage(imageSrc, donatorName);
    console.log("set file");

    res.json({subdir: imageSrcNew.split("/")[1], file: imageSrcNew.split("/")[2]});
})

app.get('/getPNG/subdir/:dir/filename/:name', async function (req, res) {

    // const filename = __dirname + "/assets/" + req.params.name;
    const filename = __dirname + "/" + req.params.dir + "/" + req.params.name;
    console.log("__dirname:", __dirname);
    console.log("sending file:", filename);

    res.sendFile(filename);
})


app.get('/remPNG/subdir/:dir/filename/:name', async function (req, res) {

    const filename = __dirname + "/" + req.params.dir + "/" + req.params.name;
    fs.unlink(filename, (err) => {
        if (err) throw err;
        console.log('deleted:', filename);
    });
    res.send("file deleted");

})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})