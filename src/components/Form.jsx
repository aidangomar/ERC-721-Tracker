import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Form = () => {
    let navigate = useNavigate()
    const [address, setNewAddress] = useState('')
  
    const handleSubmit = (event) => {
      console.log('submitted ' + address)
      navigate(`/address/${address}`)
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