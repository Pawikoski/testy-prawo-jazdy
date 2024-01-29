import "./comments.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faReply, faFlag } from '@fortawesome/free-solid-svg-icons';
import { Row, Image, Button } from "react-bootstrap";
import SingleComment from "./SingleComment";

const CommentSection = () => {
  const comments = [
    {
      id: 1,
      likes_count: 21,
      dislikes_count: 37,
      liked: false,
      disliked: false,
      author: "Jan Kowalski",
      content: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus ras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
      answers: [
        {
          id: 1,
          likes_count: 4,
          dislikes_count: 0,
          liked: false,
          disliked: false,
          author: "Foo Bar",
          content: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus ras purus odio, vestibulum in vulputate at, tempus viverra turpis."
        }
      ]
    },
    {
      id: 2,
      likes_count: 53,
      dislikes_count: 12,
      liked: false,
      disliked: false,
      author: "Mariusz Kolanko",
      content: "lorem ipsum dolor sit amet",
    },
  ]
  return (
    <section>
      <h2>Komentarze</h2>
      <div className="d-flex flex-row justify-content-end">Sortuj: od najnowszych</div>

      {comments.map((comment, index) => (
        <Row>
          <SingleComment key={index} comment={comment} />
          <section className="answers">
            {comment.answers && comment.answers.map((answer, index) => (
              <SingleComment key={index} comment={answer} />
            ))}
          </section>

        </Row>
      ))}
    </section>
  );
}

export default CommentSection;