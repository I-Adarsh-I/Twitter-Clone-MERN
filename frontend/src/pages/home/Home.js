import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import Feed from '../../components/feed/Feed'
import R_Sidebar from '../../components/sidebar/R_Sidebar'

const Home = () => {
  return (
    <div className='container d-flex home-main'>
      <Sidebar />
      <Feed />
      <R_Sidebar />
    </div>
  )
}

export default Home
