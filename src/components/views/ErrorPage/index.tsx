import './style.css'
import React from 'react'
import error from '../../../assets/img/404.gif'
import { Link } from 'wouter'

export const ErrorPage: React.FunctionComponent = () => {
  return (
    <div className='Error'>
      <h3>Stop everything! it seems that something went wrong</h3>
      <p>Please go back to home where everything is safe</p>
      <Link href="/" className='Error__link'>
        Go back to home
      </Link>
      <div>
        <img src={error} alt='Error imagen'/>
      </div>
    </div>
  )
}
