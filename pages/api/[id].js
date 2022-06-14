/*
script instantiates all the nft json data for the other api calls
*/


const fs = require('fs')

const { execSync } = require("child_process")

// get the path to nft_txns.json
const path = require('path')
const nft_txns_path = path.join(__dirname, '../../../../src/data/nft_txns.json')
const flipped_nfts_path = path.join(__dirname, '../../../../src/data/flipped_nfts.json')

const executeSh = (addr) => {
  execSync("./src/scripts/getEth.sh " + addr, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  })
}

const handler = ({ query: { id } }, res) => {
  if (!fs.existsSync(nft_txns_path)) {
    fs.writeFileSync(nft_txns_path, JSON.stringify({ bruh: "moment" }))
    fs.writeFileSync(flipped_nfts_path, JSON.stringify({ bruh: "moment" }))
  }
  executeSh(id)
  res.status(200).json(JSON.stringify({ status: "OK" }))
}

export default handler