import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// import  nftsTxns from '../../src/data/nft_txns.json'
// import flippedNfts from '../../src/data/flipped_nfts.json'


const Address = () => {
    const router = useRouter()
    const { id } = router.query
    console.log('id is ' + id)




    // const [nftTxns, setNftTxns] = React.useState([])
    // const [flippedNfts, setFlippedNfts] = React.useState([])

    // useEffect(() => {
    //     const fetchData = () => {
    //         console.log(id)
    //         fetch('http://localhost:3000/api/address/' + id).then(() => {
    //             const nfts_txns = require('../../src/data/nft_txns.json')
    //             const flipped_nfts = require('../../src/data/flipped_nfts.json')
    //             setNftTxns(nfts_txns)
    //             setFlippedNfts(flipped_nfts)
    //         })
    //     }
    //     fetchData()
    // }, [])

    // const nfts_txns = require('../../src/data/nft_txns.json')
    // const flipped_nfts = require('../../src/data/flipped_nfts.json')
    // setNftTxns(nfts_txns)
    // setFlippedNfts(flipped_nfts)

    const getPnLEth = async () => {

        const res = await fetch('/api/flipped_nfts.js')
        const flippedNfts = res.json()

        let pnl = BigInt('0')
        console.log(flippedNfts)
        for (var key in flippedNfts) {
            console.log(key)
            pnl += BigInt(flippedNfts[key]['PnL'].toString())
        }
        return Number(BigInt(pnl.toString()) / BigInt('10000000000000000')) / 100
    }

    return (
        <div>
            <p> this address {} has made {getPnLEth()} eth </p>
        </div> 
    )
}

// export async function getServerSideProps(context) {
//     return {
//       props: {}, // will be passed to the page component as props
//     }
//   }
  

export default Address;