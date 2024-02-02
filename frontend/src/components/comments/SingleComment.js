import "./comments.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import CommentRating from "./CommentRating";

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
    <div className="d-flex flex-row justify-content-between mb-2" id={`comment-${comment.id}`}>
      <Row className="comment-body">
        <Row className="mb-2">
          <Col>
            <div className="d-flex flex-row justify-content-start">
              <h5 className="mb-0 mr-1">{comment.author ? comment.author.first_name : "Anonimowy"}</h5>
              <a href={`#comment-{comment.id}`} className="ms-2 small text-muted date">{comment.created}</a>{/* TODO: date "5 days ago" style */}
            </div>
          </Col>
          <Col xs={2} className="d-flex justify-content-end">
            <FontAwesomeIcon title="Zgłoś komentarz" icon={faFlag} className="report action-btn" />
          </Col>
        </Row>
        <p className="py-2">{comment.text}</p>
        <CommentRating likes_count={comment.likes} dislikes_count={comment.dislikes} liked={commentLiked} disliked={commentDisliked} handler={handleRating} />
      </Row>
    </div>
  );
}

export default SingleComment;