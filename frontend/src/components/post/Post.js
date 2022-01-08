import React, { useState, useEffect, useContext } from 'react'
import './Post.css'
import { MoreVert } from '@material-ui/icons'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import { AuthContext } from '../../context/AuthContext'

const Post = ({ post }) => {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user: currentUser } = useContext(AuthContext)

    const likeHandler = () => {
        try {
            axios.put(`/posts/${post._id}/like`, { userId: currentUser._id })
        } catch(error) {
            console.log(error)
        }
        setLike(isLiked ? like - 1 : like + 1 )
        setIsLiked(!isLiked)
    }

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [post.likes, currentUser._id])

    useEffect(()=> {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    },[post.userId])

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img src={user.profilePicture ? PF + user.profilePicture : PF+'person/noAvatar.png'} alt="person" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF+post.img} alt="post img" />
                </div>
                <div className="postBottom">
                 <div className="postBotonLeft">
                        <img className="likeIcon" src={PF+`like.png`} alt="" onClick={likeHandler} />
                        <img className="likeIcon" src={PF+`heart.png`} alt="" onClick={likeHandler} />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
