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

module.exports = {
    getMeta,
    revertMeta,
    remMeta
};