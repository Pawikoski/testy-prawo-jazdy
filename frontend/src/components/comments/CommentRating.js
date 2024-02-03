import "./comments.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as farThumbsDown, faThumbsUp as farThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Col } from "react-bootstrap";


const CommentRating = ({ likes_count, dislikes_count, liked, disliked, handler }) => {
  return (
    <Col>
      <span className="me-3">
        <FontAwesomeIcon icon={liked ? faThumbsUp : farThumbsUp} className="action-btn like" onClick={(e) => handler(e, 'like')} />
        <span className="ms-1 text-muted">{likes_count}</span>
      </span>
      <span>
        <FontAwesomeIcon icon={disliked ? faThumbsDown : farThumbsDown} className="action-btn dislike" onClick={(e) => handler(e, 'dislike')} />
        <span className="ms-1 text-muted">{dislikes_count}</span>
      </span>
    </Col>
  );
}

export default CommentRating;