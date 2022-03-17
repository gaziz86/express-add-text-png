const fs = require("fs");
const path = require("path");
const { printTextOnImage } = require("../utils/base.utils");


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });
// app.use(express.static('public'));

async function setPNG(req, res) {

    const donatorName = (req.params.name) ? req.params.name : "none";
    console.log("donatorName:", donatorName);
    // const imageSrc = __dirname + "/assets/SaveUkraine_NFT.png";
    const imageSrc = "../public/SaveUkraine_NFT.png";
    const imageSrcNew = await printTextOnImage(imageSrc, donatorName);
    console.log("set file");

    res.json({file: imageSrcNew.split("/")[2]});
}

async function getPNG(req, res) {

    const filename = path.join(__dirname,"../assets",req.params.name);
    console.log("sending file:", filename);

    res.sendFile(filename);
}

async function remPNG(req, res) {

    const filename = path.join(__dirname,"../assets",req.params.name);
    fs.unlink(filename, (err) => {
        if (err) throw err;
        console.log('deleted:', filename);
    });
    res.send("file deleted");

}

module.exports = {
    setPNG,
    getPNG,
    remPNG
  };
  