const path = require("path");
const Jimp = require("jimp");

function getImageName(name) {
  const currentTimestamp = Date.now();

  return `${currentTimestamp}_${name}`;
}

async function printTextOnImage(imageSrc, imageText) {
  const printNameFont = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
  const printTsFont = await Jimp.loadFont(Jimp.FONT_SANS_8_BLACK);

  console.log("__dirname:", __dirname);
  const newName = getImageName(imageText);
  const imageSrcNew = "../assets/"+newName+".png";
  console.log("New:", imageSrcNew);

  Jimp.read(path.join(__dirname, imageSrc), (err, _image) => {
    if (err) throw err;

    const imageWidth = _image.bitmap.width;
    const imageHeight = _image.bitmap.height;

    _image.print(
      printNameFont,
      imageWidth  * 0.5,
      imageHeight * 0.8,
      {
        text: imageText,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      },
      imageWidth * 0.5,
      (err, resultedImage) => {
        if (err) {
          console.log("ERR (printing on image):", err);
        } else {
          _image.print(printTsFont, 0.0*imageWidth, 0.0*imageHeight, newName.split("_")[0], 0, 0);
          resultedImage.write(path.join(__dirname, imageSrcNew));
          console.log("written into:", path.join(__dirname, imageSrcNew));
        }
      }
    );
  });
  console.log("got new image at:", imageSrcNew);

  // return path.join(__dirname, imageSrcNew);
  return imageSrcNew;
}

module.exports = {
  getImageName,
  printTextOnImage
};
