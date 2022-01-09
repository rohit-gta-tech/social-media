import React from 'react'
import './CloseFriend.css'

const CloseFriend = ({ user }) => {
    const PF = '/images/'
    return (
        <li className="sidebarFriend">
            <img src={PF+user.profilePicture} alt="" className="sidebarFriendImage" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}

export default CloseFriend
