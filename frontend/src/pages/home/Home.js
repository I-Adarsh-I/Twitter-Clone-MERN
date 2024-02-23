import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import Feed from '../../components/feed/Feed'
import R_Sidebar from '../../components/sidebar/R_Sidebar'

const Home = () => {
  const handleScroll = (e) => {
    // If the mouse is over the sidebar, prevent its default behavior
    if (e.target.closest('.sidebar')) {
      e.preventDefault();
      return false;
    }
  };

  return (
    <div className='container d-flex home-main' onWheel={handleScroll}>
      <Sidebar />
      <Feed />
      <R_Sidebar />
    </div>
  )
}

export default Home
