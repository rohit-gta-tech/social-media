import React, { useContext, useRef, useState } from 'react'
import './Share.css'
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@material-ui/icons'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const Share = () => {
    const PF = '/images/'
    const { user } = useContext(AuthContext)

    const desc = useRef()
    const [file, setFile] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        } 
        if(file) {
            const data = new FormData()
            const fileName = Date.now() + file.name
            data.append("name", fileName)
            data.append("file", file)
            newPost.img = fileName
            try {
                await axios.post("/api/upload", data)
                window.location.reload()
            } catch(error) {
                console.log(error)
            }
        }
        try {
            await axios.post("/api/posts", newPost)
        } catch(error){
            console.log(error)
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png" } alt="profilepic" className="shareProfileImg" />
                    <input placeholder={`What's in your mind ${user.username}?`} className="shareInput" ref={desc} />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImage" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className='shareOptionText'>Photo or Video</span>
                            <input style={{display:"none"}} type="file" id="file" accept=".png, .jpg, .jpeg" onChange={(e) => setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="gold" className="shareIcon"/>
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share
