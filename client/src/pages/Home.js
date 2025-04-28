import React from 'react'
import Layouts from '../components/Layout/Layouts'
import { useAuth } from '../context/auth'

const Home = () => {
  const [auth,setAuth] = useAuth();

  return (
    <Layouts>
        Home page
        <pre>
        {JSON.stringify(auth,null,4)}
        </pre>
    </Layouts>
  )
}

export default Home