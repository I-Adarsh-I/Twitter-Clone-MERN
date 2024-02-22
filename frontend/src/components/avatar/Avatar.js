import React from 'react'

const Avatar = (props) => {
  return (
    <div>
      <img src={props.image} alt="profile" className='w-100'/>
    </div>
  )
}

export default Avatar
