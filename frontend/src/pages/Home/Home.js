import React from 'react'
import './Home.css'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'

const Home = () => {
    return (
        <>
           <Topbar />
           <div className="homeContainer">
                <Sidebar />
                <Feed home />
                <Rightbar />
           </div>
           
        </>
    )
}

export default Home
