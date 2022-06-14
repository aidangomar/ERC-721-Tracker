import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../src/components/Header'
import Form from '../src/components/Form'


const Home = () => {
  return (
    <div>
        <Header />
        <Form />
    </div>
  );
}

export default Home
