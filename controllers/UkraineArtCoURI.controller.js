const fs = require("fs");
const path = require("path");


async function getMeta(req, res) {

    // console.log("getMeta");

    // get metadata
    const jsonPath = path.join(__dirname,"../assets/remaining.json");
    var Remaining = JSON.parse(fs.readFileSync(jsonPath));

    const num_NFTids = Object.keys(Remaining).length;
    if (num_NFTids > 0) {

        const NFTid = Object.keys(Remaining)[0];
        const metaURI = Remaining[NFTid];
        // console.log("Remaining", Remaining);
        // console.log("NFTid", NFTid);
        // console.log("metaURI", metaURI);
    
        // remove metadata from json and save
        delete Remaining[NFTid];
        fs.writeFile(jsonPath, JSON.stringify(Remaining), function(err) {
            if (err) {
                console.log(err);
                res.send("could not write new remaining.json");
            }
        });
        // console.log("Remaining new", Remaining);
    
        res.json({"totalLeft": num_NFTids-1, "NFTid": NFTid, "CID": metaURI});
    
    } else {
        res.json({"totalLeft": num_NFTids, "NFTid": "", "CID": ""})
    }
}

async function revertMeta(req, res) {

    // console.log("revertMeta");
    if (req.params.NFTid && req.params.NFTcid) {
        const NFTid = req.params.NFTid;
        const NFTcid = req.params.NFTcid;
        // console.log("NFTid", NFTid, typeof(NFTid));
        // console.log("NFTcid", NFTcid);
    
        const Remaining = JSON.parse(fs.readFileSync(path.join(__dirname,"../assets/remaining.json")));
        // console.log("Remaining", Remaining, typeof(Remaining));
        // console.log("Object.keys(Remaining)", Object.keys(Remaining));
    
        if (!(NFTid in Remaining)) {
            Remaining[NFTid] = NFTcid;
            fs.writeFile(path.join(__dirname,"../assets/remaining.json"), JSON.stringify(Remaining), function(err) {
                if (err) {
                    console.log(err);
                    res.send("could not write new remaining.json");
                }
            });
            res.send("id added");
        } else {
            res.send("id already exist");
        }
    } else {
        res.send("id and/or URI are not provided")
    }

}

async function remMeta(req, res) {

    // console.log("remMeta");
    if (req.params.id) {
        const NFTid = req.params.id;
        // console.log("NFTid", NFTid);
    
        const Remaining = JSON.parse(fs.readFileSync(path.join(__dirname,"../assets/remaining.json")));
        // console.log("Remaining", Remaining);
    
        if (NFTid in Object.keys(Remaining)) {
            delete Remaining[NFTid];
            fs.writeFile(path.join(__dirname,"../assets/remaining.json"), JSON.stringify(Remaining), function(err) {
                if (err) {
                    console.log(err);
                    res.send("could not write new remaining.json");
                }
            });
            res.send("id deleted");
        } else {
            res.send("id not found");
        }
    } else {
        res.send("provide token id")
    }

}

async function getIPFS(req, res) {

    // console.log("getMeta");

    // get metadata
    const jsonPath = path.join(__dirname,"../assets/dirRemaining.json");
    var Remaining = JSON.parse(fs.readFileSync(jsonPath));
    const CID = Remaining["CID"];
    // console.log("Remaining", Remaining)
    // console.log("CID", CID)

    const numNFTs = Remaining.filenameIds.length;
    if (numNFTs > 0) {

        const NFTnameId = Remaining.filenameIds[Math.floor(Math.random()*numNFTs)];
        const index = Remaining.filenameIds.indexOf(NFTnameId);
        Remaining.filenameIds.splice(index, 1);
        // console.log("Remaining", Remaining);
        // console.log("NFTnameId", NFTnameId);
    
        // save json
        fs.writeFile(jsonPath, JSON.stringify(Remaining), function(err) {
            if (err) {
                console.log(err);
                res.send("could not write new remaining.json");
            }
        });
        // console.log("Remaining new", Remaining);
    
        res.json({"totalLeft": numNFTs-1, "CID": CID, "NFTnameId": NFTnameId});
    
    } else {
        res.json({"totalLeft": numNFTs, "CID": "", "NFTnameId": ""})
    }
}

async function revertIPFS(req, res) {

    // console.log("revertIPFS");
    if (req.params.name) {
        const NFTnameId = req.params.name;
        // console.log("NFTnameId", NFTnameId, typeof(NFTnameId));
    
        const Remaining = JSON.parse(fs.readFileSync(path.join(__dirname,"../assets/dirRemaining.json")));
        // console.log("Remaining", Remaining, typeof(Remaining));
    
        if (!(Remaining.filenameIds.includes(Number(NFTnameId)))) {
            Remaining.filenameIds.push(Number(NFTnameId));
            Remaining.filenameIds.sort(function(a, b) {
                return a - b;
            });
            fs.writeFile(path.join(__dirname,"../assets/dirRemaining.json"), JSON.stringify(Remaining), function(err) {
                if (err) {
                    console.log(err);
                    res.send("could not write new dirRemaining.json");
                }
            });
            // console.log("Remaining", Remaining);
            res.send("NFTnameId added");
        } else {
            res.send("NFTnameId already exist");
        }
    } else {
        res.send("NFTnameId not provided")
    }

}

module.exports = {
    getMeta,
    revertMeta,
    remMeta,
    getIPFS,
    revertIPFS
};