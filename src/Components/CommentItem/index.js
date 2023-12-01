import "./index.css"
import {formatDistanceToNow} from "date-fns"

const CommentItem = props => {
    const {commentDetails, toggleIsLiked, deleteComment} = props
    const {id,name, comment, date, initialClassName, isLiked} = commentDetails
    const initial = name ? name[0] : ''
    const datePosted = formatDistanceToNow(date)
    const likeImgUrl = isLiked ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    const likedText = isLiked ? "Liked" : "Like"

    const changeToLiked = () => {
        toggleIsLiked(id)
    }
    const onClickDeleteComment = () => {
        deleteComment(id)
    }

    return(
        <>
            <div className="comment-item-container">
                <div className="initial-container">
                    <div className={`initial ${initialClassName}`}>
                        <p>{initial}</p>
                    </div>
                    <div className="name-comment-container">
                        <div className="name-container">
                            <p className="name">{name}</p>
                            <p className="date">{datePosted}</p>
                        </div>
                        <p className="comment">{comment}</p>
                    </div>
                </div>
            </div>
            <div className="like-container">
                <div className="like-img-btn">
                    <img src={likeImgUrl} alt="like" className="like-img"/>
                    <button className="like-button" onClick={changeToLiked}>
                        {likedText}
                    </button>
                </div>
                <div>
                    <button className="delete" onClick={onClickDeleteComment}>
                        <img src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png" alt="delete"/>
                    </button>
                </div>
            </div>
            <hr/>
        </>
    )
}

export default CommentItem