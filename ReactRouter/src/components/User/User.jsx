import React from 'react'
import { useParams } from 'react-router-dom'
const User = () => {
    const {userid}=useParams();
  return (
    <div>
      <div className='text-center bg-gray-600 text-white text-3xl p-5'>User: {userid} </div>
    </div>
  )
}

export default User
