import "./comments.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faReply } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CommentRating from "./CommentRating";
import { format, register as registerLocale } from "timeago.js";
import pl from "timeago.js/lib/lang/pl";
import axios from "axios";
import fetchUserInfo from "../../functions/userInfo";

registerLocale('PL', pl);


const SingleComment = ({ commentId, comment, setRefresh, refresh, commentType, showModal }) => {
  const [commentLiked, setCommentLiked] = useState(comment.liked);
  const [commentDisliked, setCommentDisliked] = useState(comment.disliked);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).first_name : null);
  const loggedIn = localStorage.getItem('loggedIn');

  const handleRating = (e, action) => {
    e.preventDefault();
    if (!loggedIn) return showModal(true);

    const key = commentType + "_id"
    const data = {}
    data[key] = comment.id
    if (!commentDisliked && !commentLiked) {
      axios.post(`/${action}/`, data).then((response) => {
        if (response.status === 201) {
          if (action === 'like') {
            comment.likes += 1;
            setCommentLiked(true);
          } else {
            comment.dislikes += 1;
            setCommentDisliked(true);
          }
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  }
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    data.comment = commentId;
    axios.post('/question-comment-answers/', data).then((response) => {
      if (response.status === 201 && data.name) {
        fetchUserInfo();
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      reset();
      setRefresh(refresh + 1);
      setShowReplyForm(false);
    });
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-between mb-2" id={`comment-${comment.id}`}>
        <Row className="comment-body">
          <Row className="mb-2">
            <Col>
              <div className="d-flex flex-row justify-content-start">
                <h5 className="mb-0 mr-1">{comment.author ? comment.author.first_name : "Anonimowy"}</h5>
                <a href={`#comment-${comment.id}`} className="ms-2 small text-muted date">{format(comment.created, "PL")}</a>
              </div>
            </Col>
            <Col xs={2} className="d-flex justify-content-end">
              <FontAwesomeIcon title="Zgłoś komentarz" icon={faFlag} className="grey action-btn" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className="py-2">{comment.text}</p>
            </Col>
          </Row>
          <Row>
            <CommentRating likes_count={comment.likes} dislikes_count={comment.dislikes} liked={commentLiked} disliked={commentDisliked} handler={handleRating} />
            <Col xs={2}>
              <a className="d-flex justify-content-end text-right grey text-decoration-none action-btn align-items-center" onClick={() => setShowReplyForm(true)}>
                <FontAwesomeIcon icon={faReply} className="me-1" />
                Odpowiedz
              </a>
            </Col>
          </Row>
        </Row>
      </div>

      {
        showReplyForm &&
        <Row>
          <Col xs={11} className="ms-auto border-bottom mt-1 mb-2">
            <Form className="mb-3" onSubmit={handleSubmit((data) => onSubmit(data))}>
              <h5>
                Odpowiedz na komentarz użytkownika {comment.author ? comment.author.first_name : "Anonimowy"}
              </h5>
              {userName || !loggedIn ? null : (
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Twoje imię</Form.Label>
                  <Form.Control {...register("name", { required: true })} type="text" placeholder="Paweł" />
                </Form.Group>
              )}
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control {...register("text", { required: true })} as="textarea" rows={3} />
              </Form.Group>
              <div className="d-flex justify-content-end mt-1">
                <Button type="submit" className="me-1">Odpowiedz</Button>
                <Button variant="outline-primary" onClick={() => setShowReplyForm(false)}>Anuluj</Button>
              </div>
            </Form>
          </Col>
        </Row>
      }
    </>
  );
}

export default SingleComment;