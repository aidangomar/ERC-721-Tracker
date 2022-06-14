import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Form = () => {

    const router = useRouter()
    const [address, setNewAddress] = useState('')
  
    // TODO: make a spinny bar
    const handleSubmit = () => {
      
      console.log(address)
      
        fetch('http://localhost:3000/api/address/' + address).then(
          console.log
        )
        router.push('/address/[id]', `/address/${address}`)

    }

    // TODO: figure out how to execute the shell stuff, since it's apparently
    // impossible on the frontend 
    // ref: https://stackoverflow.com/questions/43258987/webpack-child-process-exec-typeerror-error-is-not-a-function

    // const instantiateData: any = (address: string) => {
    //   console.log(address)
    // }
  
    const handleAddressChange = (event) => {
      setNewAddress(event.target.value)
    }
    return (
      <form onSubmit={handleSubmit}>
        <input
          value={address}
          onChange={handleAddressChange}
        />
        <button type="submit">search</button>
      </form>
    )
}

export default Form