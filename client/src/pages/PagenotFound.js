import React from 'react'
import Layouts from '../components/Layout/Layouts'
import { Link } from 'react-router-dom'

const PagenotFound = () => {
  return (
    <Layouts title={"Page Not Found Page - Ecommerce"}>
        <div className='pnf'>
            <h1 className='pnf-title'>404</h1>
            <h2 className='pnf-heading'>OOPS ! Page not found</h2>
            <Link to="/" className='pnf-btn'>Go Back</Link>
        </div>
    </Layouts>
  )
}

export default PagenotFound