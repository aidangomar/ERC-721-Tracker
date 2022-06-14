import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Address = () => {
    
    const router = useRouter()
    const { id } = router.query

    const [nftTxns, setNftTxns] = React.useState([])
    const [flippedNfts, setFlippedNfts] = React.useState([])

    useEffect(() => {
        const fetchData = () => {
            console.log(id)
            fetch('http://localhost:3000/api/address/' + id).then(() => {
                const nfts_txns = require('../../src/data/nft_txns.json')
                const flipped_nfts = require('../../src/data/flipped_nfts.json')
                setNftTxns(nfts_txns)
                setFlippedNfts(flipped_nfts)
            })
        }
        fetchData()
    }, [])

    // const nfts_txns = require('../../src/data/nft_txns.json')
    // const flipped_nfts = require('../../src/data/flipped_nfts.json')
    // setNftTxns(nfts_txns)
    // setFlippedNfts(flipped_nfts)


    const getPnLEth = () => {
        let pnl = BigInt('0')
        for (var key in flippedNfts) {
            pnl += BigInt(flippedNfts[key]['PnL'].toString())
        }
        return Number(BigInt(pnl.toString()) / BigInt('10000000000000000')) / 100
    }

    return (
        <div>
            <p> this address has made {getPnLEth()} eth </p>
        </div> 
    )
}

export default Address;