import "./comments.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faReply } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as farThumbsDown, faThumbsUp as farThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Row, Col } from "react-bootstrap";


const CommentRating = ({ likes_count, dislikes_count, liked, disliked, handler }) => {
  return (
    <Row>
      <Col>
        <span className="me-3">
          <FontAwesomeIcon icon={liked ? faThumbsUp : farThumbsUp} className="action-btn like" onClick={(e) => handler(e, 1, 'like')} />
          <span className="ms-1 text-muted">{ likes_count }</span>
        </span>
        <span>
          <FontAwesomeIcon icon={disliked ? faThumbsDown : farThumbsDown} className="action-btn dislike" onClick={(e) => handler(e, 1, 'dislike')} />
          <span className="ms-1 text-muted">{ dislikes_count }</span>
        </span>
      </Col>
      <Col xs={2}>
        <a className="d-flex justify-content-end text-right" href="#!">
          <FontAwesomeIcon icon={faReply} className="action-btn" />
          Reply
        </a>
      </Col>
    </Row>
  );
}

export default CommentRating;