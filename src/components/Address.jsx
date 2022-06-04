import React from 'react'
import { useParams } from 'react-router-dom'

const Address = () => {

    const params = useParams()
    const address = params.id
    
    const weiToEth = (wei) => {
        return wei / BigInt(1000000000000000000)
    }

    return (
        <div>
            <p> this address has made {address} </p>
        </div> 
    )
}

export default Address;