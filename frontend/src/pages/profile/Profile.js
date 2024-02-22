import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import R_Sidebar from '../../components/sidebar/R_Sidebar'
import Profile from '../../components/profile/Profile'

const Home = () => {
  return (
    <div className='container d-flex home-main'>
      <Sidebar />
      <Profile />
      <R_Sidebar />
    </div>
  )
}

export default Home
