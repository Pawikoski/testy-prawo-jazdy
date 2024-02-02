import "./comments.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AddComment from "./AddComment";
import { useState, Suspense } from "react";
import CommentList from "./CommentList";
import { Spinner } from "react-bootstrap";

const CommentSection = ({ questionId }) => {
  const [refresh, setRefresh] = useState(0);

  return (
    <section>
      <div className="d-flex align-middle">
        <h2 className="me-2">Komentarze</h2>
        <a href="#add-comment" className="my-auto action-btn"><FontAwesomeIcon color="rgb(86, 94, 102)" icon={faPlusCircle} size="xl" /></a>
      </div>
      <div className="d-flex flex-row justify-content-end">
        <div>Sortuj: od najnowszych</div>
      </div>
      <Suspense
        fallback={
          <div className="w-100 d-flex justify-content-center align-items-center py-5">
            <Spinner className="mx-uato" animation="border" role="status"><span className="visually-hidden">Ładowanie...</span></Spinner>
          </div>
        }>
        <CommentList questionId={questionId} refresh={refresh} />
      </Suspense>
      <AddComment questionId={questionId} refresh={refresh} setRefresh={setRefresh} />
    </section>
  );
}

export default CommentSection;