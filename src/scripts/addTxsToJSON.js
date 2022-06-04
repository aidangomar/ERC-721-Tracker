const Web3 = require('web3')
const FileSystem = require('fs')
let Txns = require('../data/nft_txns.json')
const config = require('../../config.json')
const web3 = new Web3(config['INFURA_WEBSOCKET']);

const getValueOfTxn = (txhash) => {
  // fetch data from infura
  return web3.eth.getTransaction(txhash)
    .then(txn => {
      return txn.value
    })
}

const addValuesToJSON = async () => {
  // add 'value' field to the json object
  for (var key in Txns) {
    console.log(key)
    for (var i = 0; i < Txns[key].length; i++) {
      const hash = Txns[key][i]['hash']
      // value should wait to be instantiated until value
      // of getValueOfTxn is resolved
      await getValueOfTxn(hash).then((value) => {
        Txns[key][i]['value'] = value
      })
    }
  }

  // web3.js's 'value' has this weird thing where if there are multiple tokens minted at once
  // they will all duplicate the cumulative mint cost for each of their 'value's
  // as such, we must clean up the value/gas fields
  // (i.e. divide the value & gas by the number of tokens in the mint)

  // key: unix time of mint
  // val: hash

  var map = new Map()

  for (var key in Txns) {
    for (var i = 0; i < Txns[key].length; i++) {

      var hash = Txns[key][i]['hash']

      if (!map.has(hash)) map.set(hash, 1)
      else map.set(hash, map.get(hash) + 1)
    }
  }


  // for (const [key, val] of map.entries()) {
  //     console.log(key, val)
  // }

  // once map is assembled, start cleaning the json object
  for (var key in Txns) {
    for (var i = 0; i < Txns[key].length; i++) {
      Txns[key][i]['value'] /= map.get(Txns[key][i]['hash'])
      Txns[key][i]['gasCost'] /= map.get(Txns[key][i]['hash'])
    }
  }

  // sort the txns in ascending order by timeStamp
  for (var key in Txns) {
    Txns[key].sort(compare)
  }

  // lastly replace the old json file with the cleaned object
  FileSystem.writeFile('../data/nft_txns.json', JSON.stringify(Txns), (error) => {
    if (error) throw error
  })

}

// comparison function to sort txns by timestamp in asc order
const compare = (a, b) => {
  if (parseInt(a['timeStamp']) > parseInt(b['timeStamp'])) {
    return 1
  }
  if (parseInt(a['timeStamp']) > parseInt(b['timeStamp'])) {
    return -1
  }
  return 0
}

// we can prove that the 1st element of every pair will always be a buy
// because it is impossible to sell an nft you don't own

// concurrently in this function we will also generate a json object with 
  // keys: tokenID + contract name 
  // vals: PnL ;; contract address

// and later in ${func name} we will append to this object the image url

const computePnL = () => {

  let cumPnL = 0;
  let numFlips = 0;
  let nfts = {}

  for (var key in Txns) {

    let localPnL = 0

    for (var i = 0; i < Txns[key].length; i += 2) {

      if (Txns[key].length <= i + 1) break // pair doesn't exist

      else {

        // check token is staked (with heuristic being it was sold for 0)
        if (Txns[key][i + 1]['value'] === 0) continue

        numFlips++

        // profit = sell - buy
        cumPnL += (Txns[key][i + 1]['value'] - Txns[key][i]['value'])
        localPnL += (Txns[key][i + 1]['value'] - Txns[key][i]['value'])

      }
    }

    if (localPnL === 0) continue

    const tokenID = key.split(' - ')[0]
    const projectName = key.split(' - ')[1]
    nfts[key] = {
      "tokenID": tokenID,
      "projectName": projectName,
      "contractAddress": Txns[key][0]['contractAddress'],
      "PnL": localPnL
    }
  }
  console.log(cumPnL)
  console.log(numFlips)
  FileSystem.writeFile('../data/flipped_nfts.json', JSON.stringify(nfts), (error) => {
    if (error) throw error
  })
}


addValuesToJSON().then(() => computePnL())