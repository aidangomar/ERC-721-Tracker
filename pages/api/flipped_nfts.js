const path = require('path')
const nft_txns_path = path.join(__dirname, '../../../../src/data/flipped_nfts.json')


const handler = () => {
  const nft_json = require(nft_txns_path)
  console.log(nft_json)
  return nft_json.json()
}

export default handler
