import "./comments.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faReply, faFlag } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as farThumbsDown, faThumbsUp as farThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Row, Image, Button, Col } from "react-bootstrap";
import { useState } from "react";
import CommentRating from "./CommentRating";
// import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const SingleComment = ({ comment }) => {
  const [commentLiked, setCommentLiked] = useState(comment.liked);
  const [commentDisliked, setCommentDisliked] = useState(comment.disliked);

  const handleRating = (e, comment_id, action) => {
    e.preventDefault();
    if (action === 'like' && !commentDisliked && !commentLiked) {
      setCommentLiked(true);
    }
    if (action === 'dislike' && !commentDisliked && !commentLiked) {
      setCommentDisliked(true);
    }

  }

  return (
    <div className="d-flex flex-row justify-content-between mb-2" id="comment-1">
      <Row className="comment-body">
        <Row className="mb-2">
          <Col>
            <div className="d-flex flex-row justify-content-start">
              <h5 className="mb-0 mr-1">{comment.author}</h5>
              <a href="#comment-1" className="ms-2 small text-muted date">5 days ago</a>
            </div>
          </Col>
          <Col xs={2} className="d-flex justify-content-end">
            <FontAwesomeIcon title="Zgłoś komentarz" icon={faFlag} className="report action-btn" />
          </Col>

        </Row>
        <p className="py-2">{comment.content}</p>
        <CommentRating likes_count={comment.likes_count} dislikes_count={comment.dislikes_count} liked={commentLiked} disliked={commentDisliked} handler={handleRating} />
      </Row>
    </div>
  );
}

export default SingleComment;