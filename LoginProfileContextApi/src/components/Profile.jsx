import React, { useContext } from 'react'
import UserContext from '../context/UserContext'
function Profile() {
    const {user}=useContext(UserContext);
    return (!user)? <h1>Please Login</h1>: <h1>Welcome {user.username}</h1>
}

export default Profile
