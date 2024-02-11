import "./comments.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import AddComment from "./AddComment";
import { useState, Suspense } from "react";
import CommentList from "./CommentList";
import { Spinner, Form } from "react-bootstrap";

const CommentSection = ({ source, objectId }) => {
  const [refresh, setRefresh] = useState(0);

  return (
    <section>
      <div className="d-flex flex-row justify-content-between mb-2">
        <div className="d-flex align-middle ">
          <h2 className="me-2">Komentarze</h2>
          <a href="#add-comment" className="my-auto action-btn"><FontAwesomeIcon className="grey" icon={faPlusCircle} size="xl" /></a>
        </div>
        <Form.Select defaultValue="popular" className="filter-select" onChange={(e) => console.log(e.target.value)}>
          <option value="popular">Sortuj wg</option>
          <option value="oldest">Daty (od najstarszych)</option>
          <option value="newest">Daty (od najnowszych)</option>
          <option value="popular">Popularności</option>
        </Form.Select>
      </div>
      {/* <div className="d-flex flex-row justify-content-end">

      </div> */}
      <Suspense
        fallback={
          <div className="w-100 d-flex justify-content-center align-items-center py-5">
            <Spinner className="mx-uato" animation="border" role="status"><span className="visually-hidden">Ładowanie...</span></Spinner>
          </div>
        }>
        <CommentList source={source} objectId={objectId} refresh={refresh} setRefresh={setRefresh} />
      </Suspense>
      <AddComment source={source} objectId={objectId} refresh={refresh} setRefresh={setRefresh} />
    </section>
  );
}

export default CommentSection;