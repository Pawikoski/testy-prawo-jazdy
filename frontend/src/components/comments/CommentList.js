import { Row, Col } from "react-bootstrap";
import SingleComment from "./SingleComment";
import { useFetchQuestionComments } from "../api/fetchData";
import { Pagination, Stack } from "@mui/material";
import { useState } from "react";

const CommentList = ({ questionId, refresh }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const comments = useFetchQuestionComments(`/question-comments/?qid=${questionId}`, currentPage, refresh);

  return (
    <>
      {comments && comments.results.map((comment) => (
        <Row key={comment.id}>
          <SingleComment comment={comment} />
          <section className="answers">
            {comment.answers && comment.answers.map((answer, idx) => (
              <SingleComment key={`${comment.id}-${idx}`} comment={answer} />
            ))}
          </section>
        </Row>
      ))}
      <Row>
        <Col className="d-flex justify-content-center">
          <Stack spacing={2} mt="2rem">
            {comments && <Pagination onChange={(_, v) => setCurrentPage(v)} count={Math.ceil(comments.count / 10)} page={currentPage} color="primary" />}
          </Stack>
        </Col>
      </Row>
    </>
  );
}

export default CommentList
