import React from 'react'

const Avatar = (props) => {
  return (
    <div>
      <img src={props.image} alt="profile" className={`w-100 ${props.br? 'rounded-pill' : ' '}`}/>
    </div>
  )
}

export default Avatar
