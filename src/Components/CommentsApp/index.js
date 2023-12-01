import {Component} from "react"
import {v4} from "uuid"
import "./index.css"
import CommentItem from "../CommentItem"

const initialContainerBackgroundClassNames = [
    'amber',
    'blue',
    'orange',
    'emerald',
    'teal',
    'red',
    'light-blue',
  ]

class CommentsApp extends Component {
    state = {nameInput: "", commentInput: "", commentsList: [], nameFeild:'', commentField: ''}

    onChangingNameInput = event => {
        this.setState({nameInput: event.target.value})
        console.log("My Name is: ", event.target.value)
    }

    onChangingCommentInput = event => {
        this.setState({commentInput: event.target.value})
        console.log("My Comment is: ", event.target.value)
    }

    onAddingComment = event => {
        event.preventDefault()
        const {nameInput, commentInput} = this.state
        const initialBackgroundColorClassName = initialContainerBackgroundClassNames[
            Math.ceil(Math.random() * initialContainerBackgroundClassNames.length - 1)
        ]
        if (nameInput !== "" && commentInput!== ''){
            const newComment = {
                id: v4(),
                isLiked: false,
                name: nameInput,
                comment:commentInput,
                initialClassName:initialBackgroundColorClassName,
                date: new Date()
            }
    
            this.setState(prevState => ({
                commentsList: [...prevState.commentsList, newComment],
                nameInput: '',
                commentInput: '',
                nameFeild: '',
                commentField: ''
            }))
        }
        else{
            this.setState({
                nameFeild: "*Required", commentField:"*Required"
            })
        }

    }

    renderCommentItem = () => {
        const {commentsList} = this.state
        const comments = commentsList.map(eachComment => (
            <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toggleIsLiked={this.toggleIsLiked}
                deleteComment={this.deleteComment}
            />
        ))
        return comments
    }

    toggleIsLiked = (id) => {
        this.setState(prevState => ({
            commentsList: prevState.commentsList.map(eachComment => {
                if (id === eachComment.id){
                    return {...eachComment, isLiked: !eachComment.isLiked}
                }
                return eachComment
            })
        }))
    }

    deleteComment = id => {
        this.setState(prevState => ({
            commentsList: prevState.commentsList.filter(eachComment => 
                eachComment.id !== id
            )
        }))
    }

    render(){
        const {commentsList, nameInput, commentInput, nameFeild, commentField} = this.state
        let warningText1
        let warningText2
        if (nameFeild !== "" || commentField!==""){
            warningText1 = nameFeild
            warningText2 = commentField
        }
        return (
            <div className="app-container">
                <div className="comments-container">
                    <h1 className="app-heading">Comments</h1>
                    <div className="comments-inputs">
                        <form className="form" onSubmit={this.onAddingComment}>
                            <p className="form-description">
                                Say something about 4.0 Technologies
                            </p>
                            <input value={nameInput}  onChange={this.onChangingNameInput} type="text" className="name-input" placeholder="Your Name"/>
                            <p>{warningText1}</p>
                            <textarea value={commentInput} onChange={this.onChangingCommentInput} rows="6" placeholder="Your Comment" className="comment-input"/>
                            <p>{warningText2}</p>
                            <button className="add-button" type="submit">
                                Add Comment
                            </button>
                        </form>
                        <img src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                        className="image" alt="comments"/>
                    </div>
                    <hr className="line"/>
                <p className="heading">
                    <span className="comments-count">{commentsList.length}</span>
                    Comments
                </p>
                <ul>{this.renderCommentItem()}</ul>
                </div>
            </div>
        )
    }
}

export default CommentsApp