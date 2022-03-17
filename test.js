const { getImageName, printTextOnImage } = require("./base.utils");

async function main() {
    const donatorName = "GS";
    var imageSrc = "/assets/SaveUkraine_NFT.png";
    await printTextOnImage(imageSrc, donatorName);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});