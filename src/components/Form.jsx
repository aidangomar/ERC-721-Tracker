import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const execSync = require('child_process').execSync

const Form = () => {
    let navigate = useNavigate()
    const [address, setNewAddress] = useState('')
  
    // TODO: make a spinny bar
    const handleSubmit = async (event) => {

      console.log('submitted ' + address)


      await instantiateData(address).then(
        navigate(`/address/${address}`)
      )
    }

    const instantiateData = (address) => {
      const result = execSync(`../scripts/getEth.sh ${address}`)
      console.log(result)
    }
  
    const handleAddressChange = (event) => {
      setNewAddress(event.target.value)
    }
    return (
      <form onSubmit={handleSubmit}>
        <input
          value={address}
          onChange={handleAddressChange}
        />
        <button type="search">search</button>
      </form>
    )
}

export default Form