import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { createNoSubstitutionTemplateLiteral } from 'typescript'

// export const getStaticProps = async (address) => {
//   console.log('fetching data...')
//   const res = await fetch('http://localhost:3000/api/' + address)
//   const data = await res.json()
//   console.log(data)
// }


const Form = () => {

    const router = useRouter()
    const [address, setNewAddress] = useState('')
    const fetcher = (...args) => fetch(...args).then(res => res.json())

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
  
  
    // TODO: make a spinny bar
    const handleSubmit = async (e) => {
      e.preventDefault()
      const res = await fetch('/api/' + address)
      const result = await res.json()
      console.log('res is ' + result)

      await fetch('/api/nft_txns.json').then(res => res.json).then(data => console.log(data))

      console.log("post log")
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
      console.log(event.target.value)
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