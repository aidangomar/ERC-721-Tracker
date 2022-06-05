import React from 'react'
import { useParams } from 'react-router-dom'


const Address = () => {

    const params = useParams()
    const address = params.id

    

    return (
        <div>
            <p> this address has made {address} </p>
        </div> 
    )
}

export default Address;